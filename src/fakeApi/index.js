/* eslint-disable max-len */
/* eslint-disable no-console */
const fakeApi = {
  registration(data, users) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sameEmail = users.find((user) => user.email === data.email);
        if (sameEmail) {
          resolve({ isSameEmail: true });
        }
        resolve(data);
      }, 1000);
    });
  },
  login(data, users) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = users.find((user) => (
          (data.email === user.email) && (data.password === user.password)
        ));
        if (currentUser) {
          resolve({
            userId: currentUser.id,
            userEmail: currentUser.email,
          });
        } else {
          reject();
        }
      }, 1000);
    });
  },
  resetPassword(newPassword, currentUserId, users) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = users.find((user) => user.id === currentUserId);
        if (newPassword === currentUser.password) {
          reject(new Error('New password is the same as old password'));
        }
        const updatedUser = { ...currentUser };
        updatedUser.password = newPassword;
        resolve(updatedUser);
      }, 1000);
    });
  },
};

export default fakeApi;
