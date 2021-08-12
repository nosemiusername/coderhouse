class PersonaDAO {

    constructor() {
        const list = [];
    }

    add(persona) {
        this.list.push(persona);
        return 0;
    }

    remove(id) {
        this.list.filter(persona => persona.id != id);
        return 0;
    }

    find(id) {
        return this.list.filter(persona => persona.id == id);
    }
}

export const Persona = new PersonaDAO();