import React from 'react'
import { Link } from 'react-router-dom'

interface ErrorProps {
  error: React.ReactNode
}

const ErrorPage: React.FC<ErrorProps> = ({ error }) => {
  return (
        <div className='errorContainer'>
            <h2 style={{ marginBottom: '30px' }}>{error}</h2>
            <Link to='/'>Go Home</Link>
        </div>
  )
}

export default ErrorPage
