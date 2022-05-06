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
    return new Promise((resolve) => {
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
          resolve({ incorrectInput: true });
        }
      }, 1000);
    });
  },
  resetPassword(password, currentUserId, users) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = users.find((user) => user.id === currentUserId);
        if (password.old !== currentUser.password) {
          const err = {
            typeErr: 'OLD_PASSWORD',
            message: 'Old password is wrong',
          };
          resolve(err);
          return;
        }
        if (password.new === currentUser.password) {
          const err = {
            typeErr: 'NEW_PASSWORD',
            message: 'New password is the same as old password',
          };
          resolve(err);
          return;
        }
        const updatedUser = { ...currentUser };
        updatedUser.password = password.new;
        resolve(updatedUser);
      }, 1000);
    });
  },
};

export default fakeApi;
