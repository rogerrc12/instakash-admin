import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import { connect } from "react-redux";
import { getStatus, editStatus } from "../../store/actions";

import StatusTable from "./StatusTable";
import EditStatus from "./EditStatus";

const Status = (props) => {
  const [editData, setEditData] = useState(null);

  const { getStatus, editStatus, status, isLoading } = props;

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='6'>
            <StatusTable data={status} isLoading={isLoading} setEdit={setEditData} />
          </Col>
          <Col lg='6'>
            {props.error && <Alert color='danger'>{props.error}</Alert>}
            {props.success && <Alert color='success'>{props.success}</Alert>}
            {editData && <EditStatus reset={setEditData} edit={editStatus} data={editData} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { status, error, success, isLoading } = state.Status;
  return { status, error, success, isLoading };
};

export default connect(mapStateToProps, { getStatus, editStatus })(Status);
