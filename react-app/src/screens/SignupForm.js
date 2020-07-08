import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {MyTextInput} from '../components/TextInput'
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom'
import {registerFormInputs} from '../constans/forms'
import {signup} from '../enteties/apiRequests'


const formCreator = ()=> (
  registerFormInputs.map((form, key)=>{
   return <MyTextInput 
    name={form.field} 
    type={form.type} 
    placeholder={form.placeholder} 
    key={key} 
    />
  })
)

export const SignupForm = (props) => {
  
let history = useHistory()
const goToLogin = () => history.push('/signin')
const goToProtected = ()=> history.push('/')

const submitSignup = () => {
  return async (data, {setSubmitting}) => {
    const response = await signup(data)
    if (response.status) {
      props.auth.authenticate()
      goToProtected()
    } else {
      alert(response.data)
    }
    
    setSubmitting(false)
  }
}
  
  return (
    <>
      <h1>Register</h1>
      <Formik 
      initialValues={{
          username: '',
          password: '',
          email: '',
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          password: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        })}
        onSubmit={submitSignup()}
      >
        <Form >
         {formCreator()}
          <button type="submit">Register</button>
          
          <Grid>
          <button onClick={goToLogin} type='button'>Login</button>
          </Grid>
          
        </Form>
      </Formik>
    </>
  );
};