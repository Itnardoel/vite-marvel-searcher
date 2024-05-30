import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Character, type ComicsCharacter } from '../types/types'
import { getCharacters, getCharacterComicsById, getComicById } from '../services/api/api'

interface State {
  characters: Character[]
  fetchCharacters: (filter?: string) => Promise<void>
  isCharactersLoading: boolean
  characterName: string
  setCharacterName: (characterName: string) => void
  characterId: number
  setCharacterId: (characterId: number) => void
  characterComics: {comics: ComicsCharacter[], totalComics: boolean}
  fetchCharacterComics: (id: number) => Promise<void>
  isCharacterComicsLoading: boolean
  getCharacterComicByID: (id: number) => Promise<void>
  fetchComicByID: (id: number) => Promise<void>
  comicDetail: ComicsCharacter | Record<string, never>
  favoriteCharacters: Character[]
  handleFavoriteCharacter: (character: Character) => void
  handleFavoriteComics: (comic: ComicsCharacter) => void
  isShowFavorites: boolean
  toggleShowFavorites: () => void
  isModalOpen: boolean
  toggleShowModal: () => void
}

export const useCharactersStore = create<State>()(
  persist(
    (set, get) => ({

      characters: [],

      fetchCharacters: async (filter) => {
        set({ isCharactersLoading: true })
        const charactersFromAPI: Character[] = await getCharacters(filter)
        set({ characters: charactersFromAPI })
        set({ isCharactersLoading: false })
      },

      favoriteCharacters: [],

      isCharactersLoading: false,

      characterName: '',

      setCharacterName: (characterName) => {
        set({ characterName })
      },

      characterId: 0,

      setCharacterId: (characterId) => {
        set({ characterId })
      },

      characterComics: {comics: [], totalComics: false},

      fetchCharacterComics: async (characterId) => {
        if (get().characterId !== characterId) {
          set({ characterComics: {comics: [], totalComics: false} })
        }
        set({ isCharacterComicsLoading: true })
        // const characterComicsFromAPI = await getCharacterComicsById(characterId)
        const {comics, totalComics} = await getCharacterComicsById(characterId)
        // set({ characterComics: {comics: [...get().characterComics.comics, ...characterComicsFromAPI?.comics], totalComics: characterComicsFromAPI.totalComics} })
        set({ characterComics: {comics: [...get().characterComics.comics, ...comics], totalComics: totalComics} })
        set({ isCharacterComicsLoading: false })
      },

      isCharacterComicsLoading: false,

      getCharacterComicByID: async (id) => {
        // Search comics in localstorage if is showing favorites
        if (get().isShowFavorites) {
          const foundComicsIndex = get().favoriteCharacters.findIndex(favoriteCharacter => favoriteCharacter.name === get().characterName)
          if (foundComicsIndex === -1) return
          const comicFound = get().favoriteCharacters[foundComicsIndex].comics.find(comic => comic.id === id)
          set({ comicDetail: comicFound })
          return
        }

        const comicFound = get().characterComics.comics.find(comic => comic.id === id)
        set({ comicDetail: comicFound })
      },

      fetchComicByID: async (characterId) => {
        set({ isCharacterComicsLoading: true })
        const [comicFromAPI] = await getComicById(characterId)
        set({ comicDetail: comicFromAPI })
        set({ isCharacterComicsLoading: false })
      },

      comicDetail: {},

      handleFavoriteCharacter: (newCharacter) => {
        const actualFavoriteCharacters = get().favoriteCharacters
        const found = actualFavoriteCharacters.find(character => character.id === newCharacter.id)

        if (found !== undefined) {
          const filteredFavoriteCharacters = actualFavoriteCharacters.filter(character => character.id !== found.id)
          set({ favoriteCharacters: filteredFavoriteCharacters })
          return
        }
        set({ favoriteCharacters: [...actualFavoriteCharacters, { ...newCharacter, comics: [] }] })
      },

      handleFavoriteComics: (newComic) => {
        const actualFavoriteCharacters = get().favoriteCharacters

        const index = actualFavoriteCharacters.findIndex(character => character.name === get().characterName)

        if (index === -1) return

        const foundComic = actualFavoriteCharacters[index].comics.find(comic => comic.title === newComic.title)

        const updatedFavoriteCharacters = structuredClone(actualFavoriteCharacters)

        if (foundComic !== undefined) {
          const filteredFavoriteCharacterComics = updatedFavoriteCharacters[index].comics.filter(comic => comic.id !== foundComic.id)
          updatedFavoriteCharacters[index].comics = filteredFavoriteCharacterComics
          set({ favoriteCharacters: updatedFavoriteCharacters })
          return
        }

        updatedFavoriteCharacters[index].comics.push(newComic)
        set({ favoriteCharacters: updatedFavoriteCharacters })
      },

      isShowFavorites: false,
      toggleShowFavorites: () => {
        set((state) => ({ isShowFavorites: !(state.isShowFavorites) }))
      },

      isModalOpen: false,
      toggleShowModal: () => {
        set((state) => ({ isModalOpen: !(state.isModalOpen) }))
      }
    }),

    {
      name: 'characters-storage',
      partialize: (state) => ({ favoriteCharacters: state.favoriteCharacters })
    }
  )
)

useCharactersStore.getState().fetchCharacters(new URLSearchParams(location.search).get('character')?.toString())
