export class Characters {
    serviceFile;

    constructor(serviceFile){
        this.serviceFile = serviceFile;
    };

    
    //paginacion
    getCharacters({ page = 1, limit = 5 }) {

        const characters = this.serviceFile.getCharacterAll();
        const totalCharacters = characters.length;
        const validLimit = (limit > 0) ? limit : 5;
        const totalPages = Math.ceil(totalCharacters / validLimit);

        if (page > totalPages) {
            return {
                error: `La página solicitada (${page}) excede el número total de páginas (${totalPages}).`,
                PaginaActual: totalPages,
                NumTotalPaginas: totalPages,
                PersonajesPorPagina: validLimit,
                TotalPersonajes: totalCharacters,
                data: []
            };
        }

        const validPage = (page > 0) ? page : 1;

        const startIndex = (validPage - 1) * validLimit;
        const endIndex = startIndex + validLimit;

        const characters_pagination = characters.slice(startIndex, endIndex);

        return {
            PaginaActual: validPage,
            NumTotalPaginas: totalPages,
            PersonajesPorPagina: validLimit,
            TotalPersonajes: totalCharacters,
            data: characters_pagination
        };
    }; 

    findCharacterById(id){
        const findCharacter = this.serviceFile.getCharacterById(id);
        if(!findCharacter) return;
        return findCharacter;  
    };
    
    findCharacterByName(name){ 
        const findCharacter = this.serviceFile.getCharacterByName(name);
        if(!findCharacter) return;
        return findCharacter;
    };

    createCharacter(character){
        const characters = this.serviceFile.getCharacterAll();
        const {nombre, calidad, clase, salud, ataque} = character;
        const characterFind = this.findCharacterByName(nombre);
        if(characterFind) return;
        const entity = {
            id: (characters.length) ? characters[characters.length - 1].id + 1 : 1,
            nombre: String(nombre).trim(),
            calidad: String(calidad).trim(),
            clase: String(clase).trim(),
            salud: Number(salud),
            ataque: Number(ataque),
            createdAt: new Date()
        };
        this.serviceFile.create(entity);
        return entity;
    }; 

    deleteCharacter(id){
        const characterFind = this.serviceFile.delete(id);
        if(!characterFind) return;  
        return characterFind; 
    };
};