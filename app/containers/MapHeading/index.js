import React from 'react'

import { Title, Year, Links } from './styles'

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

    let links
    if (this.props.children && this.props.children.length) {
      links = this.props.children
        .map((child, index) => <div key={index}>{child}</div>)
    }

    return (
      <div>
        <Title tabIndex={0} style={titleStyle} onClick={this.titleClick.bind(this)} className='list-item'
          onKeyDown={this.titleKeyDown.bind(this)} title={this.props.map.properties.name}>
          <span aria-hidden='true'>
            {this.props.map.properties.name}
          </span>
        </Title>
        <Year>Year published: <strong>{this.props.map.properties.year}</strong></Year>
        <Links>
          {links}
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
