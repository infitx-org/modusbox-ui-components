import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span> Hey world {this.props.counter} </span>
        <button onClick={this.props.test}> Test </button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  counter: state.main.counter,
});
const mapDispatchToProps = dispatch => ({
  test: () => dispatch({ type: 'TEST' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
