import { useNavigate } from 'react-router-dom'
import { useCharactersStore } from '../stores/characterStore'
import { MarvelIcon, StarIcon } from './ui/Icons'
import SearchInput from './ui/SearchInput'

export const Header = () => {
  const [isShowFavorites, toggleShowFavorites] = useCharactersStore(state => [state.isShowFavorites, state.toggleShowFavorites])

  const navigate = useNavigate()

  const handleClick = () => {
    isShowFavorites && toggleShowFavorites()
    navigate('/')
  }

  return (
    <header className="w-full flex justify-between md:justify-center md:gap-x-8 items-center shadow-md bg-white">
      <button type='button' onClick={handleClick}>
        <MarvelIcon style='mx-4 my-2' />
      </button>
      <SearchInput />
      {isShowFavorites
        ? <StarIcon handleClick={toggleShowFavorites} style='size-8 mx-4 shrink-0' color='#A8A8A8' stroke='A8A8A8' />
        : <StarIcon handleClick={toggleShowFavorites} style='size-8 mx-4 shrink-0' color='none' stroke='#A8A8A8' />}
    </header>
  )
}
