import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import rbush from 'rbush'

import {
  loadData
} from '../App/actions'

import {
  selectLoading,
  selectData
} from 'containers/App/selectors'

import Header from 'components/Header'
import Loading from 'containers/Loading'

import { Container, Contents } from './styles'

import favIcon from 'images/favicon.png' // eslint-disable-line

export class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      treesComputed: false
    }
  }

  componentWillMount () {
    this.props.loadData('grouped')
    this.props.loadData('all')
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.dataAll && nextProps.dataAll) {
      this.computeTrees(nextProps.dataAll)
    }
  }

  static childContextTypes = {
    trees: React.PropTypes.object
  }

  trees = {}

  getChildContext () {
    return {
      trees: this.trees
    }
  }

  computeTrees (data) {
    Object.keys(data).forEach((group) => {
      const features = data[group]
      var tree = rbush(features.length)
      tree.load(
        features.map((feature, i) => ({
          minX: feature.properties.bbox[0],
          minY: feature.properties.bbox[1],
          maxX: feature.properties.bbox[2],
          maxY: feature.properties.bbox[3],
          index: i
        }))
      )
      this.trees[group] = tree
    })

    this.setState({
      treesComputed: true
    })
  }

  render () {
    let contents

    if (this.props.loading) {
      contents = (
        <Loading />
      )
    } else {
      contents = this.props.children
    }

    const defaultTitle = 'Maps by Decade - NYC Space/Time Directory'

    return (
      <Container>
        <Helmet titleTemplate={`%s - ${defaultTitle}`}
          defaultTitle={defaultTitle} />
        <Header path={this.props.location.pathname.slice(1)} />
        <Contents>
          {contents}
        </Contents>
      </Container>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadData: (file) => dispatch(loadData(file)),
    dispatch
  }
}

export default connect(createSelector(
  selectLoading(),
  selectData('all'),
  (loading, dataAll) => ({
    loading, dataAll
  })
), mapDispatchToProps)(App)
