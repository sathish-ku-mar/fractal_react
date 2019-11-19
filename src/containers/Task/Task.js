import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import TaskControls from '../../components/Task/TaskControls'
import * as actionCreators from '../../store/actions/index';
import TaskForm from './TaskForm';
import BucketForm from '../Bucket/BucketForm';
import Logout from '../Auth/Logout/Logout'

import './css/default.css';
import './css/component.css';

class Task extends Component {
    
    state = {
        add: false,
        edit: false,
        editTask: null,
        editBucket: null,
        addBucket: false,
        editB: false,
        logout: false
    }

    componentDidMount () {
        this.props.onInitTasks();
    }

    editTaskHandler = ( e) => {
        console.log(e)

        this.setState(state => ({
          editTask: e,
          edit: !this.state.edit
        }));

        console.log(this.state)
    }

    addTaskHandler = ( e) => {

        this.setState(state => ({
          add: !state.add
        }));
    }

    editBucketHandler = ( e) => {
        this.setState(state => ({
          ...state,
          editBucket: e,
          editB: !this.state.editB
        }));
    }

    addBucketHandler = ( e) => {
        this.setState(state => ({
          ...state,
          addBucket: !this.state.addBucket,
        }));
    }

    editCancelHandler = ( e) => {
        this.setState(state => ({
          ...state,
          editB: !this.state.editB
        }));
    }

    editTaskCancelHandler = ( e) => {
        this.setState(state => ({
          ...state,
          edit: !this.state.edit
        }));
    }
    
    logoutHandler = ( e) => {
        this.setState(state => ({
          ...state,
          logout: true
        }));
    }

    render () {
        let tasks = this.props.error ? <p>Tasks can't be loaded!</p> : <p>Tasks loaded!</p>;

        if ( this.props.tasks ) {
            tasks = (<TaskControls 
                        tasks={this.props.tasks}
                        display_tasks={this.props.display_tasks}
                        bu_tasks={this.props.onbTask} 
                        editTask={this.editTaskHandler}
                        removeTask={this.props.onRemoveTask}
                        completeTask={this.props.onCompleteTask}

                        editBucket={this.editBucketHandler}
                        removeBucket={this.props.onBucketRemove}
                    />)
        }

        let taskForm = ''

        if ( this.props.editT === (this.state.editTask !== null && this.state.edit )) {
            taskForm = (<TaskForm values={this.state.editTask} cancel={this.editTaskCancelHandler}/>)
        }

        if ( this.state.add === this.props.addT ) {
            taskForm = (<TaskForm values='' cancel={this.addTaskHandler}/>)
        }

        let bucketForm = ''
        if ( this.props.editB === (this.state.editBucket !== null && this.state.editB) ) {
            bucketForm = (<BucketForm values={this.state.editBucket} cancel={this.editCancelHandler}/>)
        }

        if (this.state.addBucket === this.props.addB) {
            bucketForm = (<BucketForm values="" cancel={this.addBucketHandler}/>)
        }

        let logout = ''
        if (this.state.logout){
            logout = <Logout />
        }

        return (
                <div>
                <div className="logout">
                    <button onClick={this.logoutHandler}>Logout</button>
                    </div>
                    {tasks}  
                    <div className="add_task">
                        <h4>{this.props.bucket} |   
                        <button onClick={this.addTaskHandler}>Add Task</button> | 
                        <button onClick={this.addBucketHandler}>
                            Add Bucket
                        </button></h4>
                        <div className="task-form">
                        {taskForm}
                        {bucketForm}
                        </div>
                    </div>
                    {logout}
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks,
        display_tasks: state.tasks.display_tasks,
        error: state.tasks.error,
        addB: state.tasks.addB,
        editB: state.tasks.editB,
        addT: state.tasks.addT,
        editT: state.tasks.editT,
        bucket: state.tasks.bucket,
        isAuthenticated: state.auth.token !== null, 
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitTasks: () => dispatch(actionCreators.initTask()),
        onRemoveTask: (id) => dispatch(actions.removeTask(id)),
        onbTask: (id) => dispatch(actions.bTask(id)),
        onCompleteTask: (id) => dispatch(actions.completeTask(id)),
        
        onBucketRemove: (id) => dispatch(actions.removeBucket(id)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);