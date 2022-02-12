import { CameraIcon } from '@heroicons/react/outline'
import { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Dialog } from '@headlessui/react'
import { db, storage } from '../firebase'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtoms'

const PostUploader = () => {
  const { data: session } = useSession()
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState)
  const [selectedFile, setSelectedFile] = useState(null)
  const filePickerRef = useRef(null)
  const captionRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const uploadPost = async () => {
    if (isLoading) return

    setIsLoading(true)

    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    })

    const imageRef = ref(storage, `posts/${docRef.id}/image`)
    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef)

        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        })
      }
    )

    setIsModalOpen(false)
    setIsLoading(false)
    setSelectedFile(null)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readEvent) => {
      setSelectedFile(readEvent.target.result)
    }
  }

  return (
    <div>
      {selectedFile ? (
        <img
          src={selectedFile}
          className="max-h-52 w-full cursor-pointer object-contain"
          alt=""
          onClick={() => setSelectedFile(null)}
        />
      ) : (
        <div
          onClick={() => filePickerRef.current.click()}
          className="mx-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-100"
        >
          <CameraIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
        </div>
      )}

      <div className="mt-3 text-center sm:mt-5">
        <Dialog.Title
          has="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Upload a Photo
        </Dialog.Title>
        <div>
          <input
            ref={filePickerRef}
            type="file"
            hidden
            accept="image/*"
            onChange={addImageToPost}
          />
        </div>
        <div className="mt-2">
          <input
            type="text"
            ref={captionRef}
            className="w-full border-none text-center focus:ring-0"
            placeholder="Please enter a caption"
          />
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        <button
          onClick={uploadPost}
          disabled={!selectedFile}
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 hover:disabled:bg-gray-300 sm:text-sm"
        >
          {isLoading ? 'Uploading...' : 'Updload post'}
        </button>
      </div>
    </div>
  )
}

export default PostUploader
