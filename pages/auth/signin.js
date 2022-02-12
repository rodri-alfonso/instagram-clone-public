import { getProviders, signIn } from 'next-auth/react'
import Header from '../../components/Header'

const SignIn = ({ providers }) => {
  return (
    <>
      <Header />

      <div className="-mt-36 flex min-h-screen flex-col items-center justify-center py-2 px-14 text-center">
        <img src="https://links.papareact.com/ocw" alt="" className="w-80" />
        <p className="font-xs italic">
          This is not a REAL app, it's built for studies purposes only
        </p>

        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                className="rounded-lg bg-blue-500 p-3 text-white"
              >
                Sign in With {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default SignIn
