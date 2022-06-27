import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BoardCard from '../boardCardComponent/BoardCard'
import BoardForm from '../boardFormComponent/BoardForm'
import { populateWorkspaceBoardListById, populateWorkspaceDetailById, populateWorkspaceMemberListById } from '../firebase/firestore/workspaceRepository'
import Template from '../templateComponent/Template'

export default function WorkspacePage() {

  const {workspaceId} = useParams()
  const navigate = useNavigate()
  const [workspace, setWorkspace] = useState(null)
  const [members, setMembers] = useState([])
  const [boards, setBoards] = useState([])

  useEffect(() => {
    const fetchWorkspaceMetadata = async () => {
      if (workspaceId) {
        populateWorkspaceDetailById(workspaceId, setWorkspace)
        populateWorkspaceBoardListById(workspaceId, setBoards)
        populateWorkspaceMemberListById(workspaceId, setMembers)
      }
    }

    fetchWorkspaceMetadata()
  }, [workspaceId])

  return (
    <Template
      side={
        <>
          <div className='link' onClick={() => navigate(-1)}>
            <h3 className='linkTitle'>Home</h3>
          </div>
          <h2>Boards</h2>
          {boards.map(board => <p key={board.id} >{board.title}</p>)}
          <h2>Members</h2>
          {members.map(member => <p key={member.id} style={{fontWeight: member.isAdmin ? 'bold':'normal'}}>{member.displayName}</p>)}
        </>
      }
      main={
        <>
          <h2>{workspace?.title}</h2>
          <h4>{workspace?.visibility}</h4>
          <p>{workspace?.description}</p>
          <div style={{
            display: 'flex',
            gap: '2rem'
          }}>
            {boards.map(board => <BoardCard key={board.id} id={board.id} title={board.title} />)}
          </div>
          <h2>Add Board</h2>
          <BoardForm workspaceId={workspaceId} />
        </>
      }
    />
  )
}
