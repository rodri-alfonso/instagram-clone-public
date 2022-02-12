import Actions from './Actions'
import SearchInput from './SearchInput'
import Logo from './Logo'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-5 flex h-16 max-w-5xl justify-between xl:mx-auto">
        <Logo />
        <SearchInput />
        <Actions />
      </div>
    </header>
  )
}

export default Header
