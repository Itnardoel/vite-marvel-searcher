import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { type ComicsCharacter } from '../types/types.d'
import { StarIcon } from './ui/Icons'
import { useCharactersStore } from '../stores/characterStore'

export const Comic = ({ comic }: { comic: ComicsCharacter }) => {
  const getCharacterComicByID = useCharactersStore(state => state.getCharacterComicByID)
  const toggleShowModal = useCharactersStore(state => state.toggleShowModal)
  const handleFavoriteComics = useCharactersStore(state => state.handleFavoriteComics)
  const characterName = useCharactersStore(state => state.characterName)
  const favoriteCharacters = useCharactersStore(state => state.favoriteCharacters)

  const foundIndexToShowComics = favoriteCharacters.findIndex(favoriteCharacter => favoriteCharacter.name === characterName)

  const handleClick = (id: number) => {
    getCharacterComicByID(id)
    toggleShowModal()
  }

  const togglefav = (comic: ComicsCharacter) => {
    if (foundIndexToShowComics === -1) {
      toast.error(`${characterName} cannot be found in favorites`)
    } else {
      favoriteCharacters[foundIndexToShowComics].comics.some(favoriteComic => favoriteComic.id === comic.id) ? toast.error(`Removed ${comic.title} from favorites`) : toast.success(`Added ${comic.title} to favorites`)
    }
    handleFavoriteComics(comic)
  }

  return (
    <div key={comic.id} className='flex gap-3  mr-3 hover:bg-gray-100'>
      <Link to={`comic/${comic.id}`} className='flex-shrink-0'>
        <img src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`} alt={comic.title} className='rounded self-start' onClick={() => { handleClick(comic.id) }} />
      </Link>
      <div className='flex flex-col gap-3 max-h-[213px]'>
        <h2 className='font-semibold font-[Montserrat] text-lg'>{comic.title}
          {favoriteCharacters[foundIndexToShowComics]?.comics.some(favoriteComic => favoriteComic.id === comic.id)
            ? <StarIcon handleClick={() => { togglefav(comic) }} style='inline-block align-sub size-5' color='#A8A8A8' stroke='#A8A8A8' />
            : <StarIcon handleClick={() => { togglefav(comic) }} style='inline-block align-sub size-5' color='none' stroke='#A8A8A8' />
          }
        </h2>
        <p className='overflow-hidden font-light font-[Montserrat] text-base'>{comic.description}</p>
      </div>
    </div>
  )
}
