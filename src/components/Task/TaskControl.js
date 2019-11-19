import React from 'react';

const taskControl = (props) => (

    <div className="task">
    	<div className="a">
        	<h4>{props.name}</h4>
        
            <div className="dropdown-t">
              <button className="dropbtn">::</button>
              <div className="dropdown-task">
                <div className="align-button-task">
                    <button onClick={props.complete}>Complete</button>
                    <button onClick={props.edit}>Edit</button>
                    <button onClick={props.remove} >Delete</button>
               </div>
               </div>
            </div>
        
        </div>
        <hr />
    </div>

);

export default taskControl;