import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import './Auth.css';

import Task from '../Task/Task';
import Signup from './Signup/Signup';
import Login from './Login/Login';

class Auth extends Component {
    state = {
        isSignup: true
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        let auth = this.state.isSignup ? <Login /> : <Signup />;
        let show = <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {!this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        if (this.props.isAuthenticated) {
            auth = <Task />
            show = ''
        }

        return (
            <div className="container"> 

                <header className="clearfix">
                    <h1>Assignment</h1> 
                </header>
                <div className="">
                    {auth}  
                    {show}              
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        signup: state.auth.signup
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );