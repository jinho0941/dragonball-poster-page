## 드래곤볼 극장판을 홍보하기 위한 목적의 마케팅 페이지를 만드는 것이 목표입니다.

### deploy link: https://dragon-ball-poster.vercel.app/

### 프로젝트 시연 영상
<img src="https://github.com/user-attachments/assets/21ff1fc0-78a3-4690-b464-2c804de5171b" width="50%" height="50%"/>

plan link: https://www.tldraw.com/s/v2_c_XNcsCXgvE_9spXKDDf0r_?v=-1018,-1197,4789,3197&p=9rQ6aveV1WIcvP5gjlqFI
<img src="https://github.com/user-attachments/assets/4c3d1d69-cbae-47a8-ae69-7fa3b51a6927" width="50%" height="50%"/>


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
이유는 휠을 내리고 조금이라도 휠을 올리면 바로 이전페이지로 가기 때문에 유저의 조그만한 움직임으로도 민감하게 반응을 하여 부정적인 경험이 될것이라 생각했습니다.   

<img src="https://github.com/user-attachments/assets/d3a97da8-5d3f-4ff7-ab09-98f656b79ccb" width="50%" height="50%"/>


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

<img src="https://github.com/user-attachments/assets/adfe185e-7240-4bd4-b3a6-3d65e9e14d69" width="30%" height="30%"/>

main ref와 각각 page ref는 이미 존재하니 이를 가지고 이를 채크할 스크롤이벤트를 하나 더 생성해주었습니다.   
```
 const handleScrollEnd = () => {
   const currentScrollTop = mainRef.current?.scrollTop
   const targetScrollTop = pageRefs.current[nextPage].offsetTop
   if (
     currentScrollTop! - 1 < targetScrollTop &&
     targetScrollTop < currentScrollTop! + 1
   ) {
     setIsScrolling(false)
     mainRef.current?.removeEventListener('scroll', handleScrollEnd)
   }
 }

 mainRef.current?.addEventListener('scroll', handleScrollEnd)
```
위 로직으로 이제 정확히 스크롤이 끝난지점에 setIsScroll(false)를 실행하여 보다 안정적으로 페이지 이동이 가능해 졌습니다.

하지만 여기서 또 치명적인 문제가 발생하였습니다.   

시작 페이지에서 위로 스크롤을 하면 바로 setIsScroll(true)가 실행이 되고,   
```
if (
  currentScrollTop! - 1 < targetScrollTop &&
  targetScrollTop < currentScrollTop! + 1
) {
  setIsScrolling(false)
  mainRef.current?.removeEventListener('scroll', handleScrollEnd)
}
```
아래 로직의 조건에 들어오지 못하여 isScroll이 항상 true가 되어,    
wheel event가 계속 block 상태로 wheel로 페이지 이동을 못하는 상황이 되어버렸습니다.   

<img src="https://github.com/user-attachments/assets/bc368344-bdba-4d91-b485-9029bf874282" width="50%" height="50%"/>

이를 해결하기 위해 wheel evnet에 조건을 더 달아 주어야 겠다고 생각했고 해당 조건은 아래와 같습니다.    
- current page가 첫번째 페이지이고 wheel up 을 하면 즉시 return하여 setIsScroll(true)를 실행을 못하게 막기.   

이는 반대 상황도 마찬가지 입니다.   

```
 if (
   (event.deltaY > 0 && currentPageNum === maxPage) ||
   (event.deltaY < 0 && currentPageNum === minPage)
 ) {
   return
 }
 if (isScrolling) return
...
setIsScroll(ture)
```

마지막으로 자주 발생하는 상황은 아니라 치명적이지는 않지만 발생하면 불쾌한 경험을 줄수있는 문제가 존재하였는데,   

<img src="https://github.com/user-attachments/assets/7d38bb3b-81d3-42f8-ba9c-31710e02bc7f" width="50%" height="50%"/>

위의 영상처럼 browser의 크기가 변하면 페이지가 짤리게 되는 현상이 발견되었습니다.   
위 아래 크기를 조절하는 경우는 거의 없어서 수정하지 않아도 별 문제는 없을거라 생각하였지만,   

