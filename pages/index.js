import Head from 'next/head'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Modal from '../components/Modal'
import PostUploader from '../components/PostUploader'

import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtoms'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState)

  return (
    <div className="h-screen overflow-y-scroll bg-gray-50 scrollbar-hide">
      <Head>
        <title>Instagram clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Feed />
      <Modal
        content={<PostUploader />}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
