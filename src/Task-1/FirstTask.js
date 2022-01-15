import React from 'react'
import './firstTask.css'
import InputField from './components/formInputField'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import { Helmet } from 'react-helmet-async'
import Animate from '../Animate'
const initialState = {
   userName: '',
   firstName: '',
   lastName: '',
   email: '',
   password: '',
   confirmPassword: '',
   userNameError: '',
   emailError: '',
   passwordError: '',
   confirmPasswordError: '',
   userNameErrorTrue: '',
   emailErrorTrue: '',
   passwordErrorTrue: '',
   firstNameErrorTrue: '',
   lastNameErrorTrue: '',
   confirmPasswordErrorTrue: '',
}

export default class ValidationForm extends React.Component {
   state = initialState

   handleChange = (event) => {
      const isCheckbox = event.target.type === 'checkbox'
      this.setState({
         [event.target.name]: isCheckbox
            ? event.target.checked
            : event.target.value,
      })
   }

   validate = () => {
      let emailError = ''
      let userNameError = ''
      let lastNameError = ''
      let passwordError = ''
      let firstNameError = ''
      let confirmPasswordError = ''
      let emailregex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
      let passwordRegEx =
         /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/

      let userNameErrorTrue = ''
      let firstNameErrorTrue = ''
      let lastNameErrorTrue = ''
      let emailErrorTrue = ''
      let passwordErrorTrue = ''
      let confirmPasswordErrorTrue = ''
      if (!this.state.lastName) {
         lastNameError = 'Last name cannot be blank'
         lastNameErrorTrue = 'inputError'
      }
      if (!this.state.firstName) {
         firstNameError = 'First name cannot be blank'
         firstNameErrorTrue = 'inputError'
      }

      if (!this.state.userName) {
         userNameError = 'username cannot be blank'
         userNameErrorTrue = 'inputError'
      } else if (6 > this.state.userName.length) {
         userNameError = 'username is too Short'
         userNameErrorTrue = 'inputError'
      } else if (this.state.userName.length > 12) {
         userNameError = 'username is too Long'
         userNameErrorTrue = 'inputError'
      }

      if (!emailregex.test(this.state.email)) {
         emailError = 'Invalid email'

         emailErrorTrue = 'inputError'
      }
      if (!passwordRegEx.test(this.state.password)) {
         passwordError =
            'Password must have at least 1 capital letter,number and a special character'
         passwordErrorTrue = 'inputError'
      }
      if (this.state.password !== this.state.confirmPassword) {
         confirmPasswordError = 'Password does not match'
         confirmPasswordErrorTrue = 'inputError'
      }
      if (
         emailError ||
         userNameError ||
         lastNameError ||
         firstNameError ||
         passwordError ||
         confirmPasswordError
      ) {
         this.setState({
            emailError,
            userNameError,
            lastNameError,
            passwordError,
            firstNameError,
            confirmPasswordError,
            userNameErrorTrue,
            emailErrorTrue,
            firstNameErrorTrue,
            lastNameErrorTrue,
            passwordErrorTrue,
            confirmPasswordErrorTrue,
         })
         return false
      }

      return true
   }

   handleSubmit = (event) => {
      event.preventDefault()
      const isValid = this.validate()
      if (isValid) {
         const formFields = {
            userName: this.state.userName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            email: this.state.email,
         }
         this.setState(initialState)
         fetch('https://jsonblob.com/api/jsonBlob', {
            method: 'post',
            headers: {
               'Content-Type': 'application/json',
               Accept: 'application/json',
               redirect: 'follow',
            },
            body: JSON.stringify(formFields),
         })
            .then(function (response) {
               let blobUrl = response.headers.get('Location')

               NotificationManager.success(
                  'Congratulations you have successfully registered! ',
                  'Success!'
               )
               console.log(blobUrl, 'BLOB URL')
            })
            .catch(function (error) {
               console.log(error)
               NotificationManager.error(
                  'Something went wrong please try again! ',
                  'Error!'
               )
            })
      }
   }

   render() {
      return (
         <Animate>
            <div className='firstTaskContainer'>
               <Helmet>
                  <title>Task-1</title>
               </Helmet>
               <NotificationContainer />
               <div className='firstTaskImageContainer'>
                  <img src='/images/registerImage.svg' alt='' />
               </div>
               <form className='firstTaskForm' onSubmit={this.handleSubmit}>
                  <div className='firstTaskRegisterText'>REGISTER WITH US</div>
                  <InputField
                     type='text'
                     name='userName'
                     placeholder='Username'
                     icon='fa fa-user icon'
                     value={this.state.userName}
                     class={this.state.userNameErrorTrue}
                     errorMessage={this.state.userNameError}
                     handleChange={this.handleChange}
                  />
                  <InputField
                     type='text'
                     name='firstName'
                     placeholder='First Name'
                     icon='fas fa-signature'
                     value={this.state.firstName}
                     class={this.state.firstNameErrorTrue}
                     errorMessage={this.state.firstNameError}
                     handleChange={this.handleChange}
                  />
                  <InputField
                     type='text'
                     name='lastName'
                     placeholder='Last Name'
                     icon='fas fa-signature'
                     value={this.state.lastName}
                     class={this.state.lastNameErrorTrue}
                     errorMessage={this.state.lastNameError}
                     handleChange={this.handleChange}
                  />
                  <InputField
                     type='text'
                     name='email'
                     placeholder='Email'
                     icon='fa fa-envelope icon'
                     value={this.state.email}
                     class={this.state.emailErrorTrue}
                     errorMessage={this.state.emailError}
                     handleChange={this.handleChange}
                  />
                  <InputField
                     type='password'
                     name='password'
                     placeholder='Password'
                     icon='fa fa-key icon'
                     value={this.state.password}
                     class={this.state.passwordErrorTrue}
                     errorMessage={this.state.passwordError}
                     handleChange={this.handleChange}
                  />
                  <InputField
                     type='password'
                     name='confirmPassword'
                     placeholder='Confirm Password'
                     icon='fas fa-unlock-alt'
                     value={this.state.confirmPassword}
                     class={this.state.confirmPasswordErrorTrue}
                     errorMessage={this.state.confirmPasswordError}
                     handleChange={this.handleChange}
                  />
                  <button type='submit'>SUBMIT</button>
               </form>
            </div>
         </Animate>
      )
   }
}
