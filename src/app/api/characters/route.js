// /src/app/api/characters/route.js
import { db } from "@/utils/dbConnection";

// Get all characters or a specific one by id
export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    if (id) {
      const { rows } = await db.query("SELECT * FROM Character WHERE id = $1", [id]);
      if (rows.length === 0) return new Response("Character not found", { status: 404 });
      return new Response(JSON.stringify(rows[0]), { status: 200 });
    } else {
      const { rows } = await db.query("SELECT * FROM Character");
      return new Response(JSON.stringify(rows), { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching characters:", error);
    return new Response("Error fetching characters", { status: 500 });
  }
}

// Create a new character
export async function POST(request) {
  try {
    const { name, class: charClass, level, race, alignment, stats, feats, spells } = await request.json();

    // Insert into Stat table
    const statQuery = `
      INSERT INTO Stat (strength, dexterity, constitution, intelligence, wisdom, charisma)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `;
    const statResult = await db.query(statQuery, Object.values(stats));
    const statsId = statResult.rows[0]?.id;

    // Insert into Character table
    const characterQuery = `
      INSERT INTO Character (name, class, level, race, alignment, stats_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `;
    const characterResult = await db.query(characterQuery, [name, charClass, level, race, alignment, statsId]);
    const characterId = characterResult.rows[0]?.id;

    // Insert into Feat and Spell tables
    const featPromises = feats.map((feat) =>
      db.query("INSERT INTO Feat (name, character_id) VALUES ($1, $2)", [feat, characterId])
    );
    const spellPromises = spells.map((spell) =>
      db.query("INSERT INTO Spell (name, character_id) VALUES ($1, $2)", [spell, characterId])
    );

    await Promise.all([...featPromises, ...spellPromises]);

    return new Response("Character created successfully", { status: 201 });
  } catch (error) {
    console.error("Error creating character:", error);
    return new Response("Error creating character", { status: 500 });
  }
}

// Update character
export async function PUT(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) return new Response("Character ID required", { status: 400 });

  try {
    const updatedData = await request.json();
    const { name, class: charClass, level, race, alignment, stats } = updatedData;

    if (stats) {
      const statUpdateQuery = `
        UPDATE Stat SET strength = $1, dexterity = $2, constitution = $3, intelligence = $4, wisdom = $5, charisma = $6
        WHERE id = (SELECT stats_id FROM Character WHERE id = $7)
      `;
      await db.query(statUpdateQuery, [...Object.values(stats), id]);
    }

    const characterUpdateQuery = `
      UPDATE Character SET name = $1, class = $2, level = $3, race = $4, alignment = $5
      WHERE id = $6
    `;
    await db.query(characterUpdateQuery, [name, charClass, level, race, alignment, id]);

    return new Response("Character updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating character:", error);
    return new Response("Error updating character", { status: 500 });
  }
}

// Delete character
export async function DELETE(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) return new Response("Character ID required", { status: 400 });

  try {
    await db.query("DELETE FROM Character WHERE id = $1", [id]);
    return new Response("Character deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting character:", error);
    return new Response("Error deleting character", { status: 500 });
  }
}
