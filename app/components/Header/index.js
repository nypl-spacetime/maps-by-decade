import React from 'react'
import { Link } from 'react-router'

import Menu from 'components/Menu'

import { StyledHeader, Logo, Subtitles } from './styles'

import nypl from 'images/nypl-white.svg'

export default function Header (props) {
  return (
    <StyledHeader className='align-center'>
      <div className='align-center'>
        <Logo style={{backgroundImage: `url(${nypl})`}} href='//nypl.org' target='_blank'>
          <span>The New York Public Library</span>
        </Logo>
        <Subtitles>
          <h2>
            <a href='http://nypl.org/' target='_blank'>The New York Public Library</a>
          </h2>
          <h3>
            <a href='http://spacetime.nypl.org/' target='_blank'>NYC Space/Time Directory</a>
          </h3>
        </Subtitles>
        <h1>
          <Link to='/'>
            Maps by Decade
          </Link>
        </h1>
      </div>
      <Menu path={props.path} />
    </StyledHeader>
  )
}
