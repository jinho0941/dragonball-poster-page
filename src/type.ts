export enum CharacterType {
  S,
  V,
  SV,
}

export enum TransformType {
  NORMAL,
  SAI,
  GOD,
  BLUE,
}

export type CharacterInfo = {
  transformType: TransformType
  transformName: string
  imgSrc: string
  width: number
  comment: string
  iconSrc: string
}

export type Character = {
  name: string
  icon: string
  engName: string
  type: CharacterType
  characterInfo: CharacterInfo[]
}
