/* eslint-disable no-console */
const fakeApi = {
  registration(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        resolve();
      }, 1000);
    });
  },
};

export default fakeApi;
