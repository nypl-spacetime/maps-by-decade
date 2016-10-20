/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import rbush from 'rbush';

import {
  loadData
} from '../App/actions';

import {
  selectData
} from 'containers/App/selectors';

import styles from './styles.css';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      treesComputed: false
    };
  }

  componentWillMount() {
    this.props.loadData('grouped');
    this.props.loadData('all');
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.dataAll && nextProps.dataAll) {
      this.computeTrees(nextProps.dataAll);
    }
  }

  static childContextTypes = {
    trees: React.PropTypes.object,
  }

  trees = {};

  getChildContext() {
    return {
      trees: this.trees
    };
  }

  computeTrees(data) {
    Object.keys(data).forEach((band) => {
      const features = data[band];
      var tree = rbush(features.length);
      tree.load(
        features.map((feature, i) => ({
          minX: feature.properties.boundingbox[0],
          minY: feature.properties.boundingbox[1],
          maxX: feature.properties.boundingbox[2],
          maxY: feature.properties.boundingbox[3],
          index: i
        }))
      );
      this.trees[band] = tree;
    });

    this.setState({
      treesComputed: true
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.contents}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: (file) => dispatch(loadData(file)),
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectData('all'),
  (dataAll) => ({
    dataAll
  })
), mapDispatchToProps)(App);
