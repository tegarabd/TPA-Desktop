import React, { useState } from 'react'
import { useAuth } from '../authenticationComponent/AuthProvider'
import { createBoard } from '../firebase/firestore/boardRepository'
import styles from './BoardForm.module.css'

export default function BoardForm({workspaceId}) {

  const [board, setBoard] = useState({
    title: '',
    description: '',
    visibility: '',
    isClosed: false,
    workspaceId: workspaceId
  })

  const {user} = useAuth()

  const handleFieldChange = e => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (board.title === '' || board.description === '' || board.visibility === '' || board.visibility === 'select') {
      return
    }
    await createBoard(user?.uid, user?.displayName, board)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.inputField}
        id='title'
        type='text'
        name='title'
        onChange={handleFieldChange}
        placeholder='Title'
        required
        value={board.title} />
      <input
        className={styles.inputField}
        id='description'
        type='text'
        name='description'
        onChange={handleFieldChange}
        placeholder='Description'
        required
        value={board.description} />
      <select
        id='visibility'
        name='visibility'
        onChange={handleFieldChange}
        value={board.visibility}
        required
      >
        <option value='select' >Select</option>
        <option value='private' >Private</option>
        <option value='workspace' >Workspace Only</option>
        <option value='public' >Public</option>
      </select>
      <input
        className={styles.submitButton}
        type='submit'
        value='Add' />
    </form>
  )
}
