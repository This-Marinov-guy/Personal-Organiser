import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

interface InputProps {
  size?: number;
  as?: any;
  label?: string;
  id?: string;
  name?: string;
  type: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  errorMessage?: string;
  isValid?: any;
  isInvalid?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: any;
  onBlur?: any;
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
        as={props.as}
        name={props.name}
        type={props.type}
        value={props.value}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onInput={props.onInput}
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
