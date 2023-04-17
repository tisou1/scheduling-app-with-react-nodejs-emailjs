import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const nagivate = useNavigate()

  const handleSubmit = (e: React.SyntheticEvent) => {
    if (username.trim() && password.trim()) {
      e.preventDefault()
      console.log({ username, password })
      setPassword('')
      setUsername('')
    }
  }

  return (
    <main>
       <form className='login__form' onSubmit={handleSubmit}>
                <h2 className='login__title'>Log into your account</h2>
                <label htmlFor='username'>Username</label>
                <input
                    id='username'
                    name='username'
                    type='text'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className='username'
                />
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='password'
                />
                <button className='loginButton'>LOG IN</button>
                <p style={{ textAlign: 'center', marginTop: '30px' }}>
                    Don't have an account?{' '}
                    <Link className='link' to='/register'>
                        Create one
                    </Link>
                </p>
            </form>
    </main>
  )
}
