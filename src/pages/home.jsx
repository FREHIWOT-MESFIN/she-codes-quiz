import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='home-container'>
      <h1>Welcome</h1>
      <button>
        <Link style={{color: 'white', textDecoration: 'none', fontSize: '1.2rem'} } to="/quiz">Start</Link>
      </button>
    </div>
  )
}

export default Home
