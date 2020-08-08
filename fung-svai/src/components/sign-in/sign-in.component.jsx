import React from 'react';
import './sign-in.styles.scss';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }



    handleSubmit = (event) => {
        event.preventDefault();
        this.setState(
            {
                email: '',
                password: ''
            }
        )
    }


    handleChange = event => {
        const { value, name } = event.target;

        this.setState(
            { [name]: value }
        )
    }


    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>
                    Sign in with your email and password
                </span>

                <from onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type="email"
                        value={this.state.email}
                        label="email"
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        name='password'
                        type="password"
                        value={this.state.password}
                        label="password"
                        handleChange={this.handleChange}
                        required
                    />
                    <div className="buttons">
                        <CustomButton type='submit' >Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </from>

            </div>
        )
    }


}

export default SignIn;