import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export default function ErrorPage () {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className='flex flex-col gap-8 justify-center items-center h-screen'>
        <h1 className='text-4xl font-bold'>Oops! {error.status}</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className='text-slate-400'>
          <i>{error.data}</i>
        </p>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col gap-8 justify-center items-center h-screen'>
        <h1 className='text-4xl font-bold'>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    )
  }
}
