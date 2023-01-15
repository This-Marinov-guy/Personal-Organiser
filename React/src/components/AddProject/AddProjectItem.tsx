import React, { Fragment, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "../UI/Input";
import ImageInput from "../UI/ImageInput";
import classes from "./AddProjectItem.module.css";
import { useHttpClient } from "src/hooks/http-hook";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import Loader from "../UI/Loader";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  image: yup.string().required(),
});

const AddProjectItem = (props: { setProjectId?: Function }) => {
  const { loading, sendRequest } = useHttpClient();

  const [isSubmitted, setisSubmitted] = useState(false);

  const user = useSelector(selectUser);

  return (
    <Fragment>
      <Formik
        validationSchema={schema}
        validateOnChange={false}
        onSubmit={async (values) => {
          try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("image", values.image);

            const responseData = await sendRequest(
              "http://localhost:5000/api/project/add-project",
              "POST",
              formData,
              { Authorization: "Bearer " + user.token }
            );
            props.setProjectId(responseData.projectId);
            setisSubmitted(true);
          } catch (err) {}
        }}
        initialValues={{
          title: "",
          description: "",
          image: "",
        }}
      >
        {({
          handleSubmit,
          setFieldValue,
          handleChange,
          values,
          touched,
          errors,
        }) => (
          <Form
            encType="multipart/form-data"
            noValidate
            onSubmit={handleSubmit}
            className={classes.form_display}
          >
            {isSubmitted ? (
              <i className={classes.icon + " fa-solid fa-check"}></i>
            ) : (
              <Fragment>
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
                {loading ? (
                  <Loader />
                ) : (
                  <Button className={classes.form_btn} type="submit">
                    Submit form
                  </Button>
                )}
              </Fragment>
            )}
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default AddProjectItem;
