import { FunctionComponent, useCallback } from "react";
import Header from "../components/header";
import styles from "./cosplay.module.css";
// import CustomForm from "../components/form/form";

import { Formik, Form } from "formik";
import { initialValues, schemas } from "../components/form/validation.js";
import { Input } from "../components/form/input";


export const Cosplay = () => {
    return(
        <div className={styles.div}>
            <Header/>
            <div className={styles.lineParent}>
                <div className={styles.lineChild} />
                <div className={styles.lineChild} />
                <div className={styles.lineChild} />
                <div className={styles.lineChild} />
                <div className={styles.lineChild} />
                <div className={styles.lineChild} />
                <div className={styles.lineChild} />
                <div className={styles.lineChild} />
                <div className={styles.lineChild} />
                <div className={styles.lineChild} />
                <div className={styles.lineChild} />
            </div>
            {/* <CustomForm /> */}
            <Formik
                initialValues={initialValues}
                validationSchema={schemas.custom}
                onSubmit={() => console.log("Success")} //отправка на сервер
            >
            <Form className={styles.form}>
                <Input
                    label = "Имя"
                    name = "firstName"
                    id = "firstName"
                    placeholder = "Введите имя"
                />
                <Input
                    label = "Фамилия"
                    name = "lastName"
                    id = "lastName"
                    placeholder = "Введите фамилию"
                />
                <Input
                    label = "Отчество"
                    name = "surName"
                    id = "surName"
                    placeholder = "Введите отчество"
                />
            </Form>
            </Formik>
        </div>
    );
    
};

export default Cosplay;