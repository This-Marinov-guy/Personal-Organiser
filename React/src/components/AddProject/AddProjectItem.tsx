import React, { Fragment, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useHttpClient } from "src/hooks/http-hook";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/user";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "../UI/Input";
import ImageInput from "../UI/ImageInput";
import Loader from "../UI/Loader";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import classes from "./AddProjectItem.module.css";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  image: yup.string().required(),
});

const AddProjectItem = (props: {
  setProjectId?: Function;
  setFormSubmitted?: Function;
  formSubmitted?: {
    projectForm: boolean;
    taskForm: boolean;
    participantForm: boolean;
  };
}) => {
  const { loading, sendRequest } = useHttpClient();

  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState<boolean>(false);

  const user = useSelector(selectUser);

  return (
    <Fragment>
      <Formik
        validationSchema={schema}
        validateOnChange={false}
        onSubmit={async (values: {
          title: string;
          description: string;
          image: string;
        }) => {
          try {
            const formData = new FormData();
            formData.append("creator", user.userId);
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("image", values.image);

            const responseData = await sendRequest(
              "http://localhost:5000/api/projects/add-project",
              "POST",
              formData,
              { Authorization: "Bearer " + user.token }
            );
            props.setProjectId(responseData.projectId);
            props.setFormSubmitted(
              (prevState: {
                projectForm: boolean;
                taskForm: boolean;
                participantForm: boolean;
              }) => {
                return { ...prevState, projectForm: true };
              }
            );
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
            {props.formSubmitted.projectForm ? (
              <i className={classes.icon + " fa-solid fa-check"}></i>
            ) : (
              <Fragment>
                <ImageInput
                  value={values.image}
                  isValid={touched.image && !errors.image}
                  isInvalid={!!errors.image}
                  errorMessage={errors.image}
                  onChange={(event) => {
                    setShowPopover(true);
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
                  onChange={(event) => {
                    setShowPopover(true);
                    handleChange(event);
                  }}
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
                  onChange={(event) => {
                    setShowPopover(true);
                    handleChange(event);
                  }}
                />
                {loading && isButtonClicked ? (
                  <Loader />
                ) : (
                  <OverlayTrigger
                    show={showPopover}
                    placement={"bottom"}
                    overlay={
                      <Popover id={"popover-positioned-top"}>
                        <Popover.Header as="h3">
                          {"Before Proceeding"}
                        </Popover.Header>
                        <Popover.Body>
                          Be aware that once submitted a project cannot be
                          edited - only its tasks and participants! This is to
                          avoid confusion among participants
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <Button
                      className={classes.form_btn}
                      type="submit"
                      onClick={() => {
                        setShowPopover(false);
                      }}
                    >
                      Submit form
                    </Button>
                  </OverlayTrigger>
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
