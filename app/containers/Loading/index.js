import React from 'react';

import styles from './styles.css';

export class Loading extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dots: 0,
      maxDots: 3
    };
  }

  render() {

    var loading = `Loading${(new Array(this.state.dots + 1).join('.'))}`;
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.loading}>{loading}</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.interval = setInterval(()=> {
      this.setState({
        dots: (this.state.dots + 1) % (this.state.maxDots + 1)
      })
    }, 500);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}

export default Loading;
