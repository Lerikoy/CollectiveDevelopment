import Header from "../components/header";
import styles from "./cosplay.module.css";

import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";
import { initialValues, schemas } from "../components/form/validationCosplay.js";
import { Input } from "../components/form/input";
import { Button } from "../components/form/button";
import { Checkbox } from "../components/form/checkbox";
import  Section1  from "../components/section1";
import  Section2  from "../components/section2";
import  Section3  from "../components/section3";
import axios from "axios";

export const Cosplay = () => {
    const postData = async (values: FormikValues) => {
        try {
          const data = {
            user: {
              email: values.email,
              first_name: values.first_name,
              last_name: values.last_name,
              patronymic: values.patronymic,
              Phone: values.Phone,
              reqistered_time: new Date(),
              date_of_birth: values.date_of_birth,
              consent_to_processing: true
            },
            cosplay: {
              fandom: values.fandom,
              name_character: values.name_character
            }
          };
      
          const response = await axios.post('http://10.131.0.30:2112/cosplay', data);
          console.log(response.data);
          window.location.href = '/';
        } catch (error) {
          console.error(error);
        }
      }
      
    return(
        <div className={styles.div}>
            <Header/>
            <div className={styles.title}>
                <b className={styles.b1}>ФОРМА РЕГИСТРАЦИИ НА КОНКУРС КОСПЛЕЯ</b>
                <p>Заполните все обязательные поля для подачи заявки на участие</p>
            </div>
   
            <Formik
                initialValues={initialValues} 
                validationSchema={schemas.custom}
                onSubmit={(values) => postData(values)}  //отправка на сервер
            >
                <Form >
                    
                    <Section1 />

                    <div className={styles.formPersonalData}>
                        <Input
                            label = "Фамилия"
                            name = "last_name"
                            id = "last_name"
                            placeholder = "Введите фамилию"
                        />
                        <Input
                            label = "Имя"
                            name = "first_name"
                            id = "first_name"
                            placeholder = "Введите имя"
                        />
                        <Input
                            label = "Отчество"
                            name = "patronymic"
                            id = "patronymic"
                            placeholder = "Введите отчество"
                        />
                        <Input
                            label = "Дата рождения"
                            name = "date_of_birth"
                            id = "date_of_birth"
                            placeholder = "ГГГГ-ММ-ДД"
                        />
                        <Input
                            label = "Электронная почта"
                            name = "email"
                            id = "email"
                            placeholder = "Введите email"
                        />
                        <Input
                            label = "Номер телефона"
                            name = "Phone"
                            id = "Phone"
                            placeholder = "Введите номер телефона"
                        />
                    </div>

                    <Section2 />
                

                    <div className={styles.formDetails}>
                        <Input
                            label = "Фэндом"
                            name = "fandom"
                            id = "fandom"
                            placeholder= "Укажите фэндом"
                        />
                        <Input
                            label = "Имя персонажа"
                            name = "name_character"
                            id = "name_character"
                            placeholder= "Укажите имя персонажа"
                        />
                    </div>

                    <Section3 />

                    <Checkbox
                        id="consent_to_processing"
                        label="Я даю согласие на обработку персональных данных и принимаю положение конкурса YKT GEEK FEST"
                        name="consent_to_processing"
                        ></Checkbox>

                    <Button>Подать заявку</Button>
                </Form>
            </Formik>
        

        </div>
    );


    
};

export default Cosplay;