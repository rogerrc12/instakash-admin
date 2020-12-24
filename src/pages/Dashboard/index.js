import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import { getCounters, getCurrencyBarChart, getAdvanceBarChart, getUsersChart } from "../../store/actions";

//import Charts
import StackedColumnChart from "./StackedColumnChart";
import SplineArea from "../../components/UI/Charts/SplineArea";
import UsersChart from "./UsersChart";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
// import MonthlyEarning from "./MonthlyEarning";
import ActivityComp from "./ActivityComp";
import Counters from "./Counters";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withNamespaces } from "react-i18next";

const Dashboard = (props) => {
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.Login.user);
  const { currencyBarData, advanceBarData, usersData } = useSelector((state) => state.Charts);

  useEffect(() => {
    dispatch(getCounters());
    dispatch(getAdvanceBarChart());
    dispatch(getCurrencyBarChart());
    dispatch(getUsersChart());
  }, [dispatch]);

  const togglemodal = () => {
    setModal((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={props.t("Dashboard")} breadcrumbItem={props.t("Dashboard")} />
          <Row>
            <Col xl='12'>
              <Row>
                <Counters />
              </Row>
            </Col>
            {user && user.idRol === 1 ? (
              <>
                <Col xl='8'>
                  <ActivityComp />
                </Col>
                <Col xl='4'>{/* <MonthlyEarning /> */}</Col>
              </>
            ) : null}
          </Row>
          <Row>
            <Col xl='6'>
              <Card>
                <CardBody>
                  <CardTitle className='mb-4 float-sm-left'>Cambios de divisa (por mes)</CardTitle>

                  <StackedColumnChart data={currencyBarData} />
                </CardBody>
              </Card>
            </Col>
            <Col xl='6'>
              <Card>
                <CardBody>
                  <CardTitle className='mb-4 float-sm-left'>Avances de efectivo (por mes)</CardTitle>

                  <StackedColumnChart data={advanceBarData} />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg='6'>
              <SplineArea />
            </Col>
            <Col lg='6'>
              <SplineArea />
            </Col>
          </Row>

          <Row>
            <Col className='col-12'>
              <UsersChart data={usersData} />
            </Col>
          </Row>
        </Container>
      </div>
      <Modal isOpen={modal} role='dialog' autoFocus={true} centered={true} className='exampleModal' tabindex='-1' toggle={togglemodal}>
        <div className='modal-content'>
          <ModalHeader toggle={togglemodal}>Order Details</ModalHeader>
          <ModalBody>
            <p className='mb-2'>
              Product id: <span className='text-primary'>#SK2540</span>
            </p>
            <p className='mb-4'>
              Billing Name: <span className='text-primary'>Neal Matthews</span>
            </p>

            <div className='table-responsive'>
              <Table className='table table-centered table-nowrap'>
                <thead>
                  <tr>
                    <th scope='col'>Product</th>
                    <th scope='col'>Product Name</th>
                    <th scope='col'>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope='row'>
                      <div>
                        <img src={modalimage1} alt='' className='avatar-sm' />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className='text-truncate font-size-14'>Wireless Headphone (Black)</h5>
                        <p className='text-muted mb-0'>$ 225 x 1</p>
                      </div>
                    </td>
                    <td>$ 255</td>
                  </tr>
                  <tr>
                    <th scope='row'>
                      <div>
                        <img src={modalimage2} alt='' className='avatar-sm' />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className='text-truncate font-size-14'>Hoodie (Blue)</h5>
                        <p className='text-muted mb-0'>$ 145 x 1</p>
                      </div>
                    </td>
                    <td>$ 145</td>
                  </tr>
                  <tr>
                    <td colspan='2'>
                      <h6 className='m-0 text-right'>Sub Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                  <tr>
                    <td colspan='2'>
                      <h6 className='m-0 text-right'>Shipping:</h6>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td colspan='2'>
                      <h6 className='m-0 text-right'>Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type='button' color='secondary' onClick={togglemodal}>
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default withNamespaces()(Dashboard);
