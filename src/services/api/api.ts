import { md5 } from '../../utils/helpers'
import { type ComicsCharacter } from '../../types/types.d'

const BASE_URL = 'https://gateway.marvel.com/v1/public/'
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY
const ts = Date.now().toString()
const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY)
const BASE_PARAMS = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
const TOTAL_CHARACTERS_API = 1564
const API_REQUEST_LIMIT = 8
const offset = Math.floor((Math.random() * (TOTAL_CHARACTERS_API - API_REQUEST_LIMIT)))
let comicPage = 0
let currentCharacterId = 0

export const getCharacters = async (filter?: string) => {
  if (filter === undefined || filter === '') { // <-- API call without filter
    try {
      const res = await fetch(`${BASE_URL}characters?${BASE_PARAMS}&limit=${API_REQUEST_LIMIT}` + `&offset=${offset}`)
      if (!res.ok) throw new Error('Error on fetch')
      const json = await res.json()
      return json.data.results
    } catch (error) {
      console.error(error)
    }
  } else { // <-- API call with filter
    try {
      const res = await fetch(`${BASE_URL}characters?${BASE_PARAMS}&limit=100` + `&nameStartsWith=${filter}`)
      if (!res.ok) throw new Error('Error on fetch')
      const json = await res.json()
      return json.data.results
    } catch (error) {
      console.error(error)
    }
  }
}

export const getCharacterComicsById = async (characterId: number): Promise<{comics: ComicsCharacter[], totalComics: boolean}> => {
  // check if clicked character is diferent to reset offset
  if (currentCharacterId !== characterId) {
    currentCharacterId = characterId
    comicPage = 0
  }
  try {
    const res = await fetch(`${BASE_URL}characters/${characterId}/comics?${BASE_PARAMS}&limit=${API_REQUEST_LIMIT}&offset=${comicPage}`)
    if (!res.ok) throw new Error('Error on fetch')
    comicPage += API_REQUEST_LIMIT // <-- pagination
    const json = await res.json()
    if (json.data.total <= comicPage) {
      return {comics: json.data.results, totalComics: false}
    }
    return {comics: json.data.results, totalComics: true}
  } catch (error) {
    console.error(error)
    return {comics: [], totalComics: false}
  }
}

export const getComicById = async (comicId: number) => {
  try {
    const res = await fetch(`${BASE_URL}comics/${comicId}?${BASE_PARAMS}`)
    if (!res.ok) throw new Error('Error on fetch')
    const json = await res.json()
    return json.data.results
  } catch (error) {
    console.error(error)
  }
}
