"use strict";
let inputString = document.getElementById("string");
let key = document.getElementById("key");
let encryptedDisplay = (document.getElementById("encrypt-display-string"));
let decryptedDisplay = (document.getElementById("decrypt-display-string"));
const encButton = document.getElementById("encrypt");
const decButton = document.getElementById("decrypt");
const matrix = [[], []];
const spaceArray = [];
let encryptedString = "";
// ENCRYPT function started
function encrypt() {
    let str = inputString.value;
    // if my fields is empty then encrypt function will not work
    if (!str || +key.value < 3) {
        return;
    }
    // storing index of whitespaces into array and characters into another string to use further
    let originalString = "";
    let spaceCount = 0;
    for (let index = 0; index < str.length; index++) {
        if (str.charAt(index) === " ") {
            spaceArray.push(index - spaceCount);
            spaceCount++;
        }
        else
            originalString += str.charAt(index);
    }
    // pushing characters into the matrix to encode given string
    const matrixLength = +key.value;
    let iterator = 0;
    for (let row = 0; row < originalString.length; row++) {
        matrix[row] = [];
        for (let col = 0; col < matrixLength; col++) {
            matrix[row].push(originalString.charAt(iterator++));
        }
    }
    // creating the encoded string with the help of above matrix
    for (let row = 0; row < matrix[0].length; row++) {
        for (let col = 0; col < matrix.length; col++) {
            encryptedString += matrix[col][row];
        }
    }
    // creating encode for spaces and adding them with encoded string
    let encodedString = "";
    spaceArray.forEach((item) => {
        encodedString += item + "-";
    });
    const encoding = btoa(encodedString);
    encryptedString += "|" + encoding;
    encryptedDisplay.innerHTML = `Your encrypted string is "${encryptedString}"`;
    encryptedDisplay.style.display = "block";
}
// DECRYPT function started
function decrypt() {
    let string = "";
    let spaceString = "";
    let index = 0;
    if (!encryptedString) {
        index = inputString.value.lastIndexOf("|");
        string = inputString.value.substring(0, index);
        spaceString = inputString.value.substring(index);
    }
    else {
        index = encryptedString.lastIndexOf("|");
        string = encryptedString.substring(0, index);
        spaceString = encryptedString.substring(index + 1);
    }
    // if the fields are null then function will not propagate further
    if (!string || +key.value < 3) {
        return;
    }
    // storing string that needs to be decrypted
    const stringLength = string.length;
    let decryptionString = string;
    // creating array that will contain white spaces
    const indexString = atob(spaceString);
    let spaceIndex = indexString.split("-");
    let decryptedString = "";
    const matrix = [[], []];
    // getting lengths for the matrix to decode the encoded string
    const decryptionKey = +key.value;
    const columnLength = Math.floor(stringLength / decryptionKey);
    let columnRemainder = stringLength % decryptionKey;
    let increment = 0;
    let spaceIterator = 0;
    if (columnRemainder > 0)
        increment = 1;
    // creating matrix for decoded string  
    for (let row = 0; row < decryptionString.length; row++) {
        matrix[row] = [];
        for (let col = 0; col < columnLength + increment; col++) {
            matrix[row].push(decryptionString.charAt(spaceIterator++));
        }
        if (columnRemainder > 0)
            columnRemainder--;
        if (columnRemainder <= 0)
            increment = 0;
    }
    // getting all characters from matrix to create decoded string
    for (let row = 0; row < matrix[0].length; row++) {
        for (let col = 0; col < matrix.length; col++) {
            if (matrix[col][row] !== undefined)
                decryptedString += matrix[col][row];
        }
    }
    // adding all the whitespaces into decoded string at required places
    let iterator = 0;
    let finalString = "";
    for (let index = 0; index < decryptedString.length; index++) {
        if (index == +spaceIndex[iterator]) {
            finalString += " ";
            iterator++;
        }
        finalString += decryptedString.charAt(index);
    }
    decryptedDisplay.innerHTML = `Your decrypted string is "${finalString}"`;
    decryptedDisplay.style.display = "block";
}
