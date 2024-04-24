import * as Yup from "yup";
import parse from "date-fns/parse";


const regx = {
    name: /^[а-яА-Яa-zA-Z]{2,20}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/,
    date_of_birth: /^([0-9]{2}).([0-9]{2}).([0-9]{4})$/,
    Phone: /^(\+7)[0-9]{10}$/,
    details: /^([\w\d\s]{2,20})|([\d\s\u0400-\u04FF]{2,20})$/,
};

const first_name = Yup.string()
    .matches(regx.name, "Кириллица латинница от 2 до 20 знаков")
    .required("Введите имя");

const last_name = Yup.string()
    .matches(regx.name, "Кириллица латинница от 2 до 20 знаков")
    .required("Введите фамилию");

const patronymic = Yup.string()
    .matches(regx.name, "Кириллица и латинница от 2 до 20 знаков")
    .nullable()
    // .required("Введите отчество");

const email = Yup.string()
    .matches(regx.email, "Формат example@mail.com")
    .required("Введите почту");

const date_of_birth = Yup.date()
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

const Phone = Yup.string()
    .matches(regx.Phone, "Формат +7XXXXXXXXXX")
    .required("Введите номер телефона");




const art = Yup.string()
    .matches(regx.details, "Кириллица или латинница от 2 до 20 знаков")
    .required("Введите имя персонажа");

const checkbox = Yup.boolean()
    .oneOf([true], "Это поле обязательно");

export const schemas = {
    custom: Yup.object().shape({
        first_name,
        last_name,
        patronymic,
        email,
        date_of_birth,
        Phone,
        checkbox,
        art,
        files: Yup.mixed()
            .required("Прикрепите файл")
            .test("is-file-too-big", "Файл превышает 10MB", (value) => {
                if (!value) return false; // Если файлы не выбраны, то не пройдет валидацию
                return Array.from(value).every((file) => file.size / 1024 / 1024 <= 10);
            })
            .test("is-file-of-correct-type", "Файл не поддерживается", (value) => {
                if (!value) return false; // Если файлы не выбраны, то не пройдет валидацию
                return Array.from(value).every((file) => {
                    const type = file.type.split("/")[1];
                    const validTypes = [
                        "zip", "xml", "xhtml+xml", "plain", "svg+xml", "rtf", "pdf", "jpeg",
                        "png", "jpg", "ogg", "json", "html", "gif", "csv"
                    ];
                    return validTypes.includes(type);
                });
            })

    }),
};

export const initialValues = {
    first_name: "",
    last_name: "",
    patronymic: "",
    email: "",
    date_of_birth: "",
    Phone: "+7",
    checkbox: false,
    art: "",
    files: [],
};