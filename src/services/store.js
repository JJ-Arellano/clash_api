import fs from 'fs'; 

export class Store {
  path = 'character.json';

  initFile() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, '[]');
    };
  };

  readFile() {
    this.initFile();
    const data = fs.readFileSync(this.path, 'utf-8');
    return (data) 
        ? JSON.parse(data) 
        : [];
  };

  writeFile(data) {
    fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
  };

  create(characterData) {
    this.initFile();
    const characters = this.readFile();
    
    const newCharacter = {
      id: (characters.length) ? characters[characters.length - 1].id + 1 : 1,
      ...characterData,
      fechaCreacion: new Date()
    };

    characters.push(newCharacter);
    this.writeFile(characters);
    return newCharacter;
  }; 

  delete(id) {
    this.initFile();
    const characters = this.readFile();
    const filtered = characters.filter((c) => c.id !== id);
    const character = characters.find((c) => c.id !== id)

    if (characters.length === filtered.length) return null;

    this.writeFile(filtered);
    return character;
  };

  getCharacterAll() {
    return this.readFile();
  };

  getCharacterById(id) {
    if (!id || isNaN(id)) return null;

    const characters = this.readFile();
    const found = characters.find((c) => c.id === id);

    if (!found) return null; 
    return found;
  };

  getCharacterByName(nombre) {
    if (!nombre || typeof nombre !== 'string') return null;

    const characters = this.readFile();
    const found = characters.find((c) => c.nombre.toLowerCase() === nombre.toLowerCase());

    if (!found) return null;
    return found;
   }



}
