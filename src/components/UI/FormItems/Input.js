import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field, ErrorMessage } from "formik";

const Input = (props) => {
  const { label, name, type, touched, error, ...rest } = props;
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Field {...rest} name={name} type={type} className={`form-control ${touched && error ? "is-invalid" : ""}`} />
      <ErrorMessage name={name}>{(message) => <span className='invalid-feedback'>{message}</span>}</ErrorMessage>
    </FormGroup>
  );
};

export default Input;
