import React from 'react'
import { Link } from 'react-router'

function ScreenReaderInfo (props) {
  return (
    <span className='only-screen-reader'>
      For text-based search, visit the <Link to='/list'>List page</Link>. For more information, visit the <Link to='/about'>About page</Link>.
    </span>
  )
}

export default ScreenReaderInfo
