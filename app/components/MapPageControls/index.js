import React from 'react'
import { Link } from 'react-router'
import { Container, Box, Previous, Next, Middle, Title } from './styles'

import { decadeToPeriod } from 'utils/utils'

import ArrowLink from 'components/ArrowLink'

function MapPageControls (props) {
  let previousDecade
  if (props.previousDecade) {
    previousDecade = (
      <ArrowLink direction='left'
        title='Go to previous decade — or press [' to={`/${props.previousDecade}`}>
        {props.previousDecade}s
      </ArrowLink>
    )
  } else {
    previousDecade = (
      <div />
    )
  }

  let nextDecade
  if (props.nextDecade) {
    nextDecade = (
      <ArrowLink direction='right'
        title='Go to next decade — or press ]' to={`/${props.nextDecade}`}>
        {props.nextDecade}s
      </ArrowLink>
    )
  } else {
    nextDecade = (
      <div />
    )
  }

  let footer
  const mapString = props.selectedCount === 1 ? 'map' : 'maps'
  if (props.locked) {
    footer = (
      <Box>
        <span>
          {`${props.selectedCount} ${mapString} selected — click again to unlock selection`}
        </span>
      </Box>
    )
  } else if (props.selectedCount) {
    footer = (
      <Box>
        <span>
          {`${props.selectedCount} ${mapString} found — click to lock selection`}
        </span>
      </Box>
    )
  }

  return (
    <Container>
      <div>
        <Previous>
          {previousDecade}
        </Previous>
        <Middle>
          <Title>{decadeToPeriod(props.decade)}</Title>
          <Box>
            <Link title='Go back to overview - or press Escape' to={`/`}>
              Back<span className='hide-on-mobile'> to overview</span>
            </Link>
          </Box>
        </Middle>
        <Next>
          {nextDecade}
        </Next>
      </div>
      {footer}
    </Container>
  )
}

export default MapPageControls

