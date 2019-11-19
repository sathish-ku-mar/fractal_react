import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auth from './containers/Auth/Auth'
import './App.css';
import * as actions from './store/actions/index';
class App extends Component {
	componentDidMount () {
	    this.props.onTryAutoSignup();
	  }
  render() {
    return (
      <div className="App">
       <Auth />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( App );
