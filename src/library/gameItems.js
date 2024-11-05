// Base GameItem class
class GameItem {
    constructor(name, description) {
      this.name = name;
      this.description = description;
    }
  
    use() {
      return `Using ${this.name}.`;
    }
  }
  
  // Weapon class extending GameItem
  class Weapon extends GameItem {
    constructor(name, description, damage) {
      super(name, description);
      this.damage = damage;
    }
  
    attack() {
      return `${this.name} attack deals ${this.damage} damage!`;
    }
  }
  
  // MeleeWeapon class extending Weapon
  class MeleeWeapon extends Weapon {
    constructor(name, description, damage) {
      super(name, description, damage);
    }
  
    attack() {
      return `Swinging ${this.name} for ${this.damage} melee damage!`;
    }
  }
  
  // MagicalWeapon class extending Weapon
  class MagicalWeapon extends Weapon {
    constructor(name, description, damage, manaCost) {
      super(name, description, damage);
      this.manaCost = manaCost;
    }
  
    attack() {
      return `Casting ${this.name} for ${this.damage} magical damage (Costs ${this.manaCost} mana)`;
    }
  }
  
  // Specific weapon classes
  class Sword extends MeleeWeapon {
    constructor() {
      super("Sword", "A sharp blade for close combat.", 15);
    }
  }
  
  class Staff extends MagicalWeapon {
    constructor() {
      super("Staff", "A magical staff imbued with powerful spells.", 20, 10);
    }
  }
  
  // Exporting classes
  module.exports = {
    GameItem,
    Weapon,
    MeleeWeapon,
    MagicalWeapon,
    Sword,
    Staff
  };