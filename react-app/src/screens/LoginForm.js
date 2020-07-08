import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {MyTextInput} from '../components/TextInput'
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom'
import {loginFormInputs} from '../constans/forms'
import {signin} from '../enteties/apiRequests'


const formCreator = ()=> (
    loginFormInputs.map((form, key)=>(
      <MyTextInput 
      name={form.field} 
      type={form.type} 
      placeholder={form.placeholder} 
      key={key} 
      />
    ))
  )

export const LoginForm = (props) => {

let history = useHistory()

const goToRegister = () => history.push('/signup')
const goToProtected = ()=> history.push('/')

  const submitLogin = () => {
    return async (data, {setSubmitting}) => {
      const response = await signin(data)
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
      <h1>Login</h1>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={Yup.object({
        username: Yup.string()
            .min(2)
            .required('Required'),
        password: Yup.string()
            .min(3)
            .required('Required'),
        })}
        onSubmit={submitLogin()}
      >
        <Form >
          {formCreator()}
          <Grid>
            <button type='submit'>Login</button>
          </Grid>
          <Grid>
            <button onClick={goToRegister} type="button">Register</button>
          </Grid>
          
        </Form>
      </Formik>
    </>
  );
};