import React from 'react'
import { connect } from 'react-redux'

import {
  hideIntro
} from 'containers/App/actions'

import { Container, Dialog, Line, Contents } from './styles'

export class IntroDialog extends React.Component {
  render () {
    return (
      <Container>
        <Dialog style={{backgroundColor: this.props.backgroundColor}}>
          <Line />
          <Contents>
            <h2>Welcome to Maps by Decade!</h2>
            <p>
              This tool shows digitized New York City street maps from the New York Public Library's Map Division published between 1850 and 1940, grouped by decade.
            </p>
            <p>
              Maps by Decade is part of the NYPL <a href='http://spacetime.nypl.org/'>NYC Space/Time Directory</a>, making urban history accessible through a wide variety of resources.
            </p>
            <button onClick={this.handleClick.bind(this)}>OK</button>
          </Contents>
        </Dialog>
      </Container>
    )
  }

  handleClick () {
    this.props.hideIntro()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    hideIntro: () => dispatch(hideIntro())
  }
}

export default connect(null, mapDispatchToProps)(IntroDialog)
