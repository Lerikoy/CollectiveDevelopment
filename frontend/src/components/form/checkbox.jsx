import "./checkbox.css";
import { Field, ErrorMessage as Error } from "formik";


export const Checkbox = ( { id, label, name }) => {
    return(
        <div className="checkbox-container">
            <Field name="checkbox" type="checkbox" id={id} />
            <label htmlFor={id}>{label}</label>
            <Error name="checkbox">{(error) => <span> {error}</span>}</Error>
        </div>
    );
};
