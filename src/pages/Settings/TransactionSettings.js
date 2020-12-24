import React from "react";
import { Formik, Form } from "formik";
import { Button } from "reactstrap";
import { transactionSettingsValues } from "../../helpers/forms/values";
import { validateTransactionSettings } from "../../helpers/forms/validation";

import Input from "../../components/UI/FormItems/Input";

const TransactionSettings = (props) => {
  const onSubmit = (values) => props.update(values);
  return (
    <Formik
      initialValues={transactionSettingsValues(props.values)}
      onSubmit={onSubmit}
      validationSchema={validateTransactionSettings}
      enableReinitialize
    >
      {({ isValid }) => (
        <Form>
          <Input name='merchantComment' label='Descripción de compra (Avance de efectivo)' type='text' />
          <Input name='minutesToCancelOp' label='Limite de tiempo por operación (minutos)' type='number' />
          <Input name='timeToResponse' label='Descripción de limite de tiempo (cliente)' type='text' />
          <Button color='primary' type='submit' disabled={!isValid}>
            Actualizar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(TransactionSettings);
