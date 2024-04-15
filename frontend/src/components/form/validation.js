import * as Yup from "yup";

const regx = {
    name: /^[а-яА-Яa-zA-Z]{2,20}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/,
};

const firstName = Yup.string()
    .matches(regx.name, "Кириллица латинница от 2 до 20 знаков")
    .required("Введите имя");

const lastName = Yup.string()
    .matches(regx.name, "Кириллица латинница от 2 до 20 знаков")
    .required("Введите фамилию");

const surName = Yup.string()
    .matches(regx.name, "Кириллица латинница от 2 до 20 знаков")
    .required("Введите отчество");

const email = Yup.string()
    .matches(regx.email, "Формат example@mail.com")
    .required("Введите почту");


export const schemas = {
    custom: Yup.object().shape({
        firstName,
        lastName,
        surName,
        email,
    }),
};

export const initialValues = {
    firstName: "",
    lastName: "",
    surName: "",
    email: "",
};