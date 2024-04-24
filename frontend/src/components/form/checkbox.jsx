import "./checkbox.css";
import { Field, ErrorMessage as Error } from "formik";


export const Checkbox = ( { id, label, name }) => {
    return(
        <div className="checkbox-container">
            <Field name="consent_to_processing" type="checkbox" id={id} />
            <label htmlFor={id}>{label}</label>
            <Error name="consent_to_processing">{(error) => <span> {error}</span>}</Error>
        </div>
    );
};
