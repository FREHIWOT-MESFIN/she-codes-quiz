import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='home-container'>
      <h1>Welcome</h1>
      <Link style={{color: 'white', textDecoration: 'none', fontSize: '1.2rem', cursor: 'pointer'} } to="/quiz">
        <button >
        Start
        </button>
      </Link>
    </div>
  )
}

export default Home
