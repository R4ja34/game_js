import { Fighter, Paladin, Monk, Berzerker, Assassin, Wizard, AncientGuardian } from "./index.js";



function createPlayer() {
  const playerName = prompt("Entrez le nom du joueur :");

  // Demander au joueur de choisir une classe directement dans le prompt
  let playerClass = prompt(`
    Choisissez votre classe :
    1. Combattant
    2. Paladin
    3. Moine
    4. Berzerker
    5. Assassin
    6. Magicien
    7. Gardien
    Entrez le numéro de la classe :`);

  // Valider le numéro de classe
  while (isNaN(playerClass) || playerClass < 1 || playerClass > 7) {
    console.log("Numéro de classe invalide. Veuillez entrer un numéro entre 1 et 5.");
    playerClass = prompt("Entrez le numéro de la classe :");
  }

  // Ajouter le joueur au jeu en fonction de la classe choisie
  const classes = [Fighter, Paladin, Monk, Berzerker, Assassin, Wizard, AncientGuardian];
  const selectedClass = classes[playerClass - 1];
  return new selectedClass(playerName);
}






function runGame() {
  console.log("Début du jeu");
  const players = [];

  const numberOfPlayers = 2;
  for (let i = 0; i < numberOfPlayers; i++) {
    const player = createPlayer();
    players.push(player);
  }

  const totalTurns = 10; // Nombre total de tours à jouer
  let currentTurn = 1; // Tour actuel

  while (currentTurn <= totalTurns && players.length >= 1) {
    console.log(`Tour ${currentTurn}`);

    if (players.length === 1) {
      console.log(`Il n'en reste qu'un : ${players[0].name} est le grand gagnant`);
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
      } while (targetIndex === i);

      const targetPlayer = players[targetIndex];

      console.log(`Tour du joueur ${currentPlayer.name}`);

      // Laissez le joueur choisir entre attaque normale (1) ou attaque spéciale (2)
      let actionChoice = prompt(`Choisissez une action pour ${currentPlayer.name} :
        1. Attaque normale
        2. Attaque spéciale
        Entrez le numéro de l'action :`);

      // Valider le choix de l'action
      while (isNaN(actionChoice) || (actionChoice !== '1' && actionChoice !== '2')) {
        console.log("Choix d'action invalide. Veuillez entrer 1 pour attaque normale ou 2 pour attaque spéciale.");
        actionChoice = prompt("Entrez le numéro de l'action :");
      }

      // Effectuer l'attaque en fonction du choix du joueur
      if (actionChoice === '1') {
        currentPlayer.hit(targetPlayer);
        console.log(`${currentPlayer.name} a effectué une attaque sur ${targetPlayer.name}`);
      } else {
        currentPlayer.specialHit(targetPlayer);
        console.log(`${currentPlayer.name} a effectué une attaque spéciale sur ${targetPlayer.name}`);
      }

      if (targetPlayer.isDead()) {
        players.splice(targetIndex, 1);
        console.log(`${targetPlayer.name} a été tué.`);
      }

      //afficher etat joueur
      console.log(`Etat du joueur ${currentPlayer.name}`);
      console.log(currentPlayer.hp);

      // Affichage des informations du jeu
      console.log(`Il reste ${players.length} joueurs en jeu`);
      console.log(`Il reste ${totalTurns - currentTurn} tours à jouer`);

    }
    currentTurn++;
  }
}

// Appeler la fonction pour exécuter le jeu
runGame();
