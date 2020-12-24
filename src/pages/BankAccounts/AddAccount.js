import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, Button } from "reactstrap";
import { Formik, Form } from "formik";
import { CbAccountValues } from "../../helpers/forms/values";
import { validateCbAccountValues } from "../../helpers/forms/validation";

import Input from "../../components/UI/FormItems/Input";
import CustomSelect from "../../components/UI/FormItems/CustomSelect";
import Select from "../../components/UI/FormItems/Select";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const AddAccounts = (props) => {
  const accountBanks = props.banks.filter((bank) => bank.isAccount);

  const bankOptions =
    accountBanks.length > 0
      ? accountBanks.map((bank) => ({
          value: bank.idBank,
          label: bank.name,
          image: bank.image,
        }))
      : [];

  const onSubmit = (values) => (props.data ? props.edit(values, props.data.accountId, props.reset) : props.add());

  return (
    <div className='container-fluid'>
      <Breadcrumbs title='Cuentas' breadcrumbItem={`${props.data ? "Editar" : "Agregar"} cuenta`} />
      <Card>
        <CardBody>
          <Formik initialValues={CbAccountValues(props.data)} validationSchema={validateCbAccountValues} onSubmit={onSubmit} enableReinitialize>
            {({ isValid, touched, errors }) => (
              <Form>
                <Input name='accNumber' type='text' label='Número de cuenta' error={errors.accNumber} touched={touched.accNumber} />
                <Input name='balance' type='number' label='Saldo' error={errors.balance} touched={touched.balance} />
                <CustomSelect name='idBank' label='Banco' options={bankOptions} />
                <Select name='idCurrencyType' label='Moneda' disabled={props.data ? true : false}>
                  {props.currencies
                    ? props.currencies.map((currency) => (
                        <option key={currency.idCurrencyType} value={currency.idCurrencyType}>
                          {currency.currencyName}
                        </option>
                      ))
                    : null}
                </Select>
                <Button color='primary' type='submit' disabled={!isValid}>
                  {props.data ? "Editar" : "Agregar"} Cuenta
                </Button>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { currencies } = state.Currencies;
  const { banks } = state.Banks;
  return { currencies, banks };
};

export default connect(mapStateToProps)(React.memo(AddAccounts));
