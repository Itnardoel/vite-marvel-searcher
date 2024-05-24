import { useCharactersStore } from '../stores/characterStore'
import { Card } from './card'

export const Cards = () => {
  const [characters, favoriteCharacters, isShowFavorites] = useCharactersStore(state => [state.characters, state.favoriteCharacters, state.isShowFavorites])

  return (
    <>
      {isShowFavorites
        ? favoriteCharacters.map((character) => {
          return <Card key={character.id} character={character} />
        })
        : characters.map((character) => {
          return <Card key={character.id} character={character} />
        })}
    </>
  )
}
