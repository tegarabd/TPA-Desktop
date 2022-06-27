import React from 'react'
import { Link } from 'react-router-dom'

export default function BoardItem({id, title}) {
  return (
    <Link className='link' to={`/boards/${id}`}  >
      <h3 className='linkTitle' >{title}</h3>
    </Link>
  )
}