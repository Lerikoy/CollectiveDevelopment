import { FunctionComponent, useCallback, useRef } from "react";
import Header from "../components/header";
import styles from "./cosplay.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { initialValues, schemas } from "../components/form/validationArt.js";
import { Input } from "../components/form/input";
import { FileUpload } from "../components/form/fileUpload";
import { Button } from "../components/form/button";
import { Checkbox } from "../components/form/checkbox";

export const Art = () => {
    const fileRef = useRef(null);
    return(
        <div className={styles.div}>
            <Header/>
            <div className={styles.title}>
                <b className={styles.b1}>ФОРМА РЕГИСТРАЦИИ НА КОНКУРС РИСУНКОВ</b>
                <p>Заполните все обязательные поля для подачи заявки на участие</p>
            </div>
   
            <Formik
                initialValues={initialValues} 
                validationSchema={schemas.custom}
                onSubmit={() => console.log("Success")} //отправка на сервер
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
                            name = "lastName"
                            id = "lastName"
                            placeholder = "Введите фамилию"
                        />
                        <Input
                            label = "Имя"
                            name = "firstName"
                            id = "firstName"
                            placeholder = "Введите имя"
                        />
                        <Input
                            label = "Отчество"
                            name = "surName"
                            id = "surName"
                            placeholder = "Введите отчество"
                        />
                        <Input
                            label = "Дата рождения"
                            name = "birthDate"
                            id = "birthDate"
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
                            name = "phone"
                            id = "phone"
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
                            label = "Название сочинения"
                            name = "write"
                            id = "write"
                            placeholder= "Укажите название сочинения"
                        />
                        <FileUpload
                            fileRef={fileRef}
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
                        id="checkbox"
                        label="Я даю согласие на обработку персональных данных и принимаю положение конкурса YKT GEEK FEST"
                        name="checkbox"
                        ></Checkbox>

                    <Button>Подать заявку</Button>
                </Form>
                    
            </Formik>
        

        </div>
    );
    
};

export default Art;