import express from 'express';
import {router} from './Routes/characters.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';


// Esto es para obtener correctamente la ruta actual del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Carga el archivo swagger.yml
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yml'));

const app = express();
const port = 3000;

app.use((req, res, next) => {
    express.json()(req, res, next);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




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
app.post('/api/ClashRoyale/Media', async (req, res) => {
  try {
    const { token, query } = req.body;

    if (!token || !query) {
      return res.status(400).json({ error: 'Bad request, token and query are required' });
    }

    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodedQuery}&max_results=10&expansions=author_id&user.fields=username,name`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: 'Error from Twitter API', details: errorText });
    }

    const data = await response.json();

    const usersMap = new Map();
    if (data.includes && data.includes.users) {
      for (const user of data.includes.users) {
        usersMap.set(user.id, user);
      }
    }

    const tweetsWithUser = data.data.map(tweet => {
      const user = usersMap.get(tweet.author_id);
      return {
        id: tweet.id,
        text: tweet.text,
        author: user ? user.username : null
      };
    });

    res.status(200).json(tweetsWithUser);

  } catch (error) {
    console.error('Error en /api/ClashRoyale/Media', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



 