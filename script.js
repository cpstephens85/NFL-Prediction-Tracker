const saveButton = document.getElementById("saveButton");
const saveMessage = document.getElementById("saveMessage");
const viewSavedButton = document.getElementById("viewSavedButton");
const savedPredictionsSection = document.getElementById("savedPredictions");
const predictionView = document.getElementById("predictionView");

const savedGame1 = document.getElementById("savedGame1");
const savedGame2 = document.getElementById("savedGame2");
const savedGame3 = document.getElementById("savedGame3");

const backButton = document.getElementById("backButton");
const radioButtons = document.querySelectorAll('input[type="radio"]');

let savedPredictions = {};
let hasUnsavedChanges = false;

saveButton.addEventListener("click", function () {
    const game1 = document.querySelector('input[name="game1"]:checked');
    const game2 = document.querySelector('input[name="game2"]:checked');
    const game3 = document.querySelector('input[name="game3"]:checked');

    if (!game1 || !game2 || !game3) {
        saveMessage.textContent =
            "Please select a winner for every game before saving.";
        return;
    }

    savedPredictions = {
        game1: game1.value,
        game2: game2.value,
        game3: game3.value
    };

    hasUnsavedChanges = false;
    saveMessage.textContent = "Predictions saved!";
});

viewSavedButton.addEventListener("click", function () {
    if (Object.keys(savedPredictions).length === 0) {
        saveMessage.textContent =
            "Save your predictions before viewing them.";
        return;
    }

    if (hasUnsavedChanges) {
        const continueWithoutSaving = confirm(
            "You have unsaved changes. View your last saved predictions anyway?"
        );

        if (!continueWithoutSaving) {
            return;
        }
    }

    savedGame1.textContent =
        "Game 1: " + savedPredictions.game1;

    savedGame2.textContent =
        "Game 2: " + savedPredictions.game2;

    savedGame3.textContent =
        "Game 3: " + savedPredictions.game3;

    predictionView.style.display = "none";
    savedPredictionsSection.style.display = "block";
});

backButton.addEventListener("click", function () {
    savedPredictionsSection.style.display = "none";
    predictionView.style.display = "block";
});

radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("change", function () {
        hasUnsavedChanges = true;
        saveMessage.textContent = "You have unsaved predictions.";
    });
});