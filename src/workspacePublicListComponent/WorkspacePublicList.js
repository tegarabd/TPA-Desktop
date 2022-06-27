import React, { useEffect, useState } from 'react'
import { populatePublicWorkspaceList } from '../firebase/firestore/workspaceRepository'
import WorkspaceItem from '../workspaceItemComponent/WorkspaceItem'

export default function WorkspacePublicList() {

  const [workspaces, setWorkspaces] = useState([])

  useEffect(() => {
    const fetchPublicWorkspaces = async () => {
      await populatePublicWorkspaceList(setWorkspaces)
    }
    fetchPublicWorkspaces()
  })
  

  return (
    <div style={{
      display: 'flex',
      gap: '1rem'
    }}>
      {workspaces.map(workspace => <WorkspaceItem key={workspace.id} workspace={workspace} />)}
    </div>
  )
}
