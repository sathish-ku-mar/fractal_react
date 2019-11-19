import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';

import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';

import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class TaskForm extends Component {

    state = {
        taskForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Task Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            bucket: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            due_date: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Due date'
                },
                value: '',
                validation: {
                },
                valid: true,
                touched: false
            },
        },
        formIsValid: false,
        values: this.props.values,
        startDate: new Date()
    }

    componentDidMount(){
        let options = this.props.tasks.bucket.map(bucket => {
            return {value: bucket.id, displayValue: bucket.name}
        })
        
        this.setState({
            ...this.state,
            startDate: this.props.values ? new Date(this.props.values.due_date): new Date(),
            taskForm: {
              ...this.state.taskForm,
              name: {
                ...this.state.taskForm.name,
                value: this.props.values ? this.props.values.name: '',
                valid: this.props.values ? true : false
              },
              bucket: {
                ...this.state.taskForm.bucket,
                valid: options ? true : false,
                value: this.props.values ? this.props.values.bucket.id: options[0].value,
                elementConfig:{
                    ...this.state.taskForm.bucket.elementConfig,
                    options : options
                }
              }
            }});
    }

     handleChange = date => {
    this.setState({
      startDate: date
    });
  };

    addTaskHandler = ( event ) => {
        event.preventDefault();
  
        const formData = {};
        for (let formElementIdentifier in this.state.taskForm) {
            if(formElementIdentifier === 'due_date'){
                formData[formElementIdentifier] = this.state.startDate;
            }else{
                formData[formElementIdentifier] = this.state.taskForm[formElementIdentifier].value;
            }
        }

        this.props.onAddTask(formData);
        
    }

    editTaskHandler = ( event ) => {
        event.preventDefault();
  
        const formData = {};
        for (let formElementIdentifier in this.state.taskForm) {
            if(formElementIdentifier === 'due_date'){
                formData[formElementIdentifier] = this.state.startDate;
            }else{
                formData[formElementIdentifier] = this.state.taskForm[formElementIdentifier].value;
            }
        }

        this.props.onEditTAsk(this.state.values.id, formData);
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(inputIdentifier)
        const updatedTaskForm = {
            ...this.state.taskForm
        };
        const updatedFormElement = { 
            ...updatedTaskForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedTaskForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedTaskForm) {
            formIsValid = updatedTaskForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({taskForm: updatedTaskForm, formIsValid: formIsValid});
        console.log(formIsValid)
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.taskForm) {
            formElementsArray.push({
                id: key,
                config: this.state.taskForm[key]
            })
        }

        let action = this.addTaskHandler
        if (this.state.values){
            action = this.editTaskHandler
        }
        let form = (
            <form onSubmit={action}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
                <Button btnType="Success" disabled={!this.state.formIsValid}>Save</Button>


            </form>
        );

        return (
            <div>
                {form}
                <div>
                    <button onClick={this.props.cancel}>Cancel</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks,
        display_tasks: state.tasks.display_tasks,
        error: state.tasks.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddTask: (taskData) => dispatch(actions.addTask(taskData)),
        onEditTAsk: (id, taskData) => dispatch(actions.editTask(id, taskData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);