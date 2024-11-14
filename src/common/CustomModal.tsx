import React, { useState } from "react";
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
  disabledButton?: boolean;
  size?: any; // Size prop to determine grid layout
};

// Enhanced validation function with conditional logic
const validateForm = (fields: FormField[]) => {
  const errors: { [key: string]: string } = {};

  fields.forEach((field) => {
    // Required field validation
    if (!field.value) {
      errors[field.label] = `${field.label} is required`;
    }

    // Example of conditional validation
    if (field.label === "Enter Population" && typeof field.value === 'string') {
      const populationValue = parseInt(field.value, 10);
      if (isNaN(populationValue) || populationValue <= 0) {
        errors[field.label] = "Population must be a positive number";
      }
    }

    if (field.label === "Select Taluka" && field.value === "") {
      errors[field.label] = "Please select a taluka";
    }
  });

  return errors;
};

const CustomModal: React.FC<CustomModalProps> = ({
  show,
  handleClose,
  handleSubmit,
  title,
  formData,
  imagepriview,
  submitButtonLabel = "Submit",
  disabledButton = false,
  size,
}) => {

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validateForm(formData.fields);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // Stop submission if there are errors
    }

    handleSubmit(event);
    setFormErrors({});
  };

  // Determine grid classes based on size prop
  const gridClass = size ? 'col-6 col-md-4' : 'col-12';

  return (
    <Modal show={show} size={size}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {imagepriview}
        </span>
        <Form onSubmit={onSubmit}>
          <div className="row">
            {formData.fields.map((field, index) => (
              <div className={gridClass} key={index}>
                <Form.Group controlId={`formField${index}`}>
                  <Form.Label>{field.label}</Form.Label>

                  {field.type === "text" ? (
                    <Form.Control
                      type="text"
                      value={field.value as string}
                      onChange={field.onChange as any}
                      placeholder={field.placeholder}
                      isInvalid={!!formErrors[field.label]}
                    />
                  ) : field.type === "select" ? (
                    <Form.Control
                      as="select"
                      value={field.value as string}
                      onChange={field.onChange as any}
                      isInvalid={!!formErrors[field.label]}
                    >
                      <option value="" >
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
                        isInvalid={!!formErrors[field.label]}
                      />
                      {typeof field.value === "string" && (
                        <img
                          src={field.value}
                          alt="Image Preview"
                          style={{ maxWidth: "100px", marginTop: "10px" }}
                        />
                      )}
                    </>
                  ) : field.type === "date" ? (
                    <Flatpickr
                      value={field.value ? new Date(field.value as any) : ""}
                      onChange={(date) =>
                        field.onChange({
                          target: { value: date[0] },
                        } as any)
                      }
                      options={{
                        dateFormat: "Y-m-d",
                      }}
                      className="form-control"
                    />
                  ) : null}

                  {formErrors[field.label] && (
                    <div style={{ color: "red", marginTop: "0.25rem" }}>
                      {formErrors[field.label]}
                    </div>
                  )}
                </Form.Group>
              </div>
            ))}
          </div>

          {formData.error && (
            <div style={{ color: "red", marginTop: "0.25rem" }}>
              <ul style={{ paddingLeft: "1rem" }}>
                {formData.error.split("<br />").map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            disabled={disabledButton}
          >
            {submitButtonLabel}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;