import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Formik, Form } from "formik";
import { limitsValues } from "../../helpers/forms/values";

import Input from "../../components/UI/FormItems/Input";
import Select from "../../components/UI/FormItems/Select";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const EditLimits = (props) => {
  const onSubmit = (values) => props.edit(values, props.data, props.resetEdit);

  return (
    <div className='container-fluid'>
      <Breadcrumbs title='Actualizar limites' breadcrumbItem='Actualizar limites' />
      <Card>
        <CardBody>
          <Formik initialValues={limitsValues(props.data)} onSubmit={onSubmit} enableReinitialize>
            {({ isValid }) => (
              <Form>
                <Select name='idCurrency' label='Moneda' disabled>
                  <option value={1}>Dólares ($)</option>
                  <option value={2}>Soles (s/.)</option>
                </Select>
                <Input name='transactionLimit' type='number' label='Limite por transacción' />
                <Input name='transactionMinimum' type='number' label='Mínimo por transacción' />
                <Input name='limitPerDay' type='number' label='Limite por día' />
                <Button color='primary' type='submit' disabled={!isValid}>
                  Actualizar limites
                </Button>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default React.memo(EditLimits);
