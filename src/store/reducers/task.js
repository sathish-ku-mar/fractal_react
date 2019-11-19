import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    tasks: null,
    display_tasks: null,
    error: false,
    addB: true,
    editB: true,
    addT: true,
    editT: true,
    bucket: 'Today',
};

const setTasks = (state, action) => {
    return updateObject( state, {
        tasks: action.result.data,
        display_tasks: action.result.data.today,
        error: false
    } );
};

const setTasksB = (state, action) => {
    let tasks_side = null
    let name = 'Today'
    if (action.result === 'today') {
        tasks_side = state.tasks.today
    }else{
        tasks_side = state.tasks.bucket.filter((item, index) => item.id === action.result)[0]
        name = tasks_side.name
        tasks_side = tasks_side.tasks
    }

    return updateObject( state, {
        display_tasks: tasks_side,
        error: false,
        bucket: name
    } );
};

const setTasksUpate = (state, action) => {
    let tasks_side = state.display_tasks.filter((item, index) => item.id !== action.result.data.id)
    let data = tasks_side.concat(action.result.data)

    let bucket = state.tasks.bucket.map((item, index) => {
        if (item.id !== action.result.data.bucket) {
          return item
        }

        return {
          ...item,
          ...item.tasks = item.tasks.map((res, key) => {
                        if (res.id !== action.result.data.id) {
                          return res
                        } 
                        return action.result.data
            })
        }
    });

    let tasks = updateObject( state, {bucket: bucket } );

    return updateObject( state, {
        tasks: tasks,
        display_tasks: data,
        error: false,
        editT: state.editT ? false: true
    } );
};

const setTasksAdd = (state, action) => {
    let data = state.display_tasks.concat(action.result.data)

    let tasks_side = state.tasks.bucket.map((item, index) => {
        if (item.id !== action.result.data.bucket) {
          return item
        }

        return {
          ...item,
          ...item.tasks=item.tasks.concat(action.result.data)
        }
    });
    let d = updateObject( state, {bucket: tasks_side } );
    return updateObject( state, {
        tasks: d,
        display_tasks: data,
        error: false,
        addT: state.addT ? false: true
    } );
};


const setTasksDelete = (state, action) => {
    let tasks_side = state.display_tasks.filter((item, index) => item.id !== action.result)

    return updateObject( state, {
        display_tasks: tasks_side,
        error: false
    } );
};

const fetchBucketsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const setDelete = (state, action) => {
    let tasks_side = state.tasks.bucket.filter((item, index) => item.id !== action.result)

    let d = updateObject( state, {bucket: tasks_side } );

    return updateObject( state, {
        tasks: d,
        error: false
    } );
};

const setBucketUpdate = (state, action) => {
    let tasks_side = state.tasks.bucket.filter((item, index) => item.id !== action.result.data.id)
    console.log(tasks_side)
    let data = tasks_side.concat(action.result.data)
    let d = updateObject( state, {bucket: data } );

    return updateObject( state, {
        tasks: d,
        error: false,
        editB: state.editB ? false: true
    } );
};

const setBucketAdd = (state, action) => {    
    let data = state.tasks.bucket.concat(action.result.data)
    let d = updateObject( state, {bucket: data } );

    return updateObject( state, {
        tasks: d,
        error: false,
        addB: state.addB ? false: true
    } );
};


const setTasksComplate = (state, action) => {
    let tasks_side = state.display_tasks.map((item, index) => {
        if (item.id !== action.result) {
          return item
        }

        return {
          ...item,
          ...item.is_done=true
        }
    })

    return updateObject( state, {
        display_tasks: tasks_side,
        error: false
    } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_TASKS: return setTasks(state, action);    
        case actionTypes.TASKS_FAILED: return fetchBucketsFailed(state, action);
        case actionTypes.ADD_TASKS: return setTasksAdd(state, action);
        case actionTypes.EDIT_TASKS: return setTasksUpate(state, action);
        case actionTypes.DELETE_TASKS: return setTasksDelete(state, action);
        case actionTypes.SET_TASKS_B: return setTasksB(state, action);
        case actionTypes.SET_TASK_COMPLATE: return setTasksComplate(state, action);

        case actionTypes.DELETE_BUCKETS: return setDelete(state, action);
        case actionTypes.EDIT_BUCKETS: return setBucketUpdate(state, action);
        case actionTypes.ADD_BUCKETS: return setBucketAdd(state, action);
        default: return state;
    }
};

export default reducer;