import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

type FormField = {
  label: string;
  value: string | number; // Allow number for population and ID
  placeholder: string;
  error?: string; // Optional error message
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type CustomModalProps = {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (event: React.FormEvent) => void;
  title: string;
  formData: {
    fields: FormField[]; // Array of form fields
    error?: string; // Optional error for the entire form
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
          {formData.fields.map((field, index) => (
            <Form.Group controlId={`formField${index}`} key={index}>
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type="text"
                value={field.value}
                onChange={field.onChange}
                placeholder={field.placeholder}
                isInvalid={!!field.error}
              />
              {field.error && (
                <div style={{ color: "red", marginTop: "0.25rem" }}>
                  {field.error}
                </div>
              )}
            </Form.Group>
          ))}
          {formData.error && (
            <div style={{ color: "red", marginTop: "0.25rem" }}>
              {formData.error}
            </div>
          )}
          <Button variant="primary" type="submit" className="mt-3">
            {submitButtonLabel}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;