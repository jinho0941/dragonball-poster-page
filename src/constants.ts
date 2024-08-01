import { CharacterType, TransformType } from './type'

export const characters = [
  {
    name: '손오공',
    icon: '/s.png',
    engName: 'songoku',
    type: CharacterType.S,
    characterInfo: [
      {
        transformType: TransformType.SAI,
        transformName: '초사이어인',
        imgSrc: '/s2.webp',
        width: 750,
        comment: '"넌 내 소중한 것들을 많이 빼앗아 갔어.. 절대로 용서 못해!"',
        iconSrc: '/s-sai-icon.png',
      },
      {
        transformType: TransformType.GOD,
        transformName: '초사이어인 갓',
        imgSrc: '/s3.webp',
        width: 550,
        comment: '"별은 부술 수 있어도, 단 한 명의 인간은 부술 수 없나보군..."',
        iconSrc: '/s-god-icon.png',
      },
      {
        transformType: TransformType.BLUE,
        transformName: '초사이어인 블루',
        imgSrc: '/s4.webp',
        width: 900,
        comment: '"이제부터가 진정한 승부다."',
        iconSrc: '/s-blue-icon.png',
      },
    ],
  },
  {
    name: '배지터',
    icon: '/v.png',
    engName: 'vegeta',
    type: CharacterType.V,
    characterInfo: [
      {
        transformType: TransformType.SAI,
        transformName: '초사이어인',
        imgSrc: '/v2.webp',
        width: 650,
        comment: '"움직이지 못하는 사이어인은 필요없다!"',
        iconSrc: '/v-sai-icon.png',
      },
      {
        transformType: TransformType.GOD,
        transformName: '초사이어인 갓',
        imgSrc: '/v3.webp',
        width: 550,
        comment: '"노력해도 절대 넘어설 수 없는 벽이 있다는 것을 보여주마."',
        iconSrc: '/v-god-icon.png',
      },
      {
        transformType: TransformType.BLUE,
        transformName: '초사이어인 블루',
        imgSrc: '/v4.webp',
        width: 350,
        comment: '"파괴할 수조차 없는 기술을 먹여주지."',
        iconSrc: '/v-blue-icon.png',
      },
    ],
  },
  {
    name: '오지터',
    icon: '/sv-normal-icon.png',
    engName: 'Gogeta',
    type: CharacterType.SV,
    characterInfo: [
      {
        transformType: TransformType.NORMAL,
        transformName: '노말',
        imgSrc: '/sv1.png',
        width: 650,
        comment: '"흠, 난 오지터. 오공과 베지터가 합체한 거라고."',
        iconSrc: '/sv-normal-icon.png',
      },
      {
        transformType: TransformType.SAI,
        transformName: '초사이어인',
        imgSrc: '/sv2.webp',
        width: 650,
        comment: '"30분이나 필요 없어. 손가락 하나면 충분하다!"',
        iconSrc: '/sv-sai-icon.png',
      },
      {
        transformType: TransformType.BLUE,
        transformName: '초사이어인 블루',
        imgSrc: '/sv3.webp',
        width: 550,
        comment: '"자, 이제 결판을 내자고."',
        iconSrc: '/sv-blue-icon.png',
      },
    ],
  },
]

export const stories = [
  { imgSrc: '/story1.png', title: '브로리의 유배, 복수의 다짐' },
  { imgSrc: '/story2.png', title: '복수의 시작, 파라가스의 야망' },
  { imgSrc: '/story3.png', title: '분노의 브로리 사이언인의 위기' },
  { imgSrc: '/story4.png', title: '파라가스의 죽음, 각성 브로리' },
  { imgSrc: '/story5.png', title: '오지터의 등장, 싸움의 끝' },
]
