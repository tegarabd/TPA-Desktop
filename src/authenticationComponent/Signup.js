import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addNewUser } from '../firebase/firestore/userRepository'
import styles from './Auth.module.css'
import { useAuth } from './AuthProvider'
 
export default function Signup() {

  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const auth = useAuth()

  const handleSignUp = async () => {
    auth.register(user.name, user.email, user.password, async (user) => {
      await addNewUser(user.uid, user.displayName)
      navigate('/home')
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSignUp()
  }

  const handleNameChange = (e) => {
    setUser({
      ...user,
      name: e.target.value
    })
  }

  const handleEmailChange = (e) => {
    setUser({
      ...user,
      email: e.target.value
    })
  }

  const handlePasswordChange = (e) => {
    setUser({
      ...user,
      password: e.target.value
    })
  }

  const handlePasswordConfirmChange = (e) => {
    setUser({
      ...user,
      passwordConfirm: e.target.value
    })
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.formTitle}>Sign Up</h1>
        <input 
          className={styles.inputField}
          id='name'
          type='text'
          name='name'
          onChange={handleNameChange}
          placeholder='Name'
          required
          value={user.name}/>
        <input 
          className={styles.inputField}
          id='email'
          type='email'
          name='email'
          onChange={handleEmailChange}
          placeholder='Email'
          required
          value={user.email}/>
        <input 
          className={styles.inputField}
          id='password'
          type='password'
          name='password'
          onChange={handlePasswordChange}
          placeholder='Password'
          required
          value={user.password}/>
        <input 
          className={styles.inputField}
          id='passwordConfirm'
          type='password'
          name='passwordConfirm'
          onChange={handlePasswordConfirmChange}
          placeholder='Confirm Password'
          required
          value={user.passwordConfirm}/>
        <input className={styles.submitButton} type='submit' value='Submit' />
        <p>Already have an account? <Link className={styles.link} to='/signin'>Sign In</Link></p>
      </form>
    </div>
  )
}
