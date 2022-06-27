import React from 'react'
import Navbar from '../navbarComponent/Navbar'
import Sidebar from '../sidebarComponent/Sidebar'
import Main from '../mainComponent/Main'

export default function Template({side, main}) {

  return (
    <>
      <Navbar/>
      <div style={{
        display: 'flex',
        width: '100%',
        height: 'calc(100vh - 4rem)',
      }}>
        <Sidebar>
          {side}
        </Sidebar>
        <Main>
          {main}
        </Main>
      </div>
    </>
  )
}