import CurrentDateTime from './currentDate';
import axios from 'axios';


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

export default postData;