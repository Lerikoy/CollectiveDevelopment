import "./fileUpload.module.css";
import { Field, useField, ErrorMessage as Error } from "formik";


export const FileUpload = ({ fileRef }) => {
  const [field, , helpers] = useField({ name: 'files', type: 'file' });

    const handleChange = (event) => {
        helpers.setValue(event.currentTarget.files);
    };  
  return (
      <div>
        <label htmlFor="files">Выберите файл</label>{" "}
            <input id="files"
                name="files"
                type="file"
                onChange={handleChange}
                multiple
              />
            <Error name="files">{(error) => <span> {error}</span>}</Error>

      </div>
    );
  };