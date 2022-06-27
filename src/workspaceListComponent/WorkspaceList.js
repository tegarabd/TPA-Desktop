import React, { useEffect, useState } from 'react'
import { useAuth } from '../authenticationComponent/AuthProvider'
import { populateUserWorkspaceList } from '../firebase/firestore/userRepository'
import WorkspaceItem from '../workspaceItemComponent/WorkspaceItem'

export default function WorkspaceList() {

  const [workspaces, setWorkspaces] = useState([])
  const [loading, setLoading] = useState(true)
  const {user} = useAuth()

  useEffect(() => {
    setLoading(true)
    const fetchWorkspaceFromRepository = async () => {
      if (user) {
        populateUserWorkspaceList(user.uid, setWorkspaces).then(() => setLoading(false))
      }
    }
    fetchWorkspaceFromRepository()
  }, [user])

  if (loading) {
    return <h3>Loading Workspace...</h3>
  }

  return (
    <>
      {workspaces.length === 0
        ? <h3>No Workspace yet...</h3>
        : <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {workspaces.map(workspace => <WorkspaceItem key={workspace.id} workspace={workspace} />)}
        </div>
      }
    </>
    
      
  )
}
