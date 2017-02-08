import React from 'react'

import { TitleContainer, Title, Year, Links } from './styles'

export class MapHeading extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showFullTitle: false
    }
  }

  render () {
    let titleStyle = {}
    if (this.state.showFullTitle) {
      titleStyle = {
        whiteSpace: 'normal'
      }
    }

    return (
      <div>
        <TitleContainer>
          <Title tabIndex={0} style={titleStyle} onClick={this.titleClick.bind(this)}
            onKeyDown={this.titleKeyDown.bind(this)} title={this.props.map.properties.name}>
            {this.props.map.properties.name}
          </Title>
          <Year>({this.props.map.properties.year})</Year>
        </TitleContainer>
        <Links>
          {this.props.children.map((child, index) => <div key={index}>{child}</div>)}
        </Links>
      </div>
    )
  }

  titleKeyDown (event) {
    if (event.keyCode !== 13) {
      return
    }

    this.titleClick()
  }

  titleClick () {
    this.setState({
      showFullTitle: !this.state.showFullTitle
    })
  }
}

export default MapHeading