import React from 'react'

const ShowUserName = (props) => {
  return (
    <div>
        <h2>O nome do usuário: {props.name}</h2>
        {/*name foi definido no component pai App.js*/}
    </div>
  )
}

export default ShowUserName