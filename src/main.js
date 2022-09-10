// Thanks to https://github.com/ka-weihe/fast-dice-coefficient/blob/master/dice.js
function checkStrSimilarity(fst, snd) {
    var i, j, k, map, match, ref, ref1, sub;
    if (fst.length < 2 || snd.length < 2) {
      return 0;
    }
    map = new Map;
    for (i = j = 0, ref = fst.length - 2; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
      sub = fst.substr(i, 2);
      if (map.has(sub)) {
        map.set(sub, map.get(sub) + 1);
      } else {
        map.set(sub, 1);
      }
    }
    match = 0;
    for (i = k = 0, ref1 = snd.length - 2; (0 <= ref1 ? k <= ref1 : k >= ref1); i = 0 <= ref1 ? ++k : --k) {
      sub = snd.substr(i, 2);
      if (map.get(sub) > 0) {
        match++;
        map.set(sub, map.get(sub) - 1);
      }
    }
    return 2.0 * match / (fst.length + snd.length - 2);
};

// All works here :
let questions = document.getElementsByClassName("qtext");
for(question of questions){
    let p = document.createElement("p");
    p.style.whiteSpace = "pre-line";
    p.style.backgroundColor = "rgb(255, 255, 128)";
    let maxSimilarity = 0;
    let savedQuestion = ""
    for (const [quest, answ] of Object.entries(questions_answers)) {
        let similarity = checkStrSimilarity(question.textContent,quest);
        if(similarity > maxSimilarity){
            maxSimilarity = similarity;
            savedQuestion = quest;
        }
    }
    if(maxSimilarity<0.90){
        p.textContent = "Not Found";
    }else{
        p.textContent = "Correspondance à " + maxSimilarity*100 + " %  ~" + savedQuestion + "~ :\n";
        for(answer of questions_answers[savedQuestion]){
            p.textContent += "• " + answer + "\n";
        }
    }
    question.after(p);
}
