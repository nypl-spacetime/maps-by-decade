/* global __CONFIG__ */

import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import rbush from 'rbush'

import {
  loadData
} from '../App/actions'

import {
  selectShowIntro,
  selectLoading,
  selectData
} from 'containers/App/selectors'

import Header from 'components/Header'
import Loading from 'containers/Loading'
import IntroDialog from 'containers/IntroDialog'

import { Container, Contents } from './styles'

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
    const backgroundColor = (this.props.params && this.props.params.decade) ? __CONFIG__.cssVariables.singleDecadeColor : __CONFIG__.cssVariables.homepageColor

    let intro
    let contents

    if (this.props.showIntro) {
      intro = <IntroDialog backgroundColor={backgroundColor} />
    }

    if (this.props.loading) {
      contents = (
        <Loading />
      )
    } else {
      contents = (
        <Contents>
          {this.props.children}
        </Contents>
      )
    }

    return (
      <Container backgroundColor={backgroundColor}>
        <Header path={this.props.location.pathname.slice(1)} />
        {intro}
        {contents}
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
  selectShowIntro(),
  selectLoading(),
  selectData('all'),
  (showIntro, loading, dataAll) => ({
    showIntro, loading, dataAll
  })
), mapDispatchToProps)(App)
