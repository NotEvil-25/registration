const mainUrl = 'http://localhost:3001/';

const endPoint = {
  registration: 'registration/',
};

const fakeApi = {
  async registration(newUser) {
    const url = mainUrl + endPoint.registration;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    };
    // искуственная задержка c сервера
    const data = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(fetch(url, options));
      }, 2000);
    });
    const response = await data.json();
    return response;
  },
  // login(data, users) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       const currentUser = users.find((user) => (
  //         (data.email === user.email) && (data.password === user.password)
  //       ));
  //       if (currentUser) {
  //         resolve({
  //           userId: currentUser.id,
  //           userEmail: currentUser.email,
  //         });
  //       } else {
  //         resolve({ incorrectInput: true });
  //       }
  //     }, 1000);
  //   });
  // },
  // resetPassword(password, currentUserId, users) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       const currentUser = users.find((user) => user.id === currentUserId);
  //       if (password.old !== currentUser.password) {
  //         const err = {
  //           typeErr: 'OLD_PASSWORD',
  //           message: 'Old password is wrong',
  //         };
  //         resolve(err);
  //         return;
  //       }
  //       if (password.new === currentUser.password) {
  //         const err = {
  //           typeErr: 'NEW_PASSWORD',
  //           message: 'New password is the same as old password',
  //         };
  //         resolve(err);
  //         return;
  //       }
  //       const updatedUser = { ...currentUser };
  //       updatedUser.password = password.new;
  //       resolve(updatedUser);
  //     }, 1000);
  //   });
  // },
};

export default fakeApi;
