import * as Yup from "yup";
import parse from "date-fns/parse";


const regx = {
    name: /^[а-яА-Яa-zA-Z]{2,20}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/,
    birthDate: /^([0-9]{2}).([0-9]{2}).([0-9]{4})$/,
    phone: /^(\+7)[0-9]{10}$/,
    details: /^([\w\d\s]{2,20})|([\d\s\u0400-\u04FF]{2,20})$/,
};

const firstName = Yup.string()
    .matches(regx.name, "Кириллица латинница от 2 до 20 знаков")
    .required("Введите имя");

const lastName = Yup.string()
    .matches(regx.name, "Кириллица латинница от 2 до 20 знаков")
    .required("Введите фамилию");

const surName = Yup.string()
    .matches(regx.name, "Кириллица и латинница от 2 до 20 знаков")
    .nullable()
    // .required();

const email = Yup.string()
    .matches(regx.email, "Формат example@mail.com")
    .required("Введите почту");

const birthDate = Yup.date()
    .transform(function (value, originalValue) {
        if (this.isType(value)) {
        return value;
        }
        const result = parse(originalValue, "dd.MM.yyyy", new Date());
        return result;
    })
    .typeError("Формат ДД.ММ.ГГГГ")
    .required("Введите дату рождения")
    .max("2006-08-13", "К участию допускаются лица страрше 18 лет");

const phone = Yup.string()
    .matches(regx.phone, "Формат +7XXXXXXXXXX")
    .required("Введите номер телефона");


const fandom = Yup.string()
    .matches(regx.details, "Кириллица или латинница от 2 до 20 знаков")
    .required("Введите фандом");

const character = Yup.string()
    .matches(regx.details, "Кириллица или латинница от 2 до 20 знаков")
    .required("Введите имя персонажа");

const checkbox = Yup.boolean()
    .oneOf([true], "Это поле обязательно");



export const schemas = {
    custom: Yup.object().shape({
        firstName,
        lastName,
        surName,
        email,
        birthDate,
        phone,
        fandom,
        character,
        checkbox,
    }),
};

export const initialValues = {
    firstName: "",
    lastName: "",
    surName: "",
    email: "",
    birthDate: "",
    phone: "+7",
    fandom: "",
    character: "",
    checkbox: false,
};