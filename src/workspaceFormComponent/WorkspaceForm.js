import React, { useState } from 'react'
import { useAuth } from '../authenticationComponent/AuthProvider'
import { createWorkspace } from '../firebase/firestore/workspaceRepository'
import styles from './WorkspaceForm.module.css'

export default function WorkspaceForm() {

  const [workspace, setWorkspace] = useState({
    title: '',
    description: '',
    visibility: ''
  })

  const {user} = useAuth()

  const handleFieldChange = e => {
    setWorkspace({
      ...workspace,
      [e.target.name]: e.target.value
    })
    console.log(workspace);
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (workspace.title === '' || workspace.description === '' || workspace.visibility === '' || workspace.visibility === 'select') {
      return
    }
    setWorkspace({
      title: '',
      description: '',
      visibility: ''
    })
    await createWorkspace(user?.uid, user?.displayName, workspace)
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
        value={workspace.title} />
      <input
        className={styles.inputField}
        id='description'
        type='text'
        name='description'
        onChange={handleFieldChange}
        placeholder='Description'
        required
        value={workspace.description} />
      <select
        id='visibility'
        name='visibility'
        onChange={handleFieldChange}
        value={workspace.visibility}
        required
      >
        <option value='select' >Select</option>
        <option value='private' >Private</option>
        <option value='public' >Public</option>
      </select>
      <input
        className={styles.submitButton}
        type='submit'
        value='Add' />
    </form>
  )
}
