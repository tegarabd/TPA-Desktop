import React from 'react'
import styles from './Navbar.module.css'
import StyledButton from '../utilityComponent/StyledButton'
import { useAuth } from '../authenticationComponent/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {

  const {user, signout} = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signout(() => navigate('/signin'))
  }

  return (
    <nav className={styles.navbar}>
      <Link to='/home' style={{
        color: '#7fa4c5',
        textDecoration: 'none'
      }}>
        <h1>Chello</h1>
      </Link>
      <div className={styles.navbarRight}>
        {user
        ? <>
          <h3>{user.displayName}</h3>
          <StyledButton onClick={handleSignOut}>Sign Out</StyledButton>
        </>
        : 
          <StyledButton><Link to='/signin'>Sign In</Link></StyledButton>
        }
        
      </div>
    </nav>
  )
}
