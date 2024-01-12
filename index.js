// 1. Définir les classes des personnages
// Créez les classes pour chaque type de personnage (Fighter, Paladin, Monk, Berzerker, Assassin), étendant la classe Character avec les attributs et méthodes spécifiques à chaque classe.
class Character {
  constructor(cname,name, hp, attack, mana, status, specialHitCost) {
    this.cname = cname
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.mana = mana;
    this.status = status;
    this.specialHitCost = specialHitCost
    this.levelShield = 0;
    this.levelShieldResistance = 0;
  }

  takeDamage(damage) {
    if (this.status === "alive") {
      this.hp -= damage;
      console.log(`${this.name} prend ${damage} de degats il a maintenant ${this.hp}point de vie. 1`);
      if (this.hp <= 0) {
        this.hp = 0;
        this.status = "dead";
      }
    }
  }
  
  takeSpecialDamage(damage, levelShield) {
    if (this.status === "alive") {
      let newdamage = damage - levelShield;
      if (newdamage < 0) {
        newdamage = 0
      } else
      this.hp -= newdamage;
      this.levelShieldResistance -= 1;
      if (this.levelShieldResistance === 0) {
        this.levelShield = 0;
      }
      if (this.hp <= 0) {
        this.hp = 0;
        this.status = "dead";
      }
      console.log(`${this.name} prend ${newdamage} de degats il a maintenant ${this.hp}point de vie . 2`);
      console.log(`${this.name} a plus que ${this.levelShieldResistance} de tours de reduction.`);
    }
  }


  dealDamage(damage, player) {
    if (this.status === "alive" && player.status === "alive") {
      if (player.levelShieldResistance > 0) {
        player.takeSpecialDamage(damage, player.levelShield);
      } else {
        player.takeDamage(damage);
      }
      if (player.status === "dead") {
        this.mana += 20;
      }
    }
  }

  hit(player) {
    if (this.status === "alive" && player.status === "alive") {
      console.log(`${this.name} attaque ${player.name}`);
      this.dealDamage(this.attack, player);
    }
  }

  isDead() {
    if (this.status === "dead") {
      console.log(`${this.name} est mort.`);
      return true;
    } else {
      return false;
    }
  }
}

//####################################################################################################
//##################################    classes des personnages     ##################################
//####################################################################################################


class Fighter extends Character {
  constructor(name) {
    super("fighter", name, 12, 4, 40, "alive", 20);
    this.levelShield = 0;
    this.levelShieldResistance = 0;
    this.attackbase = this
  }

  specialHit(player) {
    if (this.mana >= this.specialHitCost) {
      console.log(`${this.name} uses Dark vision!`);
      this.mana -= this.specialHitCost;
      this.attack += 2;
      this.dealDamage(this.attack, player);
      this.levelShield = 2;
      this.levelShieldResistance += 2;}
    else {
      console.log(`${this.name} doesn't have enough mana to use Dark vision.`);
    }
  }
}


class Paladin extends Character {
  constructor(name) {
    super("paladin", name,16,3,160,"alive", 40);
  }
  specialHit(player) {
    if (this.mana >= this.specialHitCost) {
      console.log(`${this.name} uses Healing Lighting!`);
      this.mana -= this.specialHitCost;
      this.attack += 1;
      this.dealDamage(this.attack, player);
      this.hp += 3;
      this.levelShield = 1;
      this.levelShieldResistance += 3;}
    else {
      console.log(`${this.name} doesn't have enough mana to use Healing Lighting.`);
    }
  }

}

class Monk extends Character {
  constructor(name) {
    super("monk", name, 8, 2, 200, "alive", 25);
  }
  specialHit(player) {
    if (this.mana >= this.specialHitCost) {
      console.log(`${this.name} uses Heal!`);
      this.mana -= this.specialHitCost;
      this.hp += 8;
      this.dealDamage(this.attack, player);}
    else {
      console.log(`${this.name} doesn't have enough mana to use heal.`);
    }
  }
}

class Berzerker extends Character {
  constructor(name) {
    super("berzerker", name, 10, 4, 0, "alive", 0);
    this.hpbase = this.hp;
  }
  specialHit(player) {
    if (this.hp <= (this.hpbase * 0.3)) {
      console.log(`${this.name} uses Rage!`);
      this.attack += 10;
      this.dealDamage(this.attack, player);
      this.levelShield = 10;
      this.levelShieldResistance += 1;
    } else {
      console.log(`${this.name} need less health to use Rage.`);
    }
  }
}

class Assassin extends Character {
  constructor(name) {
    super("assassin", name, 5, 2, 40, "alive", 40);
  }

  specialHit(player) {
    if (this.mana >= this.specialHitCost) {
      console.log(`${this.name} uses Shadow Step!`);
      this.mana -= this.specialHitCost;
      this.attack += 5;
      this.dealDamage(this.attack, player);
      this.levelShield = 5;
      this.levelShieldResistance += 5;}
    else {
      console.log(`${this.name} doesn't have enough mana to use Shadow Step.`);
    }
  }
}

class Wizard extends Character {
  constructor(name) {
    super("wizard", name, 10, 2, 200, "alive", 2);
  }

  specialHit(player) {
    if (this.mana >= 25) {
      console.log(`${this.name} uses Fireball!`);
      this.mana -= 25;
      this.dealDamage(7, player);
    } else {
      console.log(`${this.name} doesn't have enough mana to use Fireball.`);
    }
  }
}

class AncientGuardian extends Character {
  constructor(name) {
    super("ancientguardian", name, 20, 3, 50, "alive", 25);
    this.levelshield = 15;
  }
  specialHit() {
    if (this.mana >= 25) {
      console.log(`${this.name} uses Stone Shield!`);
      this.mana -= 25;
    } else {
      console.log(`${this.name} doesn't have enough mana to use Stone Shield.`);
    }
  }
}


  



export { Fighter, Paladin, Monk, Berzerker, Assassin, Wizard, AncientGuardian };