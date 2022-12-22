import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoading, startLoading, stopLoading } from "src/redux/loading";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import Error from "./Error";
import Input from "./Input";
import classes from "./ImageInput.module.css";

interface ImageInputProps {
  id?: string;
  value?: any;
  defaultValue?: string;
  errorMessage?: string;
  isValid?: any;
  isInvalid?: any;
  onChange?: any;
}

const ImageInput = (props: ImageInputProps) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(true);

  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!file) {
      return;
    }
    dispatch(startLoading());
    const fileReader: any = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    dispatch(stopLoading());
  }, [file]);

  const inputHandler = (event) => {
    //set image
    let pickedFile;
    if (event.target.files || event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      return;
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className={classes.image_input_panel}>
      {!isValid && <Error errorMessage="Corrupted file, please try again" />}
      <div className={classes.image_preview}>
        {!previewUrl ? (
          <div className={classes.image_input_icon}>
            {loading ? <Loader /> : <i className="fa-solid fa-file-image"></i>}
          </div>
        ) : (
          <img className={classes.image} src={previewUrl} alt="Preview" />
        )}
      </div>
        <Input 
          label="Image"
          id="image"
          name="image"
          type="file"
          onInput={inputHandler}
          onChange={props.onChange}
          defaultValue={props.defaultValue}
          isValid={props.isValid}
          isInvalid={props.isInvalid}
          errorMessage={props.errorMessage}
          accept="image/*"
        />
    </div>
  );
};

export default ImageInput;
