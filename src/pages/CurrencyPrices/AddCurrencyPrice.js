import React from "react";
import { Formik, Form } from "formik";
import { Button, Card, CardBody, Row, Col, Label, Spinner } from "reactstrap";
import { currencyPriceValues } from "../../helpers/forms/values";
import { validateUpdateCurrencyPrice } from "../../helpers/forms/validation";

import RangeInput from "../../components/UI/FormItems/RangeInputNumber";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CustomButton from "../../components/UI/Button";

const AddCurrencyPrice = (props) => {
  let toBuy = [];
  let toSell = [];
  if (props.currentPrice) {
    toBuy = String(props.currentPrice.totalBuy).split("");
    toSell = String(props.currentPrice.totalSale).split("");
  }

  const shutdown = (setFieldValue) => {
    setFieldValue("toBuy1", 0);
    setFieldValue("toBuy2", 0);
    setFieldValue("toBuy3", 0);
    setFieldValue("toBuy4", 0);
    setFieldValue("toSell1", 0);
    setFieldValue("toSell2", 0);
    setFieldValue("toSell3", 0);
    setFieldValue("toSell4", 0);
  };
  const onSubmit = (values) => props.addCurrency(values, props.updateTable);

  return (
    <div className='container-fluid'>
      <Breadcrumbs title='Actualizar precio' breadcrumbItem='Actualizar precio' />
      <Card>
        <CardBody className='text-center position-relative'>
          {props.isLoading ? (
            <Spinner />
          ) : (
            <Formik initialValues={currencyPriceValues(toBuy, toSell)} validationSchema={validateUpdateCurrencyPrice} onSubmit={onSubmit} enableReinitialize>
              {({ isValid, setFieldValue, values, errors, touched }) => (
                <Form style={{ textAlign: "center" }}>
                  <Label className='my-2'>COMPRA</Label>
                  <Row>
                    <Col className='col-12 d-flex flex-row align-items-end justify-content-center'>
                      <RangeInput name='toBuy1' error={errors.toBuy1} touched={touched.toBuy1} setFieldValue={setFieldValue} value={values.toBuy1} />
                      <span style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0 0 25px" }}>&#x0002E;</span>
                      <RangeInput name='toBuy2' error={errors.toBuy2} touched={touched.toBuy2} setFieldValue={setFieldValue} value={values.toBuy2} />
                      <RangeInput name='toBuy3' error={errors.toBuy3} touched={touched.toBuy3} setFieldValue={setFieldValue} value={values.toBuy3} />
                      <RangeInput name='toBuy4' error={errors.toBuy4} touched={touched.toBuy4} setFieldValue={setFieldValue} value={values.toBuy4} />
                    </Col>
                  </Row>
                  <hr />
                  <Label className='my-2'>VENTA</Label>
                  <Row>
                    <Col className='col-12 d-flex flex-row align-items-end justify-content-center'>
                      <RangeInput name='toSell1' error={errors.toSell1} touched={touched.toSell1} setFieldValue={setFieldValue} value={values.toSell1} />
                      <span style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0 0 25px" }}>&#x0002E;</span>
                      <RangeInput name='toSell2' setFieldValue={setFieldValue} value={values.toSell2} />
                      <RangeInput name='toSell3' setFieldValue={setFieldValue} value={values.toSell3} />
                      <RangeInput name='toSell4' setFieldValue={setFieldValue} value={values.toSell4} />
                    </Col>
                  </Row>
                  <Button type='submit' color='primary' className='mt-3' disabled={!isValid}>
                    {props.isUpdating ? <Spinner /> : null}
                    {props.isUpdating ? "Actualizando..." : "Actualizar precio"}
                  </Button>
                  <CustomButton className='position-absolute' style={{ top: 20, right: 10 }} type='button' onClick={shutdown.bind(null, setFieldValue)}>
                    <span className='bx bx-power-off bx-sm text-danger' />
                  </CustomButton>
                </Form>
              )}
            </Formik>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default AddCurrencyPrice;
