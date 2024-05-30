import { ComicDetail } from '../components/comicDetail'
import { useCharactersStore } from '../stores/characterStore'
import { Spinner } from '../components/ui/Icons'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react'

export default function ComicPage () {
  const isCharacterComicsLoading = useCharactersStore(state => state.isCharacterComicsLoading)
  const fetchComicByID = useCharactersStore(state => state.fetchComicByID)

  let location = useLocation()

  useEffect(() => {
    fetchComicByID(parseInt(location.pathname.slice(7)))
  }, [location])

  return (
    <>
      {isCharacterComicsLoading ? <Spinner /> : <ComicDetail />}
    </>
  )
}
