import React from "react";
import { Formik, Form } from "formik";
import { Button } from "reactstrap";
import { landingSettingsValues } from "../../helpers/forms/values";
import { validateLandingSettings } from "../../helpers/forms/validation";

import Input from "../../components/UI/FormItems/Input";
import Checkbox from "../../components/UI/FormItems/Checkbox";

const LandingSettings = (props) => {
  const onSubmit = (values) => props.update(values);

  return (
    <Formik initialValues={landingSettingsValues(props.values)} validationSchema={validateLandingSettings} onSubmit={onSubmit} enableReinitialize>
      {({ isValid, values, errors, touched }) => (
        <Form>
          <Input
            disabled={values.showRealStadistic}
            touched={touched.contUsers}
            error={errors.contUsers}
            type='number'
            name='contUsers'
            label='Usuarios registrados (manual)'
            placeholder='1000'
          />
          <Input
            disabled={values.showRealStadistic}
            touched={touched.contOps}
            error={errors.contOps}
            type='number'
            name='contOps'
            label='Operaciones recibidas (manual)'
            placeholder='1000'
          />
          <Input
            disabled={values.showRealStadistic}
            touched={touched.contSolesTransfer}
            error={errors.contSolesTransfer}
            type='number'
            name='contSolesTransfer'
            label='Soles transferidos (manual)'
            placeholder='1000'
          />
          <Checkbox name='showRealStadistic' label='Mostrar los valores reales' value={values.showRealStadistic} />
          <Button type='submit' color='primary' disabled={!isValid}>
            Actualizar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(LandingSettings);