그래도 간단하게 문제를 고칠수 있을거 같아서 시도해 보았습니다.   

이 문제를 해결할려면 아래와 같이 조건을 설정해야합니다.
- 전채 화면 사이즈가 변경되는것을 감지해야함.
- 새로 사이즈가 변할떄 마다 mainRef의 top을 현재 패이지의 offsetTop에 맞게 업데이트 해주어야함.

이를 구현하기 위해 저는 아래와 같이 코드를 작성하였습니다.
```
const handleResize = () => {
 mainRef.current?.scrollTo({
   top: pageRefs.current[currentPageNum].offsetTop,
 })
}

useEffect(() => {
 mainRef.current?.addEventListener('resize', handleResize)
 return () => {
   mainRef.current?.removeEventListener('resize', handleResize)
 }
}, [])
```
resize event에 변할때마다 page offsetTop으로 이동시켜주는 로직을 작성하였습니다.   

하지만 정상적으로 작동이 되지 않았고 때문에 디버깅하였고,  
문제는 resize event가 동작하지 않은게 원인이였습니다.

```
const handleResize = () => {
 console.log('resize ?')
}

useEffect(() => {
 mainRef.current?.addEventListener('resize', handleResize)
 return () => {
   mainRef.current?.removeEventListener('resize', handleResize)
 }
}, [])
```

<img src="https://github.com/user-attachments/assets/f911b6a2-9f48-4839-b559-47a90733e91b" width="50%" height="50%"/>

위 그림처럼 resize가 되어도 log가 찍히지를 않았고 저는 이 문제를 해결하기 위해 로직을 살펴보았으나,   
분명히 event를 추가했는데 안되어 방법을 모르겠어서 gpt에개 해당 코드를 주어 무엇이 문제인지 물어보아서 답을 얻었습니다.
```
but the resize event should be attached to the window object instead.
The resize event is a global event that is triggered when the browser window is resized,
not when a specific element is resized.
```
- rezise event는 dom 차원이 아닌 window 차원에서 이루어 지기 때문에 window 객체에 event를 추가해야된다.

위 답변을 받고 수정을 하여 동작을 해보니.
```
const handleResize = () => {
 console.log('resize ?')
}

useEffect(() => {
 window.addEventListener('resize', handleResize)
 return () => {
   window.removeEventListener('resize', handleResize)
 }
}, [])
```

<img src="https://github.com/user-attachments/assets/cef08c56-2209-40a5-ac6f-341108eb79cf" width="50%" height="50%"/>

log가 잘 찍혔고 이를 기반으로 event를 추가하였습니다.

```
const handleResize = () => {
 mainRef.current?.scrollTo({
   top: pageRefs.current[currentPageNum].offsetTop,
 })
}

useEffect(() => {
 window.addEventListener('resize', handleResize)
 return () => {
   window.removeEventListener('resize', handleResize)
 }
}, [])
```

하지만 또 버그가 생겼고 해당 버그는 아래 이미지 처럼 resize를 하는순간 첫 페이지에 top(0)으로 고정되어버리는 것입니다.
<img src="https://github.com/user-attachments/assets/880c4e09-bc82-45ba-b0f3-8e64f2b6edc0" width="50%" height="50%"/>

해당 버그는 치명적인 버그라 반드시 수정이 필요했고 디버깅을 하기 위해 상황을 분석해보았습니다.

- resize event가 발생하면 mainRef의 top이 0으로 되어버림
- 해당 부분을 실행하는 로직은 top: pageRefs.current[currentPageNum].offsetTop,
- 0이 될려면 조건이 currentPageNum 이 0(첫번째 페이지) 여야 함.

위와 같은 생각을 하였고 그러면 handleResize함수의 currnetPageNum은 무슨 이유에서인지 계속 0인 상태로 update가 안되는 상황이였습니다.

이는 비교적 쉽게 해결이 가능하였는데 해당 함수를 등록(실행) 하는 부분은 아래 부분입니다.
```
useEffect(() => {
 window.addEventListener('resize', handleResize)
 return () => {
   window.removeEventListener('resize', handleResize)
 }
}, [])
```

이때 초기 mount가 되고 handleResize 함수는 currnetPageNum이 0인 상태로 evnet에 등록이 됩니다.   

