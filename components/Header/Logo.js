import Image from 'next/image'
import { useRouter } from 'next/router'

const Logo = () => {
  const router = useRouter()
  return (
    <>
      <div
        onClick={() => router.push('/')}
        className="relative inline-grid w-28 cursor-pointer"
      >
        <Image
          src="https://links.papareact.com/ocw"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </>
  )
}

export default Logo
