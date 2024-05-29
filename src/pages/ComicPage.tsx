import { ComicDetail } from '../components/comicDetail'
import { useCharactersStore } from '../stores/characterStore'
import { Spinner } from '../components/ui/Icons'
import { useEffect } from 'react'

export default function ComicPage () {
  const isCharacterComicsLoading = useCharactersStore(state => state.isCharacterComicsLoading)
  const fetchComicByID = useCharactersStore(state => state.fetchComicByID)
  console.log('render')

  useEffect(() => {
    fetchComicByID(parseInt(location.pathname.slice(7)))
  }, [fetchComicByID])

  return (
    <>
      {isCharacterComicsLoading ? <Spinner /> : <ComicDetail />}
    </>
  )
}
