import React from 'react';
import { useField } from 'formik';
import './css/TextInput.css'

export const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    
    return (
      <>
      <label htmlFor={props.id || props.name}>{label}</label>
        <input className="field" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
       
      </>
    );
  };