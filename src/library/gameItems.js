// Base GameItem class
class GameItem {
    constructor(name, description, imageUrl) {
      this.name = name;
      this.description = description;
      this.imageUrl = imageUrl;
    }
  
    use() {
      return `Using ${this.name}.`;
    }
  }
  
  // Weapon class extending GameItem
  class Weapon extends GameItem {
    constructor(name, description, imageUrl, damage) {
      super(name, description, imageUrl);
      this.damage = damage;
    }
  
    attack() {
      return `${this.name} attack deals ${this.damage} damage!`;
    }
  }
  
  // MeleeWeapon class extending Weapon
  class MeleeWeapon extends Weapon {
    constructor(name, description, imageUrl, damage) {
      super(name, description, imageUrl, damage);
    }
  
    attack() {
      return `Swinging ${this.name} for ${this.damage} melee damage!`;
    }
  }
  
  // RangedWeapon class extending Weapon
  class RangedWeapon extends Weapon {
    constructor(name, description, imageUrl, damage, range) {
      super(name, description, imageUrl, damage);
      this.range = range;
    }
  
    attack() {
      return `Firing ${this.name} for ${this.damage} damage at a range of ${this.range} meters!`;
    }
  }
  
  // MagicalWeapon class extending Weapon
  class MagicalWeapon extends Weapon {
    constructor(name, description, imageUrl, damage, manaCost) {
      super(name, description, imageUrl, damage);
      this.manaCost = manaCost;
    }
  
    attack() {
      return `Casting ${this.name} for ${this.damage} magical damage (Costs ${this.manaCost} mana)`;
    }
  }
  
  // Spell class extending GameItem for spells
  class Spell extends GameItem {
    constructor(name, description, imageUrl, damage, manaCost, effect) {
      super(name, description, imageUrl);
      this.damage = damage;  // Adding damage to Spell class
      this.manaCost = manaCost;
      this.effect = effect;
    }
  
    cast() {
      return `Casting ${this.name} for ${this.effect} (Costs ${this.manaCost} mana)`;
    }
  }
  
  // Specific weapon classes with customized details and image URLs
  class Mythcarver extends MeleeWeapon {
    constructor() {
      super(
        "Mythcarver",
        "A legendary sword with the power to inspire stories and uncover truths.",
        "/images/mythcarver.png",
        18
      );
    }
  }
  
  class Stormbreaker extends MeleeWeapon {
    constructor() {
      super(
        "Stormbreaker",
        "The enchanted axe of Thor, imbued with the power of lightning and thunder.",
        "/images/stormbreaker.jpeg",
        25
      );
    }
  }
  
  class Whisper extends MeleeWeapon {
    constructor() {
      super(
        "Whisper",
        "A stealthy dagger with an eerie presence, known for delivering silent, deadly blows.",
        "/images/whisper.jpeg",
        12
      );
    }
  }
  
  class Staff extends MagicalWeapon {
    constructor() {
      super(
        "Staff",
        "A magical staff imbued with powerful spells.",
        "/images/staff.jpeg",
        20,
        10
      );
    }
  }
  
  class Bow extends RangedWeapon {
    constructor() {
      super(
        "Bow",
        "A ranged weapon for distant attacks.",
        "/images/bow.jpeg",
        12,
        50
      );
    }
  }
  
  class Crossbow extends RangedWeapon {
    constructor() {
      super(
        "Crossbow",
        "A powerful ranged weapon with great accuracy.",
        "/images/crossbow.jpeg",
        18,
        60
      );
    }
  }
  
  // Specific spell classes with damage values
  class Fireball extends Spell {
    constructor() {
      super(
        "Fireball",
        "A fiery blast that engulfs enemies.",
        "/images/fireball.jpg",
        20,       // Damage value for Fireball
        15,       // Mana cost for Fireball
        "explosive fire damage"
      );
    }
  }
  
  class IceShard extends Spell {
    constructor() {
      super(
        "Ice Shard",
        "A sharp shard of ice that pierces armor.",
        "/images/iceshard.jpeg",
        15,       // Damage value for Ice Shard
        12,       // Mana cost for Ice Shard
        "piercing ice damage"
      );
    }
  }
  
  // Exporting classes
  module.exports = {
    GameItem,
    Weapon,
    MeleeWeapon,
    RangedWeapon,
    MagicalWeapon,
    Spell,
    Mythcarver,
    Stormbreaker,
    Staff,
    Bow,
    Crossbow,
    Whisper,
    Fireball,
    IceShard
  };
  