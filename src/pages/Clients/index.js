import React from "react";
import { Container, Row, Col } from "reactstrap";

import UsersTable from "./ClientsTable";

const Users = () => {
  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='12'>
            <UsersTable />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Users;
