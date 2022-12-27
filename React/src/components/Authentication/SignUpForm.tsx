import React, { Fragment } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useHttpClient } from "src/hooks/http-hook";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "../UI/Input";
import Row from "react-bootstrap/Row";
import { Heading } from "../UI/Heading";
import classes from "./Authentication.module.css";
import Loader from "../UI/Loader";
import ImageInput from "../UI/ImageInput";
import { useDispatch } from "react-redux";
import { login } from "src/redux/user";

const schema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  age: yup.number().positive().required(),
  image: yup.string().required("Please upload yuor picture"),
  email: yup.string().email("Please enter a valid email").required(),
  password: yup
    .string()
    .min(5)
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, {
      message: "Please create a stronger password",
    })
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
  terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
});

const SignUpForm = () => {
  const { loading, sendRequest } = useHttpClient();

  const dispatch = useDispatch();

  return (
    <Fragment>
      <Heading>Welcome new user</Heading>
      <Formik
        validationSchema={schema}
        validateOnChange={false}
        onSubmit={async (values) => {
          try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("surname", values.surname);
            formData.append("image", values.image);
            formData.append("age", values.age);
            formData.append("email", values.email);
            formData.append("password", values.password);
            console.log("data ", values);
            const responseData = await sendRequest(
              "http://localhost:5000/api/user/signup",
              "POST",
              formData
            );

            dispatch(
              login({
                userId: responseData.userId,
                token: responseData.token,
                expirationDate: new Date(new Date().getTime() + 10000).toISOString()
              })
            );
            console.log("responseData ", responseData);
          } catch (err) {}
        }}
        initialValues={{
          name: "",
          surname: "",
          image: "",
          age: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        }}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <Form
            encType="multipart/form-data"
            className={classes.authenticate_display}
            style={{ width: "60%" }}
            noValidate
            onSubmit={handleSubmit}
          >
            <ImageInput
              value={values.image}
              isValid={touched.image && !errors.image}
              isInvalid={!!errors.image}
              errorMessage={errors.image}
              onChange={(event) => {
                handleChange(event);
                setFieldValue("image", event.target.files[0]);
              }}
            />
            <Row className="mb-3">
              <Input
                size={4}
                label="Name"
                type="text"
                name="name"
                value={values.name}
                isValid={touched.name && !errors.name}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
                onChange={handleChange}
              />
              <Input
                size={4}
                label="Surname"
                type="text"
                name="surname"
                value={values.surname}
                isValid={touched.surname && !errors.surname}
                isInvalid={!!errors.surname}
                errorMessage={errors.surname}
                onChange={handleChange}
              />{" "}
              <Input
                size={4}
                label="Age"
                type="number"
                name="age"
                value={values.age}
                isValid={touched.age && !errors.age}
                isInvalid={!!errors.age}
                errorMessage={errors.age}
                onChange={handleChange}
              />
            </Row>
            <hr />
            <Input
              label="Email"
              type="email"
              name="email"
              value={values.email}
              isValid={touched.email && !errors.email}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={values.password}
              isValid={touched.password && !errors.password}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              onChange={handleChange}
            />
            <Form.Text
              style={{ marginBottom: "2rem" }}
              id="passwordHelpBlock"
              muted
            >
              Your password must be of 5 or more characters and contain a digit,
              a lower-case letter and an upper-case letter
            </Form.Text>
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              isValid={touched.confirmPassword && !errors.confirmPassword}
              isInvalid={!!errors.confirmPassword}
              errorMessage="Missmatch"
              onChange={handleChange}
            />
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik0"
            />
            <div className={classes.auth_btns}>
              {loading ? <Loader /> : <Button type="submit">Submit</Button>}
              <Button href="/login" type="submit" variant="outline-secondary">
                I'm a user
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default SignUpForm;
