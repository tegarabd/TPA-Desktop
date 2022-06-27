import React from 'react'
import { Link } from 'react-router-dom'
import Template from '../templateComponent/Template'
import WorkspacePublicList from '../workspacePublicListComponent/WorkspacePublicList'

export default function App() {
  return (
    <Template
      side={<>
        <h1>Chello Public Workspaces</h1>
        <Link className='link' to='/home'>
          <h3 className='linkTitle'>Home</h3>
        </Link>
      </>}
      main={<WorkspacePublicList/>}
    />
  )
}
