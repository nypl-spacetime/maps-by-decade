import React from 'react'
import { Link } from 'react-router'
import { Container, Header, Footer, Previous, Next, Middle, Back } from './styles'

import { decadeToPeriod } from 'utils/utils'

function MapPageControls (props) {
  let previousDecade
  if (props.previousDecade) {
    // <div title='Go to previous decade - or press [' className={`${styles['decade-link']} ${styles.previous}`}>
      //    <Link to={`/${this.props.previousDecade}`}>← previous</Link>
        // </div>
    previousDecade = (
      <Link title='Go to previous decade - or press [' to={`/${props.previousDecade}`}>← previous</Link>
    )
  } else {
    previousDecade = (
      <div />
    )
  }

  let nextDecade
  if (props.nextDecade) {
    nextDecade = (
      <Link title='Go to next decade - or press ]' to={`/${props.nextDecade}`}>next →</Link>
    )
//       nextDecade = (
//         <div title='Go to next decade - or press ]' className={`${styles['decade-link']} ${styles.next}`}>
//           <Link to={`/${this.props.nextDecade}`}>next →</Link>
//         </div>
//       );
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
            <Link title='Go back to decade list - or press ESC' to={`/`}>Back to decade list</Link>
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

