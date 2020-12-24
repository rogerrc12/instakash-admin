import React from "react";
import { Formik, Form } from "formik";
import { Button } from "reactstrap";
import { registerAdminValues } from "../../helpers/forms/values";
import { validateAdminUserValues } from "../../helpers/forms/validation";

import Input from "../../components/UI/FormItems/Input";
import Select from "../../components/UI/FormItems/Select";

const UserForm = (props) => {
  const onSubmit = (values) => (props.userData ? props.edit(values, props.userData.userId) : props.add(values));
  return (
    <>
      <p>{props.userData ? "Editar" : "Agregar"} usuario</p>
      <Formik
        initialValues={registerAdminValues(props.userData)}
        onSubmit={onSubmit}
        validationSchema={validateAdminUserValues(props.userData)}
        enableReinitialize
      >
        {({ values, isValid, errors, touched }) => (
          <Form>
            <Input name='UserName' type='text' label='Nombre completo' error={errors.UserName} touched={touched.UserName} />
            <Input name='Email' type='email' label='Correo electrónico' error={errors.Email} touched={touched.Email} />
            <Input name='Password' type='password' label='Contraseña' error={errors.Password} touched={touched.Password} />
            <Input
              name='ConfirmPassword'
              type='password'
              label='Confirmar Contraseña'
              error={errors.ConfirmPassword}
              touched={touched.ConfirmPassword}
            />
            <Select label='Rol de usuario' name='IdRol' error={errors.IdRol} touched={touched.IdRol}>
              {props.roles.map((role) => (
                <option key={role.id} value={+role.id}>
                  {role.name}
                </option>
              ))}
            </Select>
            <Button type='submit' color='primary' className='mr-1' disabled={!isValid}>
              {props.userData ? "Editar" : "Agregar"} usuario
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default React.memo(UserForm);
