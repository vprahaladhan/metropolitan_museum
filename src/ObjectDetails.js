import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ObjectDetails({ object, closeDetails }) {
  return (
    <>
      <Modal show={true} onHide={closeDetails} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            {object.title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {
            Object.entries(object).map(([key, value]) => (
              <div key={key}>
                {key} : {Array.isArray(value) ? "" : value}
              </div>
            ))
          }
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ObjectDetails;