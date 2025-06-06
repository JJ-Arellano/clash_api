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
  console.log(`Listen app in port ${port}`)
});





// consumir api x
app.post('/getPostClashRoyale', async (req, res) => {
  try {
    const { token, query } = req.body;

    if (!token || !query) {
      return res.status(400).json({ error: 'Bad request, token and query are required' });
    }

    // URL con parámetros
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodedQuery}&max_results=10`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text(); // para ver el mensaje completo
      return res.status(response.status).json({ error: 'Error from Twitter API', details: errorText });
    }

    const data = await response.json();

    const mapperData = (data) => {
      return data;
    };

    const result = mapperData(data);

    res.status(200).json({ data: result });

  } catch (error) {
    console.error('Error en /getPostClashRoyale:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


 