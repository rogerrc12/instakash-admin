import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Formik, Form } from "formik";
import { scheduleValues } from "../../helpers/forms/values";

import Input from "../../components/UI/FormItems/Input";
import Select from "../../components/UI/FormItems/Select";
import Checkbox from "../../components/UI/FormItems/Checkbox";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const EditSchedule = (props) => {
  const onSubmit = (values) => props.edit(values);

  return (
    <>
      <Breadcrumbs title='Horarios' breadcrumbItem='Editar horario' />
      <Card>
        <CardBody>
          <Formik initialValues={scheduleValues(props.data)} onSubmit={onSubmit} enableReinitialize>
            {({ isValid, values }) => (
              <Form>
                <Select name='IdWeekday' label='Día de la semana' disabled>
                  <option value={0}>Domingo</option>
                  <option value={1}>Lunes</option>
                  <option value={2}>Martes</option>
                  <option value={3}>Miercoles</option>
                  <option value={4}>Jueves</option>
                  <option value={5}>Viernes</option>
                  <option value={6}>Sábado</option>
                </Select>

                <Input name='StartTime' label='Fecha de apertura' />
                <Input name='EndTime' label='Fecha de cierre' />
                <Checkbox name='IsWorkingDay' label='¿Es día laboral?' value={values.IsWorkingDay} />

                <Button disabled={!isValid}>Actualizar horario</Button>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default EditSchedule;
