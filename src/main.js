function checkStrSimilarity(firstString, secondString) {
  // Vérifier la longueur des chaînes
  if (firstString.length < 2 || secondString.length < 2) {
    return 0;
  }

  // Créer un objet pour stocker les sous-chaînes et leurs occurrences
  const map = {};

  // Parcourir la première chaîne et mettre à jour l'objet
  for (let i = 0; i < firstString.length - 1; i++) {
    const sub = firstString.substr(i, 2);
    map[sub] = map[sub] ? map[sub] + 1 : 1;
  }

  // Initialiser le compteur de correspondances
  let match = 0;

  // Parcourir la deuxième chaîne et mettre à jour le compteur de correspondances
  for (let i = 0; i < secondString.length - 1; i++) {
    const sub = secondString.substr(i, 2);
    if (map[sub] > 0) {
      match++;
      map[sub]--;
    }
  }

  // Calculer et retourner la similarité
  return (2.0 * match) / (firstString.length + secondString.length - 2);
}

// Récupérer les questions
const questions = document.getElementsByClassName("qtext");

// Parcourir les questions
for (const question of questions) {
  // Créer un élément 'p'
  const p = document.createElement("p");
  p.style.whiteSpace = "pre-line";
  p.style.backgroundColor = "rgb(255, 255, 128)";

  // Initialiser la similarité maximale et la question sauvegardée
  let maxSimilarity = 0;
  let savedQuestion = "";

  // Parcourir les questions et réponses
  for (const [quest, answ] of Object.entries(questions_answers)) {
    // Calculer la similarité
    const similarity = checkStrSimilarity(question.textContent, quest);

    // Mettre à jour la similarité maximale et la question sauvegardée
    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      savedQuestion = quest;
    }
  }

  // Mettre à jour le contenu de l'élément 'p'
  if (maxSimilarity < 0.90) {
    p.textContent = "Not Found";
  } else {
    p.textContent = `Correspondance à ${maxSimilarity * 100} %  ~${savedQuestion}~ :\n`;

    // Parcourir les réponses et mettre à jour le contenu de l'élément 'p'
    for (const answer of questions_answers[savedQuestion]) {
      p.textContent += `• ${answer}\n`;
    }
  }

  // Ajouter l'élément 'p' après la question
  question.after(p);
}
