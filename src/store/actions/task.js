import * as actionTypes from './actionTypes';
import axios from '../../axios';

let token = localStorage.getItem('token');

export const initTask = () => {
    token = localStorage.getItem('token');
    return dispatch => {
        axios.get( '/to-do/task/', { headers: { Authorization: token } })
            .then( response => {
               dispatch(setTasks(response.data));
            } )
            .catch( error => {
                dispatch(taskFailed());
            } );
    };
};

export const setTasks = ( tasks ) => {
    return {
        type: actionTypes.SET_TASKS,
        result: tasks
    };
};

export const taskFailed = () => {
    return {
        type: actionTypes.TASKS_FAILED
    };
};

export const addTask = ( taskData ) => {
    return dispatch => {
        axios.post( '/to-do/task/', taskData , { headers: { Authorization: token } })
            .then( response => {
                dispatch(setaddTask(response.data));
            } )
            .catch( error => {
                dispatch( taskFailed( error ) );
            } );
    };
};

export const setaddTask = ( task ) => {
    return {
        type: actionTypes.ADD_TASKS,
        result: task
    };
};

export const removeTask = ( id ) => {
    return dispatch => {
        axios.delete( '/to-do/task/'+id+'/' , { headers: { Authorization: token } })
            .then( response => {
                dispatch(setRemoveTask(id));
            } )
            .catch( error => {
                dispatch( taskFailed( error ) );
            } );
    };
};

export const setRemoveTask = ( id ) => {
    return {
        type: actionTypes.DELETE_TASKS,
        result: id
    };
};

export const completeTask = ( id ) => {
    return dispatch => {
        axios.patch( '/to-do/task/'+id+'/' ,{}, { headers: { Authorization: token } })
            .then( response => {
                dispatch(setCompleteTask(id));
            } )
            .catch( error => {
                dispatch( taskFailed( error ) );
            } );
    };
};

export const setCompleteTask = ( id ) => {
    return {
        type: actionTypes.SET_TASK_COMPLATE,
        result: id
    };
};

export const editTask = ( id, taskData) => {
    return dispatch => {
        axios.put( '/to-do/task/'+id+'/', taskData , { headers: { Authorization: token } })
            .then( response => {
                dispatch(updateTask(response.data));
            } )
            .catch( error => {
                dispatch( taskFailed( error ) );
            } );
    };
};


export const bTask = ( id ) => {
    return {
        type: actionTypes.SET_TASKS_B,
        result: id
    };
};

export const updateTask = ( tasks ) => {
    return {
        type: actionTypes.EDIT_TASKS,
        result: tasks
    };
};

export const removeBucket = ( id ) => {
    return dispatch => {
        axios.delete( '/to-do/bucket/'+id+'/' , { headers: { Authorization: token } })
            .then( response => {
                dispatch(setremoveBucket(id));
            } )
            .catch( error => {
                dispatch( taskFailed( error ) );
            } );
    };
};

export const setremoveBucket = ( id ) => {
    return {
        type: actionTypes.DELETE_BUCKETS,
        result: id
    };
};

export const editBucket = ( id, bucketData) => {
    return dispatch => {
        axios.put( '/to-do/bucket/'+id+'/', bucketData , { headers: { Authorization: token } })
            .then( response => {
                dispatch(setEditBucket(response.data));
            } )
            .catch( error => {
                dispatch( taskFailed( error ) );
            } );
    };
};

export const setEditBucket = ( bucket ) => {
    return {
        type: actionTypes.EDIT_BUCKETS,
        result: bucket
    };
};

export const addBucket = ( bucketData ) => {
    return dispatch => {
        axios.post( '/to-do/bucket/', bucketData , { headers: { Authorization: token } })
            .then( response => {
                dispatch(setAddBucket(response.data));
            } )
            .catch( error => {
                dispatch( taskFailed( error ) );
            } );
    };
};

export const setAddBucket = ( bucket ) => {
    return {
        type: actionTypes.ADD_BUCKETS,
        result: bucket
    };
};