export class Characters {
    characters = [];

    constructor(characters){
        this.characters = characters
    };

    
//paginacion
getCharacters({ page = 1, perPage = 5 }) {
    const totalCharacters = this.characters.length;
    const validPerPage = (perPage > 0) ? perPage : 5;
    const totalPages = Math.ceil(totalCharacters / validPerPage);

    const validPage = (page > 0 && page <= totalPages) ? page : 1;

    const startIndex = (validPage - 1) * validPerPage;
    const endIndex = startIndex + validPerPage;

    const characters_pagination = this.characters.slice(startIndex, endIndex);

    return {
        PaginaActual: validPage,
        NumTotalPaginas: totalPages,
        PersonajesPorPagina: validPerPage,
        TotalPersonajes: totalCharacters,
        data: characters_pagination
    };
}


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