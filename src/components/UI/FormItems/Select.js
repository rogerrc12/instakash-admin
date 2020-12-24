import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field, ErrorMessage } from "formik";

const Select = (props) => {
  const { touched, error, name, label, ...rest } = props;

  return (
    <FormGroup>
      <Label>{label}</Label>
      <Field {...rest} name={name} as='select' className={`custom-select ${touched && error ? "is-invalid" : ""}`}>
        <option defaultValue>Selecciona una opción</option>
        {props.children}
      </Field>
      <ErrorMessage name={name}>{(message) => <span className='invalid-feedback'>{message}</span>}</ErrorMessage>
    </FormGroup>
  );
};

export default Select;
