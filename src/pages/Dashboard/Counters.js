import React from "react";
import { useSelector } from "react-redux";
import { Media, Col, Card, CardBody } from "reactstrap";

const Counters = () => {
  const { counters } = useSelector((state) => state.Counters);

  const reports = [
    { title: "Cambios de divisas (hoy)", iconClass: "bx-dollar-circle", description: counters && counters.cambios },
    { title: "Avances de efectivo (hoy)", iconClass: "bx-credit-card", description: counters && counters.avances },
    { title: "Clientes registrados (hoy)", iconClass: "bx-user-check", description: counters && counters.clienteRegistrados },
  ];

  return reports.map((report, key) => (
    <Col md='4' key={"_col_" + key}>
      <Card className='mini-stats-wid'>
        <CardBody>
          <Media>
            <Media body>
              <p className='text-muted font-weight-medium'>{report.title}</p>
              <h4 className='mb-0'>{report.description}</h4>
            </Media>
            <div className='mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center'>
              <span className='avatar-title'>
                <i className={"bx " + report.iconClass + " font-size-24"}></i>
              </span>
            </div>
          </Media>
        </CardBody>
      </Card>
    </Col>
  ));
};

export default Counters;
