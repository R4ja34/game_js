// Importer les classes de personnages
import { Fighter, Paladin, Monk, Berzerker, Assassin } from "./index.js";
// Création d'instances de personnages

console.log("Début du jeu");

// Initialisation des joueurs
const player1 = new Fighter("Grace");
const player2 = new Berzerker("Ulder");
const player3 = new Monk("Moana");
const player4 = new Assassin("Draven");
const player5 = new Paladin("Ulder");

const totalTurns = 10; // Nombre total de tours à jouer
let currentTurn = 1; // Tour actuel

while (currentTurn <= totalTurns && !player1.isDead() && !player3.isDead()) {
  console.log(`Tour ${currentTurn}`);

  // Affichage des informations sur les joueurs
  console.log(player1);
  console.log(player3);

  // Actions du joueur 1
  console.log("Joueur 1 attaque");
  player1.hit(player3);

  // Vérification de l'état du joueur 2
  if (player3.isDead()) {
    break; // Sortir de la boucle si le joueur 2 est vaincu
  }

  // Actions du joueur 2
  console.log("Joueur 2 attaque");
  player3.specialHit(player1);

  // Vérification de l'état du joueur 1
  if (player1.isDead()) {
    break; // Sortir de la boucle si le joueur 1 est vaincu
  }

  currentTurn++; // Passer au tour suivant
}

console.log("Fin du jeu");
