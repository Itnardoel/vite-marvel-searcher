import { md5 } from '../../utils/helpers'

const BASE_URL = 'https://gateway.marvel.com/v1/public/'
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY
const ts = Date.now().toString()
const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY)
const BASE_PARAMS = `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
const TOTAL_CHARACTERS_API = 1564
const API_REQUEST_LIMIT = 8
const offset = Math.floor((Math.random() * (TOTAL_CHARACTERS_API - API_REQUEST_LIMIT)))

export const getCharacters = async (filter?: string) => {
  if (filter === undefined || filter === '') { // <-- Call API without filter
    try {
      const res = await fetch(`${BASE_URL}characters?${BASE_PARAMS}&limit=${API_REQUEST_LIMIT}` + `&offset=${offset}`)
      const json = await res.json()
      return json.data.results
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  } else { // <-- Call API with filter
    try {
      const res = await fetch(`${BASE_URL}characters?${BASE_PARAMS}&limit=${API_REQUEST_LIMIT}` + `&nameStartsWith=${filter}`)
      const json = await res.json()
      return json.data.results
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }
}

export const getCharacterComicsById = async (characterId: number) => {
  try {
    const res = await fetch(`${BASE_URL}characters/${characterId}/comics?${BASE_PARAMS}&limit=${API_REQUEST_LIMIT}`)
    const json = await res.json()
    return json.data.results
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
