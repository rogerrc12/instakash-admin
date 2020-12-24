import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";

const Checkbox = (props) => {
  return (
    <FormGroup>
      <Label className='d-flex align-items-center'>
        <Field type='checkbox' name={props.name} checked={props.value || false} />
        <span className='ml-2'>{props.label}</span>
      </Label>
    </FormGroup>
  );
};

export default Checkbox;
