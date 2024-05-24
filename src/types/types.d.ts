export interface Character {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: CharacterThumbnail
  resourceURI: string
  comics: ComicsCharacter[]
  series: Comics
  stories: CharacterStories
  events: Comics
  urls: CharacterURL[]
}

export interface Comics {
  available: number
  collectionURI: string
  items: ComicsItem[]
  returned: number
}

export interface ComicsItem {
  resourceURI: string
  name: string
}

export interface CharacterStories {
  available: number
  collectionURI: string
  items: CharacterStoriesItem[]
  returned: number
}

export interface CharacterStoriesItem {
  resourceURI: string
  name: string
  type: string
}

export interface CharacterThumbnail {
  path: string
  extension: string
}

export interface CharacterURL {
  type: string
  url: string
}

// -------------------------------------------------------

export interface ComicsCharacter {
  id: number
  digitalId: number
  title: string
  issueNumber: number
  variantDescription: VariantDescription
  description: null | string
  modified: string
  isbn: string
  upc: string
  diamondCode: string
  ean: string
  issn: string
  format: Format
  pageCount: number
  textObjects: TextObject[]
  resourceURI: string
  urls: URL[]
  series: Series
  variants: Series[]
  collections: unknown[]
  collectedIssues: unknown[]
  dates: DateElement[]
  prices: Price[]
  thumbnail: Thumbnail
  images: Thumbnail[]
  creators: Creators
  characters: ComicsCharacters
  stories: Stories
  events: ComicsCharacters
}

export interface ComicsCharacters {
  available: number
  collectionURI: string
  items: Series[]
  returned: number
}

export interface Series {
  resourceURI: string
  name: string
}

export interface Creators {
  available: number
  collectionURI: string
  items: CreatorsItem[]
  returned: number
}

export interface CreatorsItem {
  resourceURI: string
  name: string
  role: Role
}

export enum Role {
  Colorist = 'colorist',
  Editor = 'editor',
  Inker = 'inker',
  Letterer = 'letterer',
  Penciler = 'penciler',
  Penciller = 'penciller',
  PencillerCover = 'penciller (cover)',
  Writer = 'writer',
}

export interface DateElement {
  type: DateType
  date: string
}

export enum DateType {
  DigitalPurchaseDate = 'digitalPurchaseDate',
  FocDate = 'focDate',
  OnsaleDate = 'onsaleDate',
  UnlimitedDate = 'unlimitedDate',
}

export enum Format {
  Comic = 'Comic',
}

export interface Thumbnail {
  path: string
  extension: Extension
}

export enum Extension {
  Jpg = 'jpg',
}

export interface Price {
  type: PriceType
  price: number
}

export enum PriceType {
  DigitalPurchasePrice = 'digitalPurchasePrice',
  PrintPrice = 'printPrice',
}

export interface Stories {
  available: number
  collectionURI: string
  items: StoriesItem[]
  returned: number
}

export interface StoriesItem {
  resourceURI: string
  name: string
  type: ItemType
}

export enum ItemType {
  Cover = 'cover',
  InteriorStory = 'interiorStory',
}

export interface TextObject {
  type: TextObjectType
  language: Language
  text: string
}

export enum Language {
  EnUs = 'en-us',
}

export enum TextObjectType {
  IssuePreviewText = 'issue_preview_text',
  IssueSolicitText = 'issue_solicit_text',
}

export interface URL {
  type: URLType
  url: string
}

export enum URLType {
  Detail = 'detail',
  InAppLink = 'inAppLink',
  Purchase = 'purchase',
  Reader = 'reader',
}

export enum VariantDescription {
  Empty = '',
  SpotlightVariant = 'SPOTLIGHT VARIANT',
  ZombieVariant = 'ZOMBIE VARIANT',
}
