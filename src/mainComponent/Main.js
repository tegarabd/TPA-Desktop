import React from 'react'

export default function Main({children}) {
  return (
    <div style={{
      padding: '1rem',
      width: 'calc(100vw - 20rem)'
    }}>
      {children}
    </div>
  )
}
