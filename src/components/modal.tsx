import { useCharactersStore } from '../stores/characterStore'
import { CloseIcon, Spinner } from './ui/Icons'
import { Comic } from './comic'

export const ModalComics = () => {
  const characterName = useCharactersStore(state => state.characterName)
  const comics = useCharactersStore(state => state.comics)
  const isCharacterComicsLoading = useCharactersStore(state => state.isCharacterComicsLoading)
  const favoriteCharacters = useCharactersStore(state => state.favoriteCharacters)
  const isShowFavorites = useCharactersStore(state => state.isShowFavorites)
  const toggleShowModal = useCharactersStore(state => state.toggleShowModal)
  const isModalOpen = useCharactersStore(state => state.isModalOpen)

  if (!isModalOpen) return

  const foundComicsIndex = favoriteCharacters.findIndex(favoriteCharacter => favoriteCharacter.name === characterName)

  return (
    <div onClick={toggleShowModal} className="fixed z-10 top-0 right-0 bottom-0 left-0 p-4 flex items-center justify-center bg-[#00000076]">
      <div onClick={(event) => { event.stopPropagation() }} className="w-[437px] h-[448px] p-4 bg-white rounded-xl relative flex overflow-hidden">
        <CloseIcon handleClick={toggleShowModal} />
        {isCharacterComicsLoading
          ? <Spinner style={'flex flex-grow justify-center items-center'} />
          : <div className='flex flex-col gap-3'>
            <h2 className='font-semibold text-2xl font-[Montserrat]'>{characterName}</h2>
            <div className='flex flex-col gap-6 overflow-auto'>
              {
                isShowFavorites
                  ? favoriteCharacters[foundComicsIndex].comics.map(favoriteComic => {
                    return <Comic key={favoriteComic.id} comic={favoriteComic} />
                  })
                  : comics.map(comic => {
                    return <Comic key={comic.id} comic={comic} />
                  })
              }
              {isShowFavorites
                ? favoriteCharacters[foundComicsIndex]?.comics.length === 0 && <h2 className='flex flex-grow justify-center items-center font-normal text-2xl font-[Montserrat]'>No comics</h2>
                : comics.length === 0 && <h2 className='flex flex-grow justify-center items-center font-normal text-2xl font-[Montserrat]'>No comics available</h2>
              }
            </div>
          </div>}
      </div>
    </div>
  )
}
