/* eslint-disable no-console */
const fakeApi = {
  registration(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  },
};

export default fakeApi;
