import React, { useState } from "react";
import { Field } from "formik";
import Dropzone from "react-dropzone";
import { Card, Row, Col } from "reactstrap";

import { Link } from "react-router-dom";

import ErrorMessage from "./ErrorMessage";

const CustomUpload = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleAcceptedFiles = (files, setFieldValue) => {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

    setSelectedFiles(files);
    setFieldValue(props.name, files);
  };

  return (
    <>
      <Field name={props.name}>
        {({ form }) => (
          <>
            <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles, form.setFieldValue)}>
              {({ getRootProps, getInputProps }) => (
                <div className='dropzone'>
                  <div className='dz-message needsclick' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className='mb-2'>
                      <i className='display-4 text-muted bx bxs-cloud-upload'></i>
                    </div>
                    <h4>{props.label}</h4>
                  </div>
                </div>
              )}
            </Dropzone>
            <div className='dropzone-previews' id='file-previews'>
              {selectedFiles.map((f, i) => {
                return (
                  <Card className='mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete' key={i + "-file"}>
                    <div className='p-2'>
                      <Row className='align-items-center'>
                        <Col className='col-auto'>
                          <img data-dz-thumbnail='' height='80' className='avatar-sm rounded bg-light' alt={f.name} src={f.preview} />
                        </Col>
                        <Col>
                          <Link to='#' className='text-muted font-weight-bold'>
                            {f.name}
                          </Link>
                          <p className='mb-0'>
                            <strong>{f.formattedSize}</strong>
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </Field>
      <ErrorMessage name={props.name} />
    </>
  );
};

export default CustomUpload;
