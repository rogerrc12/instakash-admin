import React from "react";
import { Field, ErrorMessage } from "formik";
import { FormGroup, Label } from "reactstrap";
import Select, { components } from "react-select";

const { Option, ValueContainer, Placeholder } = components;

const styles = {
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: ".8rem",
    backgroundColor: state.isFocused ? "#32394e" : "transparent",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#a6b0cf",
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "#2e3548",
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#2e3548",
    color: "#a6b0cf",
    borderColor: "#32394e",
  }),
  placeholder: (provided, state) => {
    const isValid = state.isFocused || state.hasValue || state.selectProps.inputValue;
    return {
      ...provided,
      display: isValid ? "none" : "inline-block",
      color: "#a6b0cf",
    };
  },
};

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
    </ValueContainer>
  );
};

const IconOption = (props) => {
  return (
    <Option {...props}>
      <img src={"data:image/png;base64, " + props.data.image} alt={props.data.label} style={{ width: "25px", marginRIght: "10px", display: "inline-block" }} />
      <span className='ml-2'>{props.data.label}</span>
    </Option>
  );
};

const CustomSelect = (props) => {
  return (
    <FormGroup>
      <Label>{props.label}</Label>
      <Field name={props.name}>
        {({ field, form }) => (
          <Select
            placeholder='Seleccionar'
            className={`${props.touched && props.error ? "is-invalid" : ""}`}
            styles={styles}
            onChange={(option) => form.setFieldValue(field.name, option.value)}
            value={props.options.find((option) => option.value === field.value)}
            options={props.options}
            components={{ Option: IconOption, ValueContainer: CustomValueContainer }}
          />
        )}
      </Field>
      <ErrorMessage name={props.name}>{(message) => <span className='invalid-feedback'>{message}</span>}</ErrorMessage>
    </FormGroup>
  );
};

export default CustomSelect;
