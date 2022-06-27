import React from 'react'

export default function StyledButton({children, onClick}) {
  return (
    <button style={{
      border: 'none',
      outline: 'none',
      padding: '0.5rem 2rem',
      backgroundColor: '#7fa4c5',
      color: 'aliceblue',
      font: 'inherit',
      borderRadius: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
    }} onClick={onClick}>
      {children}
    </button>
  )
}
