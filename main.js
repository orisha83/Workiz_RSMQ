  var cors = require('cors')

  let express = require('express');
  let app = express();

  const msgRouter = require('./Routers/msgRouter')

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api',msgRouter)

  app.use(cors())

  app.use(function(req, res, next) {
    res.header('Content-Type', "application/json");
    res.removeHeader("X-Powered-By");
    next();
  });

  //redis-cli
  let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);


