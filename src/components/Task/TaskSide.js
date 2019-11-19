import React from 'react';

const taskSide = (props) => (
    <li>
  
        <a onClick={props.set}>{props.name}</a>
        <div className="dropdown">
		  <button className="dropbtn">::</button>
		  <div className="dropdown-content">
		  	<div className="align-button">
	        <button onClick={props.editBucket}>Edit</button>
	        <button onClick={props.removeBucket} >Delete</button>
	       </div>
	       </div>
		</div>
        <hr />
    </li>
    
);

export default taskSide;