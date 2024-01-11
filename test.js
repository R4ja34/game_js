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

const totalTurns = 10; // Nombre total de tours à jouer
let currentTurn = 1; // Tour actuel

while (currentTurn <= totalTurns && players.every(player => !player.isDead())) {
  document.getElementById("turn-info").innerText = `Tour ${currentTurn}`;

  // Affichage des informations sur les joueurs
  const playerListElement = document.getElementById("player-list");
  playerListElement.innerHTML = ""; // Effacer la liste précédente des joueurs

  for (const player of players) {
    const listItem = document.createElement("li");
    listItem.innerText = player.toString();
    playerListElement.appendChild(listItem);
  }

  // Actions des joueurs
  for (let i = 0; i < players.length; i++) {
    const currentPlayer = players[i];
    let targetIndex;

    do {
      targetIndex = Math.floor(Math.random() * players.length);
    } while (targetIndex === i);

    const targetPlayer = players[targetIndex];

    const actionLogElement = document.getElementById("action-log");
    const actionMessage = `Joueur ${i + 1} attaque`;

    if (Math.random() < 0.5) {
      currentPlayer.hit(targetPlayer);
      actionLogElement.innerHTML += `<p>${actionMessage} (Attaque normale)</p>`;
    } else {
      currentPlayer.specialHit(targetPlayer);
      actionLogElement.innerHTML += `<p>${actionMessage} (Attaque spéciale)</p>`;
    }

    // Vérification de l'état du joueur cible
    if (targetPlayer.isDead()) {
      break; // Sortir de la boucle si le joueur cible est vaincu
    }
  }

  currentTurn++; // Passer au tour suivant
}

console.log("Fin du jeu");


# Initialisation des joueurs (par exemple, une liste de joueurs)
joueurs = ["Joueur 1", "Joueur 2", "Joueur 3"]

while len(joueurs) > 1:
    # Logique du tour de jeu pour chaque joueur
    for joueur in joueurs:
        # Logique du tour du joueur
        
        # Supprimer le joueur s'il est éliminé (mort) pendant le tour
        if joueur_est_elimine(joueur):
            joueurs.remove(joueur)

# À ce stade, la boucle se termine lorsque plus d'un joueur est en vie.
# Le dernier joueur restant est le gagnant.
print("Le joueur gagnant est :", joueurs[0])
