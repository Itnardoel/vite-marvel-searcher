import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { Outlet } from 'react-router-dom'
import { useCharactersStore } from '../stores/characterStore'
import { Spinner } from '../components/ui/Icons'

export default function HomePage () {
  const isCharactersLoading = useCharactersStore(state => state.isCharactersLoading)

  return (
    <>
      <Header />
      {isCharactersLoading ? <Spinner /> : <Outlet />}
      <Footer />
    </>
  )
}
