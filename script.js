const btnValue = document.getElementById("enter-tip");
const nbPeople = document.getElementById("enter-nb-people");
const addAllowed = document.getElementById("allowed");
const tips = document.getElementsByClassName("tip");
const inputs = document.getElementsByClassName("enter-value");
const firstPrice = document.getElementById("price1");
const secondPrice = document.getElementById("price2");

let tip = 0;
let bill = 0;
let nbOfPeople = 0;
let tipAmount = 0;
let totalAmount = 0;

/* Display warning text if number of people is 0 */
const isNotAllowed = (value) => {
    if(value == 0) {
        addAllowed.setAttribute("id", "not-allowed");
        addAllowed.style.color = 'red';
        nbPeople.setAttribute("id", "not-allowed-border");
    } else {
        addAllowed.setAttribute("id", "allowed");
        nbPeople.setAttribute("id", "enter-nb-people");
    }

};

/* Select button + change background */
const selectedBtn = (value) => {
    tip = value;
    [...tips].forEach(input => {
        if(input.value === tip) {
            input.setAttribute("id", "selected-tip");
        } else {
            input.removeAttribute("id", "selected-tip");
        }
    });
    return tip;
};

/* Unselect tip button when selecting custom tip input */
const unselectBtn = () => {
    [...tips].forEach(input => {
        input.removeAttribute("id", "selected-tip");
    });
};

/* Clear custom tip input when selecting a tip button */
const clearTipField = () => {
    btnValue.value = "";
};

/* Let input numbers displayed when onfocus */
for(let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          inputs[i].blur();
          setTipAmount(bill, tip, nbOfPeople);
          setTotalAmount(bill, tip, nbOfPeople);
        }
    });

    inputs[i].addEventListener('blur', (event) => {
        setTipAmount(bill, tip, nbOfPeople);
        setTotalAmount(bill, tip, nbOfPeople);
    });
};

/* Set bill value */
const setBill = (value) => {
    if(value < 0){
        bill = Math.abs(value);
    } else {
        bill = value;
    }
};

/* Set tip % */
const setTip = (value) => {
    if(value < 0){
        tip = Math.abs(value);
    } else {
        tip = value;
    }
};

/* Set number of people */
const setNbPeople = (value) => {
    if(value < 0){
        nbOfPeople = Math.abs(value);
    } else {
        nbOfPeople = value;
    }
};

/* Set Tip Amount / person */
const setTipAmount = (bill, tip, nbOfPeople) => {
    tipAmount = (((bill/100)*tip)/nbOfPeople);
    let rounded = tipAmount.toFixed(2);
    let roundedTipAmount = Number(rounded);
    if (isNaN(roundedTipAmount) || roundedTipAmount == "Infinity") {
        firstPrice.innerHTML = "0.00";
    } else {
        firstPrice.innerHTML = roundedTipAmount;
    }
};

/* Set Total Amount / person */
const setTotalAmount = (bill, tip, nbOfPeople) => {
    totalAmount = ((((bill/100)*tip)/nbOfPeople) + (bill/nbOfPeople));
    let rounded = totalAmount.toFixed(2);
    let roundedTotalAmount = Number(rounded);
    if (isNaN(roundedTotalAmount) || roundedTotalAmount == "Infinity") {
        secondPrice.innerHTML = "0.00";
    } else {
        secondPrice.innerHTML = roundedTotalAmount;
    }
};

/* RESET ALL */
const resetAll = () => {
    bill = 0;
    tip = 0;
    nbOfPeople = 0;
}