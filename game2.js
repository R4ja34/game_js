import { Fighter, Paladin, Monk, Berzerker, Assassin } from "./index.js";

console.log("Début du jeu");
const classes = [Fighter, Paladin, Monk, Berzerker, Assassin];

// Initialisation des joueurs
const numberOfPlayers = 5;
const players = [];
function choisirClasseAleatoire() {
  const randomClassIndex = Math.floor(Math.random() * classes.length);
  return new classes[randomClassIndex](`Joueur ${players.length + 1}`);
}
for (let i = 0; i < numberOfPlayers; i++) {
  players.push(choisirClasseAleatoire());
}


// initialisation du jeu
const totalTurns = 10; // Nombre total de tours à jouer
let currentTurn = 1; // Tour actuel

while (currentTurn <= totalTurns && (players.length) >= 1 ) {
  console.log(`Tour ${currentTurn}`);
  if (players.length === 1) {
    console.log(`il n'en reste qu'un ${players[0].name} est le grand gagnant`);
    break;
  }
  if (currentTurn === totalTurns) {
    let winner = players[0];
    for (let i = 1; i < players.length; i++) {
      if (players[i].hp > winner.hp) {
        winner = players[i];
      }
    }
    console.log(`Le gagnant est ${winner.name} avec ${winner.hp} points de vie, il reste ${players.length} joueurs`);
    break;
  }


// Actions des joueurs
for (let i = 0; i < players.length; i++) {
  const currentPlayer = players[i];
  let targetIndex;

  do {
    targetIndex = Math.floor(Math.random() * players.length);
  } while (targetIndex === i); // Assurez-vous que le joueur cible n'est pas le même que le joueur actuel

  const targetPlayer = players[targetIndex];

  if (Math.random() < 0.7) {
    currentPlayer.hit(targetPlayer);
  } else {
    currentPlayer.specialHit(targetPlayer);
  }
  if (targetPlayer.isDead()) {
    players.splice(targetIndex, 1);
  }
  console.log(players);
}

  currentTurn++; // Passer au tour suivant
}

console.log("Fin du jeu");

