import React from 'react';

import TaskControl from './TaskControl';
import TaskSide from './TaskSide';

const taskControls = ( props ) => {

    let bTaskHandler = ( e) => {
        props.bu_tasks('today')
    }

    let tasks_side = props.tasks.bucket.map(bucket => {
        return (
            <TaskSide
              key={bucket.id}
              name={bucket.name}
              set={() => props.bu_tasks(bucket.id)}
              edit={() => props.editTask(bucket)}
              remove={() => props.removeTask(bucket.id)}

              editBucket={() => props.editBucket(bucket)}
              removeBucket={() => props.removeBucket(bucket.id)}
            />
        )
      })
    
    let tasks = props.display_tasks.map(task => {
        return (
            <TaskControl
              key={task.id}
              name={task.name}
              edit={() => props.editTask(task)}
              remove={() => props.removeTask(task.id)}
              complete={() => props.completeTask(task.id)}
            />
        )
      })

    if (tasks.length === 0) {
        tasks = <p>Please start adding tasks!</p>;
    }
    return (
    <div className="main content">
        <div className="side left">
          <nav className="dr-menu dr-menu-open">
            <div className="dr-trigger"><span></span><a className="dr-label" onClick={bTaskHandler}>Today</a></div>
            <h3>Buckets</h3>
            <div>

            <ul>
              {tasks_side}
            </ul>
            </div>
          </nav>
        </div>
        <div className="right">
        
     {tasks}
  </div>
      </div>

    );
};

export default taskControls;