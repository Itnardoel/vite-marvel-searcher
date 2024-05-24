import { useCharactersStore } from '../stores/characterStore'
import { Cards } from './cards'
import { ModalComics } from './modal'

export default function Characters () {
  const isShowFavorites = useCharactersStore(state => state.isShowFavorites)
  const favoriteCharacters = useCharactersStore(state => state.favoriteCharacters)

  return (
    <main className="flex flex-col items-center">
      {isShowFavorites && favoriteCharacters.length === 0 && <h2 className='text-2xl font-semibold font-[Montserrat] pt-8'>No favorite characters</h2>}
      <div className="grid grid-cols-auto-fill gap-9 pt-10 pb-4 w-2/4">
        <Cards />
      </div>
      <ModalComics />
    </main>
  )
}
