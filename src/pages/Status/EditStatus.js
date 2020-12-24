import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Formik, Form } from "formik";
import { statusValues } from "../../helpers/forms/values";

import Input from "../../components/UI/FormItems/Input";

import Breadcrumbs from "../../components/Common/Breadcrumb";

const EditStatus = (props) => {
  const onSubmit = (values) => props.edit(values, props.data && props.data.id, props.reset);
  console.log(props.data.color);
  return (
    <>
      <Breadcrumbs title='status' breadcrumbItem='Estados transacciones' />
      <Card>
        <CardBody>
          <Formik initialValues={statusValues(props.data)} onSubmit={onSubmit} enableReinitialize>
            {({ isValid, values }) => (
              <Form>
                <Input name='description' type='text' label='Nombre del estado' />
                <Input name='hexaColor' value={values.hexaColor} type='color' label='Color' style={{ maxWidth: 100 }} />
                <Button color='primary' type='submit' disabled={!isValid} onSubmit={onSubmit}>
                  Actualizar estado
                </Button>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default EditStatus;
