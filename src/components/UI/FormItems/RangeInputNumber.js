import React from "react";
import { Field } from "formik";

import classes from "./FormItems.module.scss";

const RangeInputNumber = (props) => {
  const { setFieldValue, value, name } = props;

  const add = () => setFieldValue(name, +value >= 9 ? 0 : +value + 1);
  const substract = () => setFieldValue(name, +value <= 0 ? 9 : +value - 1);

  return (
    <div className={classes.RangeInputWrapper}>
      <button type='button' onClick={add}>
        <span className='fas fa-plus' />
      </button>
      <Field type='text' name={name} disabled />
      <button type='button' onClick={substract}>
        <span className='fas fa-minus' />
      </button>
    </div>
  );
};

export default RangeInputNumber;
