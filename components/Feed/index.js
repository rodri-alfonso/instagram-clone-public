import Stories from '../Stories'
import Posts from '../Posts'
import SimpleProfile from './SimpleProfile'
import Suggestions from '../Suggestions'
import { useSession } from 'next-auth/react'

const Feed = () => {
  const { data: session } = useSession()

  return (
    <main
      className={`mx-auto grid grid-cols-1 md:max-w-3xl
    md:grid-cols-2 xl:max-w-5xl xl:grid-cols-3 ${
      !session && '!max-w-3xl !grid-cols-1'
    }`}
    >
      <section className="col-span-2">
        {session && <Stories />}
        <Posts />
      </section>
      {session && (
        <section className="hidden md:col-span-1 xl:inline-grid">
          <div className="fixed top-20">
            <SimpleProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  )
}

export default Feed
