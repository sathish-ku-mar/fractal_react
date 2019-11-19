import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';

import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';

class BucketForm extends Component {

    state = {
        bucketForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Bucket Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        values: this.props.values,
    }

    componentDidMount(){
        
        this.setState({
            ...this.state,
            bucketForm: {
              ...this.state.bucketForm,
              name: {
                ...this.state.bucketForm.name,
                value: this.props.values ? this.props.values.name: '',
                valid: this.props.values ? true : false,
              },
            }});
    }

    addBucketHandler = ( event ) => {
        event.preventDefault();
  
        const formData = {};
        for (let formElementIdentifier in this.state.bucketForm) {
            formData[formElementIdentifier] = this.state.bucketForm[formElementIdentifier].value;
        }

        this.props.onAddBucket(formData);
        
    }

    editBucketHandler = ( event ) => {
        event.preventDefault();
  
        const formData = {};
        for (let formElementIdentifier in this.state.bucketForm) {
            formData[formElementIdentifier] = this.state.bucketForm[formElementIdentifier].value;
        }

        this.props.onBucketEdit(this.state.values.id, formData);
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
        const updatedBucketForm = {
            ...this.state.bucketForm
        };
        const updatedFormElement = { 
            ...updatedBucketForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedBucketForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedBucketForm) {
            formIsValid = updatedBucketForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({bucketForm: updatedBucketForm, formIsValid: formIsValid});
    }

    render () {
        
        const formElementsArray = [];
        for (let key in this.state.bucketForm) {
            formElementsArray.push({
                id: key,
                config: this.state.bucketForm[key]
            });
        }
        let action = this.addBucketHandler
        if (this.state.values){
            action = this.editBucketHandler
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
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddBucket: (bucketData) => dispatch(actions.addBucket(bucketData)),
        onBucketEdit: (id, bucketData) => dispatch(actions.editBucket(id, bucketData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BucketForm);