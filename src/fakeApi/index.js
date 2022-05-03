/* eslint-disable max-len */
/* eslint-disable no-console */
const fakeApi = {
  registration(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  },
  login(data, users) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = users.filter((user) => (
          (data.email === user.email) && (data.password === user.password)
        ));
        if (currentUser.length) {
          resolve(currentUser[0].id);
        } else {
          reject();
        }
      }, 1000);
    });
  },
};

export default fakeApi;