때문에 계속 resize를 할때마다 최상단으로 올라가는거였습니다.  

문제 해결은 간단하게 currentPageNum 이 변할때마다 handleReisze함수를 초기화 시켜 문제를 해결하였습니다.

```
useEffect(() => {
 window.addEventListener('resize', handleResize)
 return () => {
   window.removeEventListener('resize', handleResize)
 }
}, [currentPageNum])
```
<img src="https://github.com/user-attachments/assets/f32fda7f-f402-4ca5-8e69-56c9c497df57" width="50%" height="50%"/>

이제 page단위의 scroll component를 완성하였으니 다음으로 기획을 바탕으로 메인 콘탠츠들을 작성하였습니다.   

기획: https://www.tldraw.com/s/v2_c_XNcsCXgvE_9spXKDDf0r_?v=-1018,-1197,4789,3197&p=9rQ6aveV1WIcvP5gjlqFI

### landing page
reference: https://www.transformersmovie.com/synopsis/

랜딩 페이지는 사이트의 첫인상 이라고 생각하여 유저가 방문했을때 해당 영화의 하이라이트를 보여주어 영화를 보고싶게 만들게 하기위해,   
영화의 하이라이트 부분을 배경으로 넣었습니다.

<img src="https://github.com/user-attachments/assets/da3e6ff9-ceee-40d5-8566-23e93b97f6a8" width="50%" height="50%"/>

그 다음으로 메인 콘탠츠들을 넣어 아래와 같이 포스터를 꾸몄습니다.

<img src="https://github.com/user-attachments/assets/0c45cd62-0f2c-4a7c-baf8-ccceac0c3988" width="50%" height="50%"/>

기획은 글자를 하나씩 보여주어서 해당 영상 장면처럼 근엄한 분위기를 주고싶었습니다.

구현은 아래 사이트 코드를 참조하였습니다.   
site link: https://ui.aceternity.com/components/text-generate-effect

### character info page
reference: https://df.nexon.com/pg/characters/main#prev

다음은 캐릭터 소개 페이지 입니다.  

배치를 2번째로 한 이유는 스토리에 캐릭터들이 나오니 캐릭터를 먼저 알아야지 스토리를 이해하는데 맞겠다고 생각하여서 입니다.   

오른쪽에는 전채 page를 움직이는 nav buttons가 있으니,  
왼쪽에 character nav buttons를 배치하였습니다.  

또한 중앙에 캐릭터를 배치하고, 각각 변신 폼이 있으니 마찬가지로 왼쪽에 form buttons를 배치하여,   
자연스럽게 캐릭터 관련 nav를 왼쪽에서 관리하여 ux적으로 편리하게 설정하였습니다.

대사는 해당 캐릭터를 잘 나타내는 짧은 대사로 오른쪽에 배치하여 공백을 채웠습니다.   

전반적으로 캐릭터 이름과 캐릭터 이미지, 대사를 통해 대략적인 캐릭터의 성향을 파악할수 있도록 하였습니다.

<img src="https://github.com/user-attachments/assets/3459ed52-dfc0-4ccf-b4de-78055525e078" width="50%" height="50%"/>

### story page
reference: https://universe.leagueoflegends.com/ko_KR/

마지막 페이지로는 스토리 페이지 입니다.

레퍼런스 처럼 케러셀로 스토리를 나열하고 버튼으로 index 조작이 가능하며,    
이동 후에는 약간의 delay 후에 자연스럽게 image가 커지는 방식으로 깔끔하게 ui를 구성하였습니다.

이는 간단하게 setTimeout으로 currentIndex가 변한 뒤 딜레이를 주어 업데이트 하는 방식으로 구현하였습니다.
```
useEffect(() => {
 setTimeout(() => {
   setDelayIndex(currentIndex)
 }, 500)
}, [currentIndex])
```
<img src="https://github.com/user-attachments/assets/eb5efc54-c1eb-4fc7-a722-d9cc8e08d434" width="50%" height="50%"/>

여기까지가 project의 설명, 구현중 발생한 문제점, 해결 방식을 작성한 글이였습니다.

읽어주셔서 진심으로 감사드립니다.
