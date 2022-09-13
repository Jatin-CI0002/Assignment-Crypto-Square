"use strict";
let string = document.getElementById("string");
let key = document.getElementById("key");
let encryptedDisplay = (document.getElementById("encrypt-display-string"));
let decryptedDisplay = (document.getElementById("decrypt-display-string"));
let encButton = (document.getElementById("encrypt"));
let decButton = (document.getElementById("decrypt"));
let matrix = [[], []];
let lengths = [];
function encrypt(event) {
    let encryptedString = "";
    let str = string.value;
    str = str.replace("%20", " ");
    str = str.replace((/[^a-zA-Z]/g), " ");
    str = str.toLowerCase();
    if (!str || +key.value < 3) {
        return;
    }
    let originalString = "";
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === " ") {
            lengths.push(i - count);
            count++;
        }
        else
            originalString += str.charAt(i);
    }
    let matrixLength = parseInt(key.value);
    let i, j, k = 0;
    for (i = 0; i < originalString.length; i++) {
        matrix[i] = [];
        for (j = 0; j < matrixLength; j++) {
            matrix[i].push(originalString.charAt(k++));
        }
    }
    for (i = 0; i < matrix[0].length; i++) {
        for (j = 0; j < matrix.length; j++) {
            encryptedString += matrix[j][i];
        }
    }
    decButton.disabled = false;
    string.value = "";
    key.value = "";
    encryptedDisplay.innerHTML = `Your encrypted string is "${encryptedString}"`;
    encryptedDisplay.style.display = "block";
}
function decrypt() {
    let decryptedString = "";
    let lengthIndex = 0;
    let counter = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (counter == lengths[lengthIndex]) {
                decryptedString += " ";
                lengthIndex++;
            }
            counter++;
            decryptedString += matrix[i][j];
        }
    }
    lengths = [];
    decryptedDisplay.innerHTML = `Your decrypted string is "${decryptedString}"`;
    decryptedDisplay.style.display = "block";
}
