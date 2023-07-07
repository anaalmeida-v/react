import "./Message.css"

const Message = ({ msg, type }) => {//msg + tipo de msg
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  )
}

export default Message