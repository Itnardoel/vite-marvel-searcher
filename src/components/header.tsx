import { Link } from 'react-router-dom'
import { useCharactersStore } from '../stores/characterStore'
import { MarvelIcon, StarIcon } from './ui/Icons'
import SearchInput from './ui/SearchInput'

export const Header = () => {
  const [isShowFavorites, toggleShowFavorites] = useCharactersStore(state => [state.isShowFavorites, state.toggleShowFavorites])

  const params = new URLSearchParams(location.search)
  const character = params.get('character')
  const isParams = character !== null

  return (
    <header className="w-full flex justify-between md:justify-center md:gap-x-8 items-center shadow-md bg-white">
      <Link to={isParams ? `/?character=${character}` : '/'}>
        <MarvelIcon style='mx-4 my-2' />
      </Link>
      <SearchInput />
      {isShowFavorites
        ? <StarIcon handleClick={toggleShowFavorites} style='size-8 mx-4 shrink-0' color='#A8A8A8' stroke='A8A8A8' />
        : <StarIcon handleClick={toggleShowFavorites} style='size-8 mx-4 shrink-0' color='none' stroke='#A8A8A8' />}
    </header>
  )
}
