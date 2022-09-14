"use strict";
let inputString = document.getElementById("string");
let key = document.getElementById("key");
let encryptedDisplay = (document.getElementById("encrypt-display-string"));
let decryptedDisplay = (document.getElementById("decrypt-display-string"));
let encButton = document.getElementById("encrypt");
let decButton = document.getElementById("decrypt");
let matrix = [[], []];
let spaceArray = [];
let encryptedString = "";
function encrypt(event) {
    let str = inputString.value;
    str = str.replace("%20", " ");
    str = str.replace(/[^a-zA-Z]/g, " ");
    str = str.toLowerCase();
    if (!str || +key.value < 3) {
        return;
    }
    let originalString = "";
    let spaceCount = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === " ") {
            spaceArray.push(i - spaceCount);
            spaceCount++;
        }
        else
            originalString += str.charAt(i);
    }
    let matrixLength = parseInt(key.value);
    let iterator = 0;
    for (let i = 0; i < originalString.length; i++) {
        matrix[i] = [];
        for (let j = 0; j < matrixLength; j++) {
            matrix[i].push(originalString.charAt(iterator++));
        }
    }
    for (let i = 0; i < matrix[0].length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            encryptedString += matrix[j][i];
        }
    }
    let encodingString = "";
    spaceArray.forEach((item) => {
        encodingString += item + "-";
    });
    let encoding = btoa(encodingString);
    inputString.value = "";
    encryptedString += "|" + encoding;
    encryptedDisplay.innerHTML = `Your encrypted string is "${encryptedString}"`;
    encryptedDisplay.style.display = "block";
}
function decrypt() {
    let decryptionKey = +key.value;
    let string = [];
    if (!encryptedString)
        string = inputString.value.split("|");
    else
        string = encryptedString.split("|");
    // string that needs to be decrypted
    let stringLength = string[0].length;
    let decryptionString = string[0];
    // array containing spaces
    let indexString = atob(string[1]);
    let spaceIndex = indexString.split("-");
    let decryptedString = "";
    let matrix = [[], []];
    let columnLength = Math.floor(stringLength / decryptionKey);
    let columnRemainder = stringLength % decryptionKey;
    let spaceIterator = 0;
    for (let i = 0; i < decryptionString.length; i++) {
        matrix[i] = [];
        for (let j = 0; j < columnLength + columnRemainder; j++) {
            matrix[i].push(decryptionString.charAt(spaceIterator++));
        }
        if (columnRemainder != 0)
            columnRemainder--;
    }
    for (let i = 0; i < matrix[0].length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[j][i] !== undefined)
                decryptedString += matrix[j][i];
        }
    }
    let iterator = 0;
    let finalString = "";
    for (let i = 0; i < decryptedString.length; i++) {
        if (i == +spaceIndex[iterator]) {
            finalString += " ";
            iterator++;
        }
        finalString += decryptedString.charAt(i);
    }
    decryptedDisplay.innerHTML = `Your decrypted string is "${finalString}"`;
    decryptedDisplay.style.display = "block";
}
