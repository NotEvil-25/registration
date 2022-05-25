async function postData(url, data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const request = await new Promise((resolve) => {
    // искуственная задержка c сервера
    setTimeout(() => {
      resolve(fetch(url, options));
    }, 2000);
  });
  const response = await request.json();
  return response;
}

export default postData;
