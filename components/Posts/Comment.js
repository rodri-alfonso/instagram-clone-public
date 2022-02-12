import Moment from 'react-moment'

const Comment = ({ username, comment, timestamp, img }) => {
  return (
    <div className="mb-3 flex items-center space-x-2">
      <img src={img} alt="" className="h-7 rounded-full" />
      <p className="flex-1 text-sm">
        <span className="font-bold">{username}</span> {comment}
      </p>

      <Moment fromNow className="pr-5 text-xs">
        {timestamp}
      </Moment>
    </div>
  )
}

export default Comment
