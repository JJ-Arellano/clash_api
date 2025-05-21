export class Characters {
    characters = [];

    constructor(characters){
        this.characters = characters
    };

    getCharacters({limit, start}){
        const startPagination = (start === 0) ? 0 : start;
        const limitPagination =  (!isNaN(limit) && limit > 0) ? (start + limit) : (start + 5);
        const characters_pagination = this.characters.slice(startPagination, limitPagination);
        return characters_pagination;
    };

    findCharacterById(id){
        const findIndex = this.characters.findIndex(entry => entry.id === id);
        if(findIndex < 0) return;
        return this.characters[findIndex];  
    };
    
    findCharacterByName(name){ 
        const findIndex = this.characters.findIndex(entry => entry.nombre === String(name).trim());
        if(findIndex < 0) return;
        return this.characters[findIndex];  
    };

    createCharacter(character){
        const {nombre, calidad, clase, salud, ataque} = character;
        const characterFind = this.findCharacterByName(nombre);
        if(characterFind) return;
        const entity = {
            id: Number(this.characters.length + 1),
            nombre: String(nombre).trim(),
            calidad: String(calidad).trim(),
            clase: String(clase).trim(),
            salud: Number(salud),
            ataque: Number(ataque),
            createdAt: new Date()
        };
        this.characters.push(entity);
        return entity;
    }; 

    deleteCharacter(id){
        const characterFind = this.findCharacterById(id);
        if(!characterFind) return;  
        const newCharacters = this.characters.filter(entry => entry.id !== id);
        this.characters = newCharacters;
        return characterFind; 
    };
};