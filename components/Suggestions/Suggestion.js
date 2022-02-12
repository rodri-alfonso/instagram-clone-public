const Suggestion = ({ avatar, username }) => {
  return (
    <div className="mt-3 flex items-center justify-between">
      <img
        src={avatar}
        alt=""
        className="h-10 w-10 rounded-full border p-[2px]"
      />

      <div className="ml-4 flex-1">
        <h2 className="text-sm font-semibold">{username}</h2>
        <h3 className="text-xs text-gray-400">New in Instagram</h3>
      </div>

      <button className="text-sm font-bold text-blue-400">Follow</button>
    </div>
  )
}

export default Suggestion
