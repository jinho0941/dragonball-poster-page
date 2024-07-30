## 드래곤볼 극장판을 홍보하기 위한 목적의 마케팅 페이지를 만드는 것이 목표입니다.

### deploy link: https://dragon-ball-poster.vercel.app/
plan link: https://www.tldraw.com/s/v2_c_XNcsCXgvE_9spXKDDf0r_?v=-1018,-1197,4789,3197&p=9rQ6aveV1WIcvP5gjlqFI
   
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

<img src="https://github.com/user-attachments/assets/6c21f491-f298-4ba0-82e1-b6017776f932" width="50%" height="50%"/>

하지만 여기서 문제점이 발생하였습니다.   

휠을 아래로 내려 다음페이지로 가는 도중에 살짝이라도 올리면 바로 이전페이지로 가는것이 사용성에 문제가 된다고 생각이 되었습니다.   
이유는 휠을 내리고 조금이라도 휠을 올리면 바로 이전페로 감사합니다.






