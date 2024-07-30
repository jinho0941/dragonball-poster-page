## 드래곤볼 극장판을 홍보하기 위한 목적의 마케팅 페이지를 만드는 것이 목표입니다.

### deploy link: https://dragon-ball-poster.vercel.app/
### plan link: https://www.tldraw.com/s/v2_c_XNcsCXgvE_9spXKDDf0r_?v=-1018,-1197,4789,3197&p=9rQ6aveV1WIcvP5gjlqFI
   
### 도전적인 요소
- 스크롤을 하면 페이지단위로 이동
- 페이지 이동간에 부드러운 에니메이션 작동
- 사용성이 좋은 scroll page component
- 현재 페이지만 render 하는 식으로 최적화

기술: react, tailwind, shadcn/ui, framer motion

우선 FullPage라는 컴포넌트를 부모 컴포넌트로 두고 바로 하위에 있는 자식 요소들은 각각 페이지에 해당하도록 설계를 하였습니다.

배열을 만들어서 prop으로 넘겨주는 방법도 좋지만 저는 조금더 사용성 측면에서 dom 하위요소들이 자동으로 개별 페이지가 되도록 원했습니다.

![image](https://github.com/user-attachments/assets/f0b452c3-f7b3-4e98-be0b-b42d81029909)

초기에는 react element array를 만들어서 Props로 내리는 방식을 채택하였으나,
사용성이 좋지 않는 이유로 부모 컴포넌트가(full page) 자식 컴포넌트 갯수만큼 알아서 page를 만드는 방식으로 구현하고 싶었습니다.

해당 기능을 구현하기 위해 react의 chilren을 받아서 각각의 child만큼 dom을 그리는 형태로 렌더를 시켰습니다.
```
FullScrollPage = ({ children }: Props)
...
const childrenArray = React.Children.toArray(children)
...
{childrenArray.map((child, index) => child)
```
또한 자식 컴포넌트가 현재 페이지가 자신의 페이지인지 알아야지 렌더를 하기 때문에 isCurrnetPage라는 변수를 받아서 처리를 해줘야합니다.
전역 변수로 설정하여서 부모와 자식이 같은 상태값을 가지는 방법이 있지만 자식에서 props로 변수를 받는게 더 깔끔하고 사용성이 좋아보여,
아래와 같은 방법으로 자식에게 props를 내렸습니다.
```
{cloneElement(child as any, {
  isCurrentPage: currentPageNum === index,
})}
...
const CharacterInfoPage = ({ isCurrentPage }: any) => {
```
여러 페이지들을 만드는것에 성공하였으니 휠 이벤트를 주어서 페이지가 이동을 가능하게 해야합니다.
이를 구현하기 위해 아래 구성요소들이 필요합니다.

- page index
- 전체 페이지를 감싸는 ref
- 각각 페이지별의 ref
- wheel evnet

휠을 down하면 index가 증가하고(다음페이지), up 하면 감소(이전페이지)해야합니다.
전체 페이지를 감싸는 ref로 scroll을 주면 각각 page의 top으로 이동되게 해야하니 각각 값이 필요합니다.

아래는 구현한 페이지 입니다.

![녹화_2024_07_30_23_13_22_880](https://github.com/user-attachments/assets/6c21f491-f298-4ba0-82e1-b6017776f932)

하지만 여기서 문제점이 발생하였습니다.
휠을 아래로 내려 다음페이지로 가는 도중에 살짝이라도 올리면 바로 이전페이지로 가는것이 사용성에 문제가 된다고 생각이 되었습니다.
이유는 휠을 내리고 조금이라도 휠을 올리면 바로 이전페이지로 가기 때문에 유저의 조그만한 움직임으로도 민감하게 반응을 하여 부정적인 경험이 될것이라 생각했습니다.
![녹화_2024_07_30_23_16_34_329](https://github.com/user-attachments/assets/d3a97da8-5d3f-4ff7-ab09-98f656b79ccb)

이를 해결하기 위하면 아래와 같은 조건을 걸어주어야 합니다.
- 스크롤이 끝나기 전까지 휠 이벤트를 block 시켜야함.

이렇게 하면 중간에 휠을 조작한다 하더라도 이벤트를 막았기 때문에 이전과 같은 문제점을 막을수 있습니다.
이를 구현하기 위해서는 다음과 같은 로직들이 필요합니다.
- isScroll ?
- setIsScroll(ture)
```
const handleWheel = (event: WheelEvent) => {
  if (isScrolling) return
  setIsScroll(ture)
```
해당 변수와 set함수로 휠을 주는순간 스크롤이 된다고 판단을 하고 해당 이벤트를 block시켜야 합니다.

다음은 언제 스크롤이 끝났는지 판단 기준이 필요해 집니다.
저는 이를 구현하기 위해 2가지 방식을 생각했습니다.
- 단순히 스크롤이 되는 시간을 어림짐작 하여 setTimeout(() => {setIsScroll(false)}, 500 ) 처럼 구현하기.
- 스크롤이 정확히 끝나는 조건을 찾아 정확히 끝날때 setScroll(false) 해주기.

첫번째 방법의 장점은 단순하고 구현이 빠르지만 단점은 정확하지가 않습니다.

스크롤 시간이 브라우저마다 다를수도 있는 문제도 있을수도 있을거 같습니다.

위와 같은 이유로 저는 정확히 스크롤이 끝나는 타이밍을 찾아 그때 isScroll을 false로 하는 방식을 채택하였습니다.

스크롤이 끝나는 정확한 타이밍은 mainRef의 current.scrollTop이 다음 페이지(혹은 이전페이지) 의 offsetTop이 같아질때 입니다.

![녹화_2024_07_30_23_43_29_739](https://github.com/user-attachments/assets/adfe185e-7240-4bd4-b3a6-3d65e9e14d69)
























