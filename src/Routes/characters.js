import express from 'express';
import { characters } from '../helpers/data.js';
import { Characters } from '../class/Characters.js';
import { Store } from '../services/store.js';

export const router = express.Router();

const serviceFile = new Store();
const characterClass =  new Characters(serviceFile);


// getCharacters for pagination
router.get('/', (req, res) => {
    const { page, limit } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    if (isNaN(pageNum) || isNaN(limitNum)) {
        return res.status(400).json({ status: 400, message: 'Bad Request: page y limit deben ser números' });
    }

    const data = characterClass.getCharacters({ page: pageNum, limit: limitNum });

    if (data.error) {
        return res.status(404).json({ status: 404, message: data.error });
    }

    res.status(200).json(data);
});


// pagination


//createCharacter
router.post('/create', (req, res) => {
    const {nombre, calidad, clase, salud, ataque} = req.body;
    let message = null; 

    if (!nombre) message = 'Nombre es requerido';
    else if (!calidad) message = 'Calidad es requerida';
    else if (!clase) message = 'Clase es requerida';
    else if (isNaN(salud)) message = 'Salud debe ser un número';
    else if (isNaN(ataque)) message = 'Ataque debe ser un número';
    
    if(message) return res.status(400).json({ status: 400, message: message});
    const createCharacter = characterClass.createCharacter({nombre, calidad, clase, salud, ataque});
    if(!createCharacter) return res.status(404).json({status: 404, message: 'Alredy exist Character in database'});
    res.status(200).json(createCharacter);
});

//deleteCharacter
router.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    const deleteCharacter = characterClass.deleteCharacter(Number(id));
    if(!deleteCharacter) return res.status(404).json({ status: 400, message: 'Not delete character'});
    return res.status(200).json({message: 'ok'})
});