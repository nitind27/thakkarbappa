import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Adjust the theme based on your preference

type FormField = {
  label: string;
  value: string | number | File | null;
  placeholder?: string;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type: "text" | "select" | "file" | "date";
  options?: { value: string | number; label: string }[];
};

type CustomModalProps = {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (event: React.FormEvent) => void;
  title: string;
  imagepriview?: any;
  formData: {
    fields: FormField[];
    error?: string;
  };
  submitButtonLabel?: string;
};

const CustomModal: React.FC<CustomModalProps> = ({
  show,
  handleClose,
  handleSubmit,
  title,
  formData,
  imagepriview,
  submitButtonLabel = "Submit",
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {imagepriview}
        </span>
        <Form onSubmit={handleSubmit}>
          {formData.fields.map((field, index) => (
            <Form.Group controlId={`formField${index}`} key={index}>
              <Form.Label>{field.label}</Form.Label>

              {field.type === "text" ? (
                <Form.Control
                  type="text"
                  value={field.value as string}
                  onChange={field.onChange as any}
                  placeholder={field.placeholder}
                  isInvalid={!!field.error}
                />
              ) : field.type === "select" ? (
                <Form.Control
                  as="select"
                  value={field.value as string}
                  onChange={field.onChange as any}
                  isInvalid={!!field.error}
                >
                  <option value="" disabled>
                    {field.placeholder || "Select an option"}
                  </option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              ) : field.type === "file" ? (
                <>
                  <Form.Control
                    type="file"
                    onChange={(e: any) => {
                      if (e.target.files) {
                        field.onChange(e);
                      }
                    }}
                    isInvalid={!!field.error}
                  />
                  {/* Image preview logic */}
                  {field.value && typeof field.value === "string" && (
                    <img
                      src={field.value}
                      alt="Image Preview"
                      style={{ maxWidth: "100px", marginTop: "10px" }}
                    />
                  )}
                </>
              ) : field.type === "date" ? (
                <Flatpickr
               value={field.value ? new Date(field.value as any) : ''} // Assuming the value is a date string
                  onChange={(date) =>
                    field.onChange({
                      target: { value: date[0] }, // Convert Flatpickr's array format to a single value
                    } as any)
                  }
                  options={{
                    dateFormat: "Y-m-d", // Adjust the format based on your needs
                  }}
                  className="form-control"
                />
              ) : null}

              {field.error && (
                <div style={{ color: "red", marginTop: "0.25rem" }}>
                  {field.error}
                </div>
              )}
            </Form.Group>
          ))}

          {formData.error && (
            <div style={{ color: "red", marginTop: "0.25rem" }}>
              <ul style={{ paddingLeft: "1rem" }}>
                {formData.error.split("<br />").map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
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
