import React, { Fragment } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "../UI/Input";
import classes from "./AddProjectItem.module.css";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  image: yup.string().required(),
});

const AddProjectItem = () => {
  const submitHandler = () => {
    //header must include this for authorization of request {Authorixation: 'Bearer ' + auth.token}
  };

  return (
    <Fragment>
      <Formik
        validationSchema={schema}
        validateOnChange={false}
        onSubmit={submitHandler}
        initialValues={{
          title: "",
          description: "",
          image: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className={classes.form_display}
          >
            <Input
              label="Title"
              type="text"
              name="title"
              value={values.title}
              isValid={touched.title && !errors.title}
              isInvalid={!!errors.title}
              errorMessage={errors.title}
              onChange={handleChange}
            />
            <Input
              as="textarea"
              label="Description"
              type="text"
              name="description"
              value={values.description}
              isValid={touched.description && !errors.description}
              isInvalid={!!errors.description}
              errorMessage={errors.description}
              onChange={handleChange}
            />

            <Input
              label="Image"
              type="text"
              name="image"
              value={values.image}
              isValid={touched.image && !errors.image}
              isInvalid={!!errors.image}
              errorMessage={errors.image}
              onChange={handleChange}
            />
            <Button className={classes.form_btn} type="submit">
              Submit form
            </Button>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default AddProjectItem;
