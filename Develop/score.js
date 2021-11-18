function displayHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // sort highscores in descending order
    highscores.sort(function(a,b) {
        return b.score - a.score;
    });

    highscores.forEach(function(score) {
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;

        // display 
        var olEL = document.getElementById("highscores");
        olEL.appendChild(liTag);
    });

    function clearHighscores() {
        window.localStorage.removeItem("highscores");
        window.location.reload();
    }

    document.getElementById("clear").onclick = clearHighscores;

    printHighscores();
