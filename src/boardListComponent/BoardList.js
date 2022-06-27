import React, { useEffect, useState } from 'react'
import { useAuth } from '../authenticationComponent/AuthProvider'
import BoardItem from '../boardItemComponent/BoardItem'
import { populateUserBoardList } from '../firebase/firestore/userRepository'

export default function BoardList() {

  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const {user} = useAuth()

  useEffect(() => {
    setLoading(true)
    const fetchBoardFromRepository = async () => {
      if (user) {
        populateUserBoardList(user.uid, setBoards).then(() => setLoading(false))
      }
    }
    fetchBoardFromRepository()
  }, [user])

  if (loading) {
    return <h3>Loading Boards...</h3>
  }

  return (
    <>
      {boards.length === 0
        ? <h3>No Board yet...</h3>
        : <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {boards.map(board => <BoardItem key={board.id} id={board.id} title={board.title} />)}
        </div>
      }
    </>
    
      
  )
}