import React from 'react';
import { FieldProps } from 'formik';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const inputField = ({ 
    field,
    form: {errors, touched}, 
    ...props
}: FieldProps & InputProps) => {
    const errorMessage = touched[field.name] && errors[field.name];
    return (
        <div>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <input {...field} {...props}/>
        </div>
    )
}