import * as dotenv from 'dotenv'
import path from 'path';
import cors from 'cors';
// env config
dotenv.config()

// database connection
require('./config/db').connect();

// express server
import express from 'express'
// routes
import routes from './routes/routes';

// cookie parser
import cookieParser from 'cookie-parser';

// jwt
import { expressjwt } from "express-jwt";

const app = express();
// default appp port
const PORT = process.env.PORT


// middlewares
app.use(cookieParser())
// app.use(
//   expressjwt({
//     secret: process.env.JWT_SECRET || 'heintayzarhm',
//     getToken: req => req.cookies.token,
//     algorithms: ["HS256"]
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Header", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
if (process.env.NODE_ENV === 'development') {
  let cors = require('cors');
  var corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions));
  console.log("CORS enabled on", process.env.FRONTEND_URL );
}
// routing
app.use("/api/v1/", routes);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
// server
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}/api/v1/`);
});
