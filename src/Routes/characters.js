import express from 'express';
import { characters } from '../helpers/data.js';
import { Characters } from '../class/Characters.js';

export const router = express.Router();

const characterClass =  new Characters(characters); 

// getCharacters for pagination

router.get('/', (req, res) => {
    const { page, limit } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    if (isNaN(pageNum) || isNaN(limitNum)) {
        return res.status(400).json({ status: 400, message: 'Bad Request: page y limit deben ser números' });
    }

    const data = characterClass.getCharacters({ page: pageNum, limit: limitNum });
    res.status(200).json(data);
});

// pagination


//createCharacter
router.post('/create', (req, res) => {
    const {nombre, calidad, clase, salud, ataque} = req.body;
    if(!nombre || !calidad || !clase || isNaN(salud) || isNaN(ataque)) return res.status(400).json({ status: 400, message: 'Bad Request'});
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