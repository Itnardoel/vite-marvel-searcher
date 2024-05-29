import { useNavigate } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { useCharactersStore } from '../../stores/characterStore'
import { SearchIcon } from './Icons'

const DELAY_IN_MS = 300

export default function SearchInput () {
  const fetchCharacters = useCharactersStore(state => state.fetchCharacters)
  const toggleShowFavorites = useCharactersStore(state => state.toggleShowFavorites)
  const isShowFavorites = useCharactersStore(state => state.isShowFavorites)
  const fetchComicByID = useCharactersStore(state => state.fetchComicByID)
  const navigate = useNavigate()

  const handleChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(location.search)
    const query = event.target.value

    if (query.startsWith('https://www.marvel.com/comics/issue/')) {
      const matches = (query.match(/\d+/g))
      if (matches !== null) {
        fetchComicByID(parseInt(matches[0]))
        navigate(`/comic/${matches[0]}`)
      }
      return
    }

    navigate('/')

    if (query.startsWith(' ')) {
      event.target.value = ''
      return
    }

    if (query !== '') {
      params.set('character', query.trim())
      history.pushState({}, '', `${location.pathname}?${params.toString()}`)
    } else {
      params.delete('character')
      history.pushState({}, '', location.pathname)
    }

    isShowFavorites && toggleShowFavorites()
    fetchCharacters(query.trim())
  }, DELAY_IN_MS)

  return (
    <div className="flex w-full md:w-5/12 relative items-center">
      <SearchIcon style='w-6 h-6 mx-4 absolute pointer-events-none' />
      <input
        onChange={(event) => { handleChange(event) }}
        className={'w-full focus:outline-none indent-14 focus:-indent-0 focus:z-10 font-[Roboto] text-xl'}
        type="search"
        placeholder="Search"
        defaultValue={new URLSearchParams(location.search).get('character')?.toString()}
      />
    </div>
  )
}
