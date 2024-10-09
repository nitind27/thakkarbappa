import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

type CustomModalProps = {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (event: React.FormEvent) => void;
  title: string;
  formData: {
    label: string;
    value: string;
    placeholder: string;
    error: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  submitButtonLabel?: string;
};

const CustomModal: React.FC<CustomModalProps> = ({
  show,
  handleClose,
  handleSubmit,
  title,
  formData,
  submitButtonLabel = "Submit",
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formField">
            <Form.Label>{formData.label}</Form.Label>
            <Form.Control
              type="text"
              value={formData.value}
              onChange={formData.onChange}
              placeholder={formData.placeholder}
              isInvalid={!!formData.error}
            />
            {formData.error && (
              <div style={{ color: "red", marginTop: "0.25rem" }}>
                {formData.error}
              </div>
            )}
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-5">
            {submitButtonLabel}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
