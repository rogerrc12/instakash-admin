import React from "react";
import { Card, CardBody, Button, Alert } from "reactstrap";
import { Formik, Form } from "formik";
import { bankValues } from "../../helpers/forms/values";

import Input from "../../components/UI/FormItems/Input";
import FileInput from "../../components/UI/FormItems/FileUpload";
import Checkbox from "../../components/UI/FormItems/Checkbox";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const AddBank = (props) => {
  const onSubmit = (values, { resetForm }) => (props.editState ? props.edit(props.editState.id, values, resetForm) : props.add(values, resetForm));
  return (
    <>
      <Breadcrumbs title='Bancos' breadcrumbItem={`${props.editState ? "Editar" : "Agregar"} banco`} />
      <Card>
        {props.success && <Alert color='success'>{props.success}</Alert>}
        {props.error && <Alert color='danger'>{props.error}</Alert>}
        <CardBody>
          <Formik initialValues={bankValues(props.editState)} onSubmit={onSubmit} enableReinitialize>
            {({ isValid, values }) => (
              <Form>
                <Input label='Nombre del banco' type='text' name='name' />
                <Checkbox name='addAccount' value={values.addAccount} label='Uso para crear cuentas' />
                <Checkbox name='paymentOption' value={values.paymentOption} label='Uso para pagos' />
                <FileInput name='bankImage' label='Icono del banco' preview={values.imagePreview} placeholder='Selecciona un icono' />
                <Button type='submit' color='primary' disabled={!isValid}>
                  {props.editState ? "Editar" : "Agregar"} banco
                </Button>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default AddBank;
