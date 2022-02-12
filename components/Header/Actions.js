import {
  PlusCircleIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { modalState } from '../../atoms/modalAtoms'

export const Actions = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState)

  return (
    <div className="flex items-center justify-end space-x-4">
      {session && (
        <HomeIcon onClick={() => router.push('/')} className="navBtn" />
      )}

      {session ? (
        <>
          <div className="navBtn relative">
            <PaperAirplaneIcon className="navBtn rotate-45" />
            <div className="absolute -top-1 -right-2 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs text-white">
              4
            </div>
          </div>

          <PlusCircleIcon
            onClick={() => setIsModalOpen(true)}
            className="navBtn"
          />
          <HeartIcon className="navBtn" />
          <img
            onClick={signOut}
            src={session.user.image}
            alt=""
            className="h-6 w-6 cursor-pointer rounded-full"
          />
        </>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </div>
  )
}

export default Actions
