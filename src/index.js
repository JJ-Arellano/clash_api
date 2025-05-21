import express from 'express';
import {router} from './Routes/characters.js';

const app = express();
const port = 3000;




app.use((req, res, next) => {
    express.json()(req, res, next);
});




//type request 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

//Routes
app.use('/characters', router);

//Init Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
