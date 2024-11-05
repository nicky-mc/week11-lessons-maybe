class CharacterService {
    constructor(db) {
      this.db = db;
    }
  
    async getCharacters() {
      const { rows } = await this.db.query("SELECT * FROM Character");
      return rows;
    }
  
    async getCharacterById(id) {
      const { rows } = await this.db.query("SELECT * FROM Character WHERE id = $1", [id]);
      return rows[0] || null;
    }
  
    async createCharacter(characterData) {
      const { name, class: charClass, level, race, alignment, pointAllocation, feats, spells } = characterData;
      
      // Insert into Stat table
      const statQuery = `
        INSERT INTO Stat (strength, dexterity, constitution, intelligence, wisdom, charisma) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
      `;
      const statValues = [
        pointAllocation.strength, 
        pointAllocation.dexterity, 
        pointAllocation.constitution, 
        pointAllocation.intelligence, 
        pointAllocation.wisdom, 
        pointAllocation.charisma
      ];
      const { rows: statRows } = await this.db.query(statQuery, statValues);
      const statsId = statRows[0].id;
  
      // Insert into Character table
      const characterQuery = `
        INSERT INTO Character (name, class, level, race, alignment, stats_id) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
      `;
      const characterValues = [name, charClass, level, race, alignment, statsId];
      const { rows: characterRows } = await this.db.query(characterQuery, characterValues);
  
      const newCharacter = characterRows[0];
      await this.addFeatsAndSpells(newCharacter.id, feats, spells);
  
      return newCharacter;
    }
  
    async addFeatsAndSpells(characterId, feats, spells) {
      // Add feats
      for (const feat of feats) {
        await this.db.query("INSERT INTO Feat (name, character_id) VALUES ($1, $2)", [feat, characterId]);
      }
      // Add spells
      for (const spell of spells) {
        await this.db.query("INSERT INTO Spell (name, character_id) VALUES ($1, $2)", [spell, characterId]);
      }
    }
  
    async updateCharacter(id, updatedData) {
      const { name, class: charClass, level, race, alignment, pointAllocation } = updatedData;
      
      // Update Character table
      const query = `
        UPDATE Character SET name = $1, class = $2, level = $3, race = $4, alignment = $5
        WHERE id = $6 RETURNING *;
      `;
      const values = [name, charClass, level, race, alignment, id];
      const { rows } = await this.db.query(query, values);
  
      if (pointAllocation) {
        await this.updateStats(rows[0].stats_id, pointAllocation);
      }
  
      return rows[0];
    }
  
    async updateStats(statsId, pointAllocation) {
      const query = `
        UPDATE Stat SET 
          strength = $1, dexterity = $2, constitution = $3, 
          intelligence = $4, wisdom = $5, charisma = $6 
        WHERE id = $7;
      `;
      const values = [
        pointAllocation.strength,
        pointAllocation.dexterity,
        pointAllocation.constitution,
        pointAllocation.intelligence,
        pointAllocation.wisdom,
        pointAllocation.charisma,
        statsId
      ];
      await this.db.query(query, values);
    }
  
    async deleteCharacter(id) {
      const { rows } = await this.db.query("DELETE FROM Character WHERE id = $1 RETURNING *", [id]);
      return rows[0];
    }
  }
  
  export default CharacterService;
  