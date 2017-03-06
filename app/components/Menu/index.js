import React from 'react'
import { Link } from 'react-router'

import { Buttons } from './styles'

export default function Menu (props) {
  const listSelected = props.path === 'list'
  const aboutSelected = props.path === 'about'
  const mapSelected = !listSelected && !aboutSelected
  return (
    <div>
      <Buttons>
        <Link className={mapSelected ? 'selected' : ''} to='/'>Map</Link>
        <Link className={listSelected ? 'selected' : ''} to='/list'>List</Link>
        <Link className={aboutSelected ? 'selected' : ''} to='/about'>About</Link>
      </Buttons>
    </div>
  )
}
