import { toast } from 'sonner'
import { useCharactersStore } from '../stores/characterStore'
import { StarIcon } from './ui/Icons'
import { type Character } from '../types/types.d'

export const Card = ({ character }: { character: Character }) => {
  const handleFavoriteCharacter = useCharactersStore(state => state.handleFavoriteCharacter)
  const toggleShowModal = useCharactersStore(state => state.toggleShowModal)
  const favoriteCharacters = useCharactersStore(state => state.favoriteCharacters)
  const fetchCharacterComics = useCharactersStore(state => state.fetchCharacterComics)
  const setCharacterName = useCharactersStore(state => state.setCharacterName)
  const characterName = useCharactersStore(state => state.characterName)
  const isShowFavorites = useCharactersStore(state => state.isShowFavorites)
  const setCharacterId = useCharactersStore(state => state.setCharacterId)

  const handleClick = (id: number, name: string) => {
    if (!isShowFavorites && characterName !== name) {
      fetchCharacterComics(id)
      setCharacterName(name)
      setCharacterId(id)
    }
    toggleShowModal()
  }

  const togglefav = (character: Character) => {
    favoriteCharacters.some(storedFavoriteCharacter => storedFavoriteCharacter.id === character.id) ? toast.error(`Removed ${character.name} from favorites`) : toast.success(`Added ${character.name} to favorites`)
    handleFavoriteCharacter(character)
  }

  return (
    <div
      key={character.id}
      className="flex flex-col relative hover:outline outline-[#00BBFE] cursor-pointer"
    >
      <img src={`${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`} alt={`${character.name}`} onClick={() => { handleClick(character.id, character.name) }} />
      <h2 className="absolute bottom-0 left-0 text-neutral-50 text-xl p-3 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {character.name}
      </h2>
      {favoriteCharacters.some(storedFavoriteCharacter => storedFavoriteCharacter.id === character.id)
        ? <StarIcon handleClick={() => { togglefav(character) }} style='absolute size-6 top-0 right-0 mr-4 mt-3 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]' color='#FFF' stroke='#FFF' />
        : <StarIcon handleClick={() => { togglefav(character) }} style='absolute size-6 top-0 right-0 mr-4 mt-3 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]' color='none' stroke='#FFF' />}
    </div>
  )
}
