import React, { useEffect, useState } from "react";
import { Row, Col, Container, Alert } from "reactstrap";
import { connect } from "react-redux";
import { getLimits, editLimits } from "../../store/actions";

import LimitsTable from "./LimitstTable";
import EditLimits from "./EditLimits";

const TransactionLimits = (props) => {
  const { location, getLimits } = props;
  let params = new URLSearchParams(location.search);
  const [editData, setEditData] = useState(null);

  const type = params.get("type");

  useEffect(() => {
    getLimits();
  }, [getLimits]);

  let data = [];

  if (props.limits.length > 0) {
    data = props.limits.filter((limit) => (type === "currencyExchange" ? limit.operationType === 0 : limit.operationType === 1));
  }

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='8'>
            <LimitsTable edit={setEditData} type={type} data={data} isLoading={props.isLoading} />
          </Col>
          <Col lg='4'>
            {props.error && <Alert color='danger'>{props.error}</Alert>}
            {props.success && <Alert color='success'>{props.success}</Alert>}
            {editData ? <EditLimits resetEdit={setEditData} edit={props.editLimits} type={type} data={editData} /> : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { limits, success, error, isLoading } = state.Limits;
  return { limits, success, error, isLoading };
};

export default connect(mapStateToProps, { getLimits, editLimits })(TransactionLimits);
