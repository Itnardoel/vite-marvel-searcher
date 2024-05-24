import { useCharactersStore } from '../stores/characterStore'

export const ComicDetail = () => {
  const comicDetail = useCharactersStore(state => state.comicDetail)

  // TODO if location.pathname.includes('comic') fetch the comic with a function calling API /v1/public/comics/{comicId}

  // if (location.pathname.includes('comic')) {
  //   console.log(location.pathname.slice(7))
  // }

  if (Object.keys(comicDetail).length === 0) return

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 pt-10 pr-4 pb-4 pl-4">
      <img src={`${comicDetail.thumbnail.path}/detail.${comicDetail.thumbnail.extension}`} alt={comicDetail.title} className='self-center' />
      <article className="flex flex-col gap-10 basis-auto lg:basis-[550px]">
        <h1 className='font-[Montserrat] leading-5 text-2xl font-semibold text-[#3E3E3E]'>
          {comicDetail.title}
        </h1>
        <div className='font-[Montserrat] leading-5 text-lg font-normal text-left text-[#3E3E3E]'>
          <p>Published: {new Date(comicDetail.dates[0].date).toDateString().split(' ').slice(1, 4).join(' ')}</p>
          {comicDetail.creators.items.map((creator, index) => {
            return (
              <p key={index}>
                {creator.role.charAt(0).toUpperCase() + creator.role.slice(1)}: {creator.name}
              </p>
            )
          })}
        </div>
        <p className='font-[Montserrat] leading-5 text-lg font-light text-left text-[#3E3E3E]'>
          {comicDetail.description}
        </p>
      </article>
    </div>
  )
}
