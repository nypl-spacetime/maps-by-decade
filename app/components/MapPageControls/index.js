import React from 'react'
import { Link } from 'react-router'
import { Container, Header, Footer, Previous, Next, Middle, Back } from './styles'

import { decadeToPeriod } from 'utils/utils'

import ArrowLink from 'components/ArrowLink'

function MapPageControls (props) {
  let previousDecade
  if (props.previousDecade) {
    previousDecade = (
      <ArrowLink direction='left'
        title='Go to previous decade — or press [' to={`/${props.previousDecade}`}>
        previous
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
        next
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
      <Footer>
        <span>
          {`${props.selectedCount} ${mapString} selected — click again to unlock selection`}
        </span>
      </Footer>
    )
  } else if (props.selectedCount) {
    footer = (
      <Footer>
        <span>
          {`${props.selectedCount} ${mapString} found — click to lock selection`}
        </span>
      </Footer>
    )
  }

  return (
    <Container>
      <Header>
        <Previous>
          {previousDecade}
        </Previous>
        <Middle>
          <h2>{decadeToPeriod(props.decade)}</h2>
          <Back>
            <Link title='Go back to overview - or press Escape' to={`/`}>Back to overview</Link>
          </Back>
        </Middle>
        <Next>
          {nextDecade}
        </Next>
      </Header>
      {footer}
    </Container>
  )
}

export default MapPageControls

