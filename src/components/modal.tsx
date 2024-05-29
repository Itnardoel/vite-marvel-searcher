import { useCharactersStore } from '../stores/characterStore'
import { CloseIcon, Spinner } from './ui/Icons'
import LoadingButton from './ui/LoadingButton'
import { Comic } from './comic'
import { useState } from 'react'

export const ModalComics = () => {
  const characterName = useCharactersStore(state => state.characterName)
  const comics = useCharactersStore(state => state.comics)
  const isCharacterComicsLoading = useCharactersStore(state => state.isCharacterComicsLoading)
  const favoriteCharacters = useCharactersStore(state => state.favoriteCharacters)
  const isShowFavorites = useCharactersStore(state => state.isShowFavorites)
  const toggleShowModal = useCharactersStore(state => state.toggleShowModal)
  const isModalOpen = useCharactersStore(state => state.isModalOpen)
  const fetchCharacterComics = useCharactersStore(state => state.fetchCharacterComics)
  const characterId = useCharactersStore(state => state.characterId)

  const [isLoadingMore, setIsLoadingMore] = useState(false)

  if (!isModalOpen) return

  const foundComicsIndex = favoriteCharacters.findIndex(favoriteCharacter => favoriteCharacter.name === characterName)

  const handleClick = async () => {
    setIsLoadingMore(true)
    await fetchCharacterComics(characterId)
    setIsLoadingMore(false)
  }

  return (
    <div onClick={toggleShowModal} className="fixed z-10 top-0 right-0 bottom-0 left-0 p-4 flex items-center justify-center bg-[#00000076]">
      <div onClick={(event) => { event.stopPropagation() }} className="w-[437px] h-[448px] p-4 bg-white rounded-xl relative flex overflow-hidden">
        <CloseIcon handleClick={toggleShowModal} />
        {isCharacterComicsLoading && isLoadingMore === false
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
                ? favoriteCharacters[foundComicsIndex]?.comics.length === 0 && <h2 className='flex flex-grow justify-center items-center font-normal text-2xl font-[Montserrat]'>No comics added</h2>
                : comics.length === 0 && <h2 className='flex flex-grow justify-center items-center font-normal text-2xl font-[Montserrat]'>No comics available</h2>
              }
              {!isShowFavorites && !isLoadingMore && <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold self-center py-2 px-4 border border-gray-400 rounded shadow' onClick={handleClick}>Load more comics</button>}
              {!isShowFavorites && isLoadingMore && <LoadingButton />}
            </div>
          </div>}
      </div>
    </div>
  )
}
