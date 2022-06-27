import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Auth.module.css'
import { useAuth } from './AuthProvider'

export default function Signin() {

  const auth = useAuth()
  const navigate = useNavigate()

  const handleSignIn = () => {
    auth.signin(user.email, user.password, () => navigate('/home'))
  }

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = e => {
    e.preventDefault()
    handleSignIn()
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

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.formTitle}>Sign In</h1>
        <input 
          className={styles.inputField}
          id='email'
          type='email'
          name='email'
          onChange={handleEmailChange}
          placeholder='Email'
          value={user.email}/>
        <input 
          className={styles.inputField}
          id='password'
          type='password'
          name='password'
          onChange={handlePasswordChange}
          placeholder='Password'
          value={user.password}/>
        <input className={styles.submitButton} type='submit' value='Submit' />
        <p>Don't have an account? <Link className={styles.link} to='/signup'>Sign Up</Link></p>
      </form>
    </div>
  )
}
