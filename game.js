var prompt = "You are a game master of a dungeouns and dragons game. You need to give the player scenarios for a new dungeons and dragons game based on their character. their character data is as follows:";

characterData = "";

document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById("userInput");
    const displayTextArea = document.getElementById("displayTextArea");
    const submitButton = document.getElementById("submitButton");

    submitButton.addEventListener("click", async () => {
        const inputText = userInput.value;
        displayTextArea.value = inputText;
        inputText;
        await getResponse(prompt+characterData+"The player asks: "+inputText);
    });
});

async function getCharacterData() {
    try {
        const response = await fetch('http://127.0.0.1:3000/get-character-data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        characterData += `Character Name: ${data.characterName}, Character Race: ${data.characterRace}`;
        characterData += `Character Class: ${data.characterClass}, Character Backstory: ${data.characterBackstory}`;

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

window.addEventListener("load", getCharacterData);

async function getResponse(prompt) {
    try {
        const response = await fetch('/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: prompt
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error('Network response was not ok: ' + response.statusText + ' - ' + errorText);        }

        const data = await response.json();
        console.log(data.response);
    } catch (error) {
        console.log('There was a problem with the fetch operation:', error);
    }
}

// window.addEventListener('load',start)

// function clickInp() {
//     var userInput = document.getElementById('userInput').value;
//     document.getElementById('displayTextArea').value = userInput;
// }
// var input = document.getElementById('submitButton')
// input.addEventListener('click', clickInp);

// function clickInv() {
//     alert('Inventory button clicked!');
// }

// var inventoryButton = document.getElementById('inventoryButton')
// inventoryButton.addEventListener('click', clickInv);

// function clickQuit() {
//     alert('Quit button clicked!');
// } 

// var quitButton = document.getElementById('quitButton')
// quitButton.addEventListener('click', clickQuit);
