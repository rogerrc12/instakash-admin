import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import { connect } from "react-redux";
import { getSchedule, editSchedule } from "../../store/actions";

import ScheduleTable from "./ScheduleTable";
import EditSchedule from "./EditSchedule";

const Schedule = (props) => {
  const [editData, setEditData] = useState(null);

  const { getSchedule, editSchedule, schedule, isLoading } = props;

  useEffect(() => {
    getSchedule();
  }, [getSchedule]);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col md='8'>
            <ScheduleTable edit={setEditData} data={schedule} isLoading={isLoading} />
          </Col>
          <Col md='4'>
            {props.error && <Alert color='danger'>{props.error}</Alert>}
            {props.success && <Alert color='success'>{props.success}</Alert>}
            {editData && <EditSchedule data={editData} edit={editSchedule} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { schedule, isLoading, error, success } = state.Schedule;
  return { schedule, isLoading, error, success };
};

export default connect(mapStateToProps, { getSchedule, editSchedule })(Schedule);
