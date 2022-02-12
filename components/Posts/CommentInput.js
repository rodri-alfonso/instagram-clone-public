import { EmojiHappyIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'

const CommentInput = ({ onSubmit, comment, setComment }) => {
  const { data: session } = useSession()

  return (
    session && (
      <form
        onSubmit={onSubmit}
        className="mt-2 flex items-center border-t border-gray-100 px-4 py-2 "
      >
        <EmojiHappyIcon className="h-7" />
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Add a comment..."
          className="flex-1 border-none outline-none focus:ring-0"
        />
        <button
          type="submit"
          disabled={!comment.trim()}
          className="font-semibold text-blue-400  disabled:cursor-not-allowed disabled:text-blue-200"
        >
          Post
        </button>
      </form>
    )
  )
}

export default CommentInput
