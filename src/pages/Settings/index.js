import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSettings, updateSettings } from "../../store/settings/basicSettings/actions";
import { Container, Row, Col, Card, CardBody, Alert } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import LandingSettings from "./LandingSettings";
import TransactionSettings from "./TransactionSettings";

const Settings = (props) => {
  const [landingValues, setLandingValues] = useState(null);
  const [transactionValues, setTransactionValues] = useState(null);

  const { getSettings, updateSettings, settings } = props;

  useEffect(() => {
    if (!settings.id) getSettings();

    if (settings.id) {
      setLandingValues({
        contOps: settings.contOps,
        contUsers: settings.contUsers,
        contSolesTransfer: settings.contSolesTransfer,
        showRealStadistic: settings.showRealStadistic,
      });
      setTransactionValues({
        merchantComment: settings.merchantComment,
        minutesToCancelOp: settings.minutesToCancelOp,
        timeToResponse: settings.timeToResponse,
      });
    }
  }, [getSettings, settings]);

  return (
    <div className='page-content'>
      <Container fluid>
        <Breadcrumbs title='Ajustes' breadcrumbItem='Ajustes básicos' />
        {props.error && props.error ? <Alert color='danger'>{props.error}</Alert> : null}
        {props.success && props.success ? <Alert color='success'>{props.success}</Alert> : null}

        <Row>
          <Col lg='6'>
            <Card>
              <CardBody>
                <h4 className='card-title mb-4'>Ajustes landing page</h4>
                <LandingSettings values={landingValues} update={updateSettings} />
              </CardBody>
            </Card>
          </Col>
          <Col lg='6'>
            <Card>
              <CardBody>
                <h4 className='card-title mb-4'>Ajustes de transacciones</h4>
                <TransactionSettings values={transactionValues} update={updateSettings} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { error, success, settings } = state.Settings;
  return { error, success, settings };
};

export default connect(mapStateToProps, { getSettings, updateSettings })(Settings);
