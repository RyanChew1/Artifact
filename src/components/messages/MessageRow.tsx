import { IMessageRow } from '@/types'

const MessageRow = ({ message }: { message: IMessageRow }) => {
    console.log(message)
  return (
    <div>
      {message.name}
    </div>
  )
}

export default MessageRow
