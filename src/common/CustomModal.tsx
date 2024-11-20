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
  type: "text" | "select" | "file" | "date" | "checkbox" | "email"; // Added email type
  options?: { value: string | number; label: string }[];
  className?: string; // Optional className property
  required?: boolean; // New property to indicate if field is required
  disabled?: boolean;
};

// Enhanced validation function with conditional logic
const validateForm = (fields: FormField[]) => {
  const errors: { [key: string]: string } = {};

  fields.forEach((field) => {
    // Check if field is required and validate accordingly
    if (field.required && !field.value) {
      errors[field.label] = `${field.label} is required`;
    }
    // Validate text fields for alphanumeric characters including Marathi and other languages
    if (field.type === "text" && typeof field.value === 'string') {
      // Regex for alphanumeric characters including Devanagari script
      const regex = /^[\p{L}\p{N}\u0900-\u097F]*$/u; // \u0900-\u097F covers the Devanagari Unicode range
      if (!regex.test(field.value)) {
        errors[field.label] = `${field.label} can only contain alphanumeric characters including Marathi.`;
      }
    }


    // Validate email format
    if (field.type === "email" && typeof field.value === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        errors[field.label] = `Please enter a valid email address`;
      }
    }

    // Example of conditional validation for population input
    if (field.label === "Enter Population" && typeof field.value === 'string') {
      const populationValue = parseInt(field.value, 10);
      if (isNaN(populationValue) || populationValue <= 0) {
        errors[field.label] = "Population must be a positive number";
      }
    }

    // Validate select box
    if (field.type === "select" && field.value === "") {
      errors[field.label] = "Please select an option";
    }

    // Validate file input (if required)
    if (field.type === "file" && field.required && !field.value) {
      errors[field.label] = `${field.label} is required`;
    }

    // Validate checkbox input (if required)
    if (field.type === "checkbox" && field.required && !(field.value as unknown as boolean)) {
      errors[field.label] = `${field.label} must be checked`;
    }
  });

  return errors;
};

const CustomModal: React.FC<any> = ({
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
  const gridClass = size ? 'col-6 col-md-3' : 'col-12';

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
            {formData.fields.map((field: any, index: any) => (
              <div className={field.className || gridClass} key={index}>
                <Form.Group controlId={`formField${index}`}>
                  <Form.Label>{field.label}</Form.Label>

                  {field.type === "text" ? (
                    <Form.Control
                      type="text"
                      value={field.value as string}
                      onChange={field.onChange as any}
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                      isInvalid={!!formErrors[field.label]}
                    />
                  ) : field.type === "email" ? (
                    <Form.Control
                      type="email"
                      value={field.value as string}
                      onChange={field.onChange as any}
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                      isInvalid={!!formErrors[field.label]}
                    />
                  ) : field.type === "select" ? (
                    <Form.Control
                      as="select"
                      value={field.value as string}
                      disabled={field.disabled}
                      onChange={field.onChange as any}
                      isInvalid={!!formErrors[field.label]}
                    >
                      <option value="">
                        {field.placeholder || "Select an option"}
                      </option>
                      {field.options?.map((option: any) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  ) : field.type === "file" ? (
                    <Form.Control
                      type="file"
                      onChange={(e: any) => {
                        if (e.target.files) {
                          field.onChange(e);
                        }
                      }}
                      isInvalid={!!formErrors[field.label]}
                    />
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
                        disabled={field.disabled}
                        className="form-control"
                      />
                  ) : field.type === "checkbox" ? (
                    <Form.Check
                      type="checkbox"
                      label={field.placeholder || field.label}
                      checked={!!(field.value as any)}
                      onChange={(e) =>
                        field.onChange({
                          target: { value: e.target.checked },
                        } as any)
                      }
                      isInvalid={!!formErrors[field.label]}
                    />
                  ) : null}

                  {/* Show error message only for required fields */}
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
                {formData.error.split("<br />").map((err: any, index: any) => (
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