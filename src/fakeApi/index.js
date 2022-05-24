import postData from '../helpers/requests';

const mainUrl = 'http://localhost:3001/';

const endPoint = {
  registration: 'registration/',
  login: 'login/',
};

const fakeApi = {
  async registration(newUser) {
    const url = mainUrl + endPoint.registration;
    const response = await postData(url, newUser);
    return response;
  },
  async login(data) {
    const url = mainUrl + endPoint.login;
    const response = await postData(url, data);
    return response;
  },
};

export default fakeApi;
