import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const Underline = styled.span`
  text-decoration: underline;
`

const Arrow = styled.span`
  text-decoration: none;
`

const LeftArrow = styled(Arrow)`
  &:before {
    margin-right: 0.5em;
    content: '←';
  }
`

const RightArrow = styled(Arrow)`
  &:after {
    margin-left: 0.5em;
    content: '→';
  }
`

function ArrowLink (props) {
  const {direction, ...linkProps} = props

  let underline

  if (props.showTextOnMobile) {
    underline = <Underline>
      {props.children}
    </Underline>
  } else {
    underline = <Underline className='hide-on-mobile'>
      {props.children}
    </Underline>
  }

  if (direction === 'left') {
    return (
      <StyledLink {...linkProps}>
        <LeftArrow />
        {underline}
      </StyledLink>
    )
  } else {
    return (
      <StyledLink {...linkProps}>
        {underline}
        <RightArrow />
      </StyledLink>
    )
  }
}

export default ArrowLink
