import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

interface InputProps {
  autoComplete?: string;
  size?: number;
  as?: any;
  label?: string;
  id?: string;
  name?: string;
  type: string;
  min?: string;
  max?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  errorMessage?: string;
  isValid?: boolean;
  isInvalid?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  accept?: string;
}

const Input = (props: InputProps) => {
  return (
    //size grants the input the ability to fit in a <Row/> with other inputs
    <Form.Group
      as={!!props.size ? Col : undefined}
      md={props.size}
      className="mb-3"
    >
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        autoComplete={props.autoComplete}
        as={props.as}
        name={props.name}
        type={props.type}
        min={props.min}
        max={props.max}
        value={props.value}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onInput={props.onInput}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        isValid={props.isValid}
        isInvalid={props.isInvalid}
        accept={props.accept}
      />
      <Form.Control.Feedback type="invalid">
        {props.errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default Input;
