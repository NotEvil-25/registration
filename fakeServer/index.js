const path = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'), { foreginKeySuffix: 'id' });
const middlewares = jsonServer.defaults({ bodyParser: true });
const constants = require('./constants');

server.db = router.db;

server.use(jsonServer.bodyParser);

server.post('/registration', (req, res) => {
  const { db } = req.app;
  const { password, email } = req.body;
  const isSameMail = db.get('users').find({ email }).value();

  res.setHeader('Access-Control-Allow-Origin', '*');
  // ебаные условия какие то, нужно сократить
  if (isSameMail) {
    return res.status(200).jsonp({
      error: true,
      success: false,
      message: 'Email is already exists',
    });
  }
  if (!email) {
    return res.status(400).jsonp({
      error: true,
      success: false,
      message: 'Email is empty',
    });
  }
  if (!email.match(constants.correctEmail)) {
    return res.status(400).jsonp({
      error: true,
      success: false,
      message: 'Incorrect email',
    });
  }
  if (!password) {
    return res.status(400).jsonp({
      error: true,
      success: false,
      message: 'Password is empty',
    });
  }
  if (!password.match(constants.correctPassword)) {
    return res.status(400).jsonp({
      error: true,
      success: false,
      message: 'Incorrec password',
    });
  }

  const dbCopy = JSON.parse(JSON.stringify(db));
  const userId = dbCopy.users.length + 1;

  req.body.id = userId;

  db.get('users').push(req.body).write();
  return res.status(200).jsonp({
    error: false,
    success: true,
    message: 'Registration is successed',
  });
});

server.post('/login', (req, res) => {
  const { db } = req.app;
  const { password, email } = req.body;

  const isCorrectData = db.get('users').find({ email, password }).value();

  if (isCorrectData) {
    return res.status(200).jsonp({ successMessage: 'Login is successed' });
  }
  return res.status(400).jsonp({ errorMessage: 'Email or password arent correct' });
});

server.use(middlewares);

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running\nhttp://localhost:3001/');
});
