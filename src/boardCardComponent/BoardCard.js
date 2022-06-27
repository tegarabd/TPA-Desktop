import React from 'react'
import { Link } from 'react-router-dom'

export default function BoardCard({id, title}) {
  return (
    <Link className='link' to={`/boards/${id}`} 
      style={{
        width: '12rem',
        height: '6rem',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: '1rem',
        backgroundColor: '#7fa4c5',
        color: 'aliceblue'
      }}
    >
      <h3 className='linkTitle' style={{textAlign: 'end'}} >{title}</h3>
    </Link>
  )
}
