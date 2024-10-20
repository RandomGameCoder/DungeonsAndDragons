var prompt = "Hello";

async function start() {
    await fetch("query/"+prompt).then(result => {
        console.log(result.text());
    });
}

window.addEventListener('load',start)

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
