import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "reactstrap";
import { connect } from "react-redux";
import { getBanks, addBank, deleteBank, editBank } from "../../store/actions";

import BanksTable from "./BanksTable";
import AddBank from "./AddBank";

const Banks = (props) => {
  const [editState, setEditState] = useState(null);

  const { getBanks } = props;

  useEffect(() => {
    getBanks();
  }, [getBanks]);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='8'>
            <BanksTable data={props.banks} isLoading={props.isLoading} edit={setEditState} delete={props.deleteBank} />
          </Col>
          <Col lg='4'>
            <AddBank editState={editState} edit={props.editBank} add={props.addBank} isProcessing={props.isProcessing} error={props.error} success={props.success} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { banks, isLoading, isProcessing, error, success } = state.Banks;
  return { banks, isLoading, isProcessing, error, success };
};

export default connect(mapStateToProps, { getBanks, addBank, deleteBank, editBank })(Banks);
