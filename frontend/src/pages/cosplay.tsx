import Header from "../components/header";
import styles from "./cosplay.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { initialValues, schemas } from "../components/form/validationCosplay.js";
import { Input } from "../components/form/input";
import { Button } from "../components/form/button";
import { Checkbox } from "../components/form/checkbox";
import CurrentDateTime from '../components/form/currentDate';
import axios from "axios";

export const Cosplay = () => {
    async function postData() {
        try {
          const data = {
            user: {
              email: {},
              first_name: {},
              last_name: {},
              patronymic: {},
              Phone: {},
              reqistered_time: <CurrentDateTime />,
              date_of_birth: {},
              consent_to_processing: true
            },
            cosplay: {
              fandom: {},
              name_character: {}
            }
          };
      
          const response = await axios.post('http://localhost:8000', data);
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
                onSubmit={() => postData()}  //отправка на сервер
            >
                <Form >
                    <div className={styles.section}>
                        <div className={styles.numberParent}>
                            <div className={styles.circle} />
                            <div className={styles.num}>{`1 `}</div>
                        </div>
                        <div className={styles.sectionText}>Личные данные</div>
                        <div className={styles.line} />
                        <div className={styles.numberParent}>
                            <div className={styles.circle} />
                            <div className={styles.num}>2</div>
                        </div>
                        <div className={styles.sectionText}>Детали косплея</div>
                        <div className={styles.line} />
                        <div className={styles.numberParent}>
                            <div className={styles.circle} />
                            <div className={styles.num}>3</div>
                        </div>
                        <div className={styles.sectionText}>Согласие на обработку</div>
                    </div>

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
                            placeholder = "ДД.ММ.ГГГГ"
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

                    <div className={styles.section}>
                        <div className={styles.numberParent}>
                            <div className={styles.circle} />
                            <div className={styles.num}>{`1 `}</div>
                        </div>
                        <div className={styles.sectionText}>Личные данные</div>
                        <div className={styles.line} />
                        <div className={styles.numberParent}>
                            <div className={styles.circle} />
                            <div className={styles.num}>2</div>
                        </div>
                        <div className={styles.sectionText}>Детали косплея</div>
                        <div className={styles.line} />
                        <div className={styles.numberParent}>
                            <div className={styles.circle} />
                            <div className={styles.num}>3</div>
                        </div>
                        <div className={styles.sectionText}>Согласие на обработку</div>
                    </div>

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

                    <div className={styles.section}>
                        <div className={styles.numberParent}>
                            <div className={styles.circle} />
                            <div className={styles.num}>{`1 `}</div>
                        </div>
                        <div className={styles.sectionText}>Личные данные</div>
                        <div className={styles.line} />
                        <div className={styles.numberParent}>
                            <div className={styles.circle} />
                            <div className={styles.num}>2</div>
                        </div>
                        <div className={styles.sectionText}>Детали косплея</div>
                        <div className={styles.line} />
                        <div className={styles.numberParent}>
                            <div className={styles.circle} />
                            <div className={styles.num}>3</div>
                        </div>
                        <div className={styles.sectionText}>Согласие на обработку</div>
                    </div>

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