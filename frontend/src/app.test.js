import { schemas } from './components/form/validationCosplay';

describe('Validation tests for custom schema', () => {
it('validates first name correctly', async () => {
    await expect(schemas.custom.validate({
        first_name: 'Иван'
    })).resolves.toEqual({ first_name: 'Иван' });

    await expect(schemas.custom.validate({
        first_name: '1'
    })).rejects.toThrow("Кириллица латинница от 2 до 20 знаков");
    });

  it('validates last name correctly', async () => {
    await expect(schemas.custom.validateAt('last_name', {
      last_name: 'Смирнов'
    })).resolves.toEqual({ last_name: 'Смирнов' });

    await expect(schemas.custom.validateAt('last_name', {
      last_name: ''
    })).rejects.toThrow("Введите фамилию");
  });

  it('validates patronymic correctly', async () => {
    await expect(schemas.custom.validateAt('patronymic', {
      patronymic: 'Петрович'
    })).resolves.toEqual({ patronymic: 'Петрович' });

    await expect(schemas.custom.validateAt('patronymic', {
      patronymic: ''
    })).rejects.toThrow("Введите отчество");
  });

  it('validates email correctly', async () => {
    await expect(schemas.custom.validateAt('email', {
      email: 'example@mail.com'
    })).resolves.toEqual({ email: 'example@mail.com' });

    await expect(schemas.custom.validateAt('email', {
      email: 'not-an-email'
    })).rejects.toThrow("Формат example@mail.com");
  });

  it('validates date of birth correctly', async () => {
    await expect(schemas.custom.validateAt('date_of_birth', {
      date_of_birth: '1990-01-01'
    })).resolves.toEqual({ date_of_birth: '1990-01-01' });

    await expect(schemas.custom.validateAt('date_of_birth', {
      date_of_birth: '2020-01-01'
    })).rejects.toThrow("К участию допускаются лица старше 18 лет");
  });

  it('validates phone number correctly', async () => {
    await expect(schemas.custom.validateAt('Phone', {
      Phone: '+71234567890'
    })).resolves.toEqual({ Phone: '+71234567890' });

    await expect(schemas.custom.validateAt('Phone', {
      Phone: '123'
    })).rejects.toThrow("Формат +7XXXXXXXXXX");
  });

  it('validates fandom correctly', async () => {
    await expect(schemas.custom.validateAt('fandom', {
      fandom: 'Фэнтези'
    })).resolves.toEqual({ fandom: 'Фэнтези' });

    await expect(schemas.custom.validateAt('fandom', {
      fandom: 'a'
    })).rejects.toThrow("Кириллица или латинница от 2 до 20 знаков");
  });

  it('validates character name correctly', async () => {
    await expect(schemas.custom.validateAt('name_character', {
      name_character: 'Геральт'
    })).resolves.toEqual({ name_character: 'Геральт' });

    await expect(schemas.custom.validateAt('name_character', {
      name_character: ''
    })).rejects.toThrow("Введите имя персонажа");
  });

  it('validates consent to processing correctly', async () => {
    await expect(schemas.custom.validateAt('consent_to_processing', {
      consent_to_processing: true
    })).resolves.toEqual({ consent_to_processing: true });

    await expect(schemas.custom.validateAt('consent_to_processing', {
      consent_to_processing: false
    })).rejects.toThrow("Это поле обязательно");
  });
});
