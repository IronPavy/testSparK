/* 1. zadatak (100 bodova)
Programski generiraj formular sa tri input polja i dva gumba('Reset', 'Submit'). (10 bodova)
Prvi input sluzi za unos Username-a i mora ispunjavati sljedece uvjete:
- minimalno 5 znakova, maksimalno 16 (5 bodova)
- nedopusten unos ikakvih znakova osim slova i brojeva (10 bodova)
Drugi input sluzi za unos Password-a i mora ispunjavati sljedece uvjete:
- minimalno 5 znakova, maksimalno 16 (5 bodova ako je koristena ista funkcija kao u prethodnom input-u)
- minimalno jedno veliko slovo, jedan dijakriticki znak i jedan broj (15 bodova)
Trece input sluzi za unost Repeat Password-a i mora ispunjavati sljedece uvjete:
- unos mora biti identican prijasnjem unosu (10 bodova)
Prilikom unosa, dok neki od uvjeta za određeni input nije zadovoljen, input mora imati crvenu boju obruba. (10 bodova)
Ako je za određeni input svaku uvjet zadovoljen, input mora imati zelenu boju obruba. (10 bodova)
Između svih input polja i button elemenata se mora prikazati poruka spomenuta u narednim zadatcima:
Prilikom pritiska na gumb Reset, ukloni/resetiraj vrijednost svakog input polja i prikazi poruku 'Successfully reseted'. (5 bodova)
Prilikom pritiska na gumb Submit, ako validacija/uvjeti na input-ima nisu zadovoljeni, prikazi poruku 'Invalid input'. (5 bodova)
Prilikom pritiska na gumb Submit, ako je validacija ispunjena, prikazi poruku 'Form data sent'. (5 bodova)

2.  zadatak (80 bodova)
Programski generiraj tri buttona ('Generate', 'Colorize', 'Remove'). (5 bodova)
Pritiskom na Generate izgeneriraj listu sa nasumicnim brojem podataka (maks. 10). (10 bodova)
Svaki od napravljenih itema mora biti numeriran od 1 pa nadalje. (5 bodova).
Drugom elementu u listi nadodaj anchor element koji vodi na google.com u novom tabu. (5 bodova)
Predzadnjem elementu nadodaj anchor element koji vodi na facebook.com u novom tabu, ali anchor tag postavi unutar shadow DOM-a tog elementa liste. (10 bodova)
Prilikom prelaska mišem preko jednog od elemenata, promijeni mu boju u svijetlo sivu. Ako je miš napustio element, ukloni tu boju. (isključivo JS) (10 bodova)
Svaki pritisak na Generate mora izgenerirati novu lisu sa istim gore navedenim uvjetima. (10 bodova)
Pritisak na buttone Colorize ili Remove aktivira funkcionalnost jednog od tih buttona za ostatak zadatka: (5 bodova)
Dok je aktivan Colorize:
Pritisak misa na bilo koji item u listi mu daje neku nasumičnu boju obruba. (10 bodova)
Dok je aktivan Remove:
Pritisak misa na bilo koji item u listi uklanja element iz liste. (10 bodova)

DODATNI ZADATAK:
Programski generiraj #dropzone element na koji mozes drag & dropat bilo kojeg itema iz liste iz prethodnog zadatka. (maks 20 bodova)

Pridrzavanje ili ne pridrzavanje moze nadodati (+20) ili ukloniti (-10) dodatnih bodova.

Inteligentnim korištenjem event delegacije u bilo kojem od zadataka možete ostvariti dodatnih 20 bodova.

BROJ BODOVA: 180
BROJ MOGUĆIH DODATNIH BODOVA: 60
SVEUKUPNI BROJ BODOVA: 240

Za prolazak na testu morate ostvariti minimalno 100 bodova. */

// ============ PRVI ZADATAK ============

// Style
let btnStyle = `margin: 5px;border-radius: 5px;background-color: whitesmoke;border-color: antiquewhite; border-style: solid;`;

let inputStyle = `display: block;position: relative;margin: 5px;border-radius: 5px;background-color: whitesmoke;border-color: antiquewhite;border-style: solid;`;

// Koristimo regex 
const usernameRegex = /^[0-9a-zA-Z]{5,16}$/;

// Koristimo regex za ogranicenja za password
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%?=*&]).{5,16}/;

let form = document.createElement("form");
document.body.appendChild(form);

const userName = document.createElement("input");
userName.setAttribute("style", inputStyle);
userName.type = "text";
form.appendChild(userName);


const password = document.createElement("input");
password.setAttribute("style", inputStyle);
password.type = "text";
form.appendChild(password);

const passwordRepeat = document.createElement("input");
passwordRepeat.setAttribute("style", inputStyle);
passwordRepeat.type = "text";
form.appendChild(passwordRepeat);


const errorMessage = document.createElement("p");
form.appendChild(errorMessage);
const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.setAttribute("style", btnStyle);
form.appendChild(resetButton);

// Submit gumb
let submitButton = document.createElement("button");
submitButton.textContent = "Submit";
submitButton.setAttribute("style", btnStyle);
form.appendChild(submitButton);

form.addEventListener(
  "keyup",
  e => {
    target = e.target;
    switch (target) {
      case userName:
        e.stopPropagation();
        if (!target.value.match(usernameRegex)) {
          target.style.border = "2px solid red";
        } else {
          target.style.border = "2px solid green";
        }
        break;
      case password:
        e.stopPropagation();
        if (!target.value.match(passwordRegex)) {
          target.style.border = "2px solid red";
        } else {
          target.style.border = "2px solid green";
        }
        break;
      case passwordRepeat:
        e.stopPropagation();
        if (target.value != password.value) {
          target.style.border = "2px solid red";
        } else {
          target.style.border = "2px solid green";
        }
        break;
    }
  },
  false
);

// Dodajemo click event listnere na formu
form.addEventListener(
  "click",
  e => {
    target = e.target;
    switch (target) {
      case resetButton:
        e.preventDefault();
        e.stopPropagation();
        userName.value = "";
        password.value = "";
        passwordRepeat.value = "";
        errorMessage.setAttribute("style", "color: green;");
        errorMessage.textContent = "Successfully reseted";
        break;
      case submitButton:
        e.preventDefault();
        e.stopPropagation();
        if (
          !userName.value.match(usernameRegex) ||
          !password.value.match(passwordRegex) ||
          password.value != passwordRepeat.value
        ) {
          errorMessage.setAttribute("style", "color: red;");
          errorMessage.textContent = "Invalid input!";
        } else {
          errorMessage.setAttribute("style", "color: green;");
          errorMessage.textContent = "Form data sent";
        }
    }
  },
  false
);

// ============ DRUGI ZADATAK ============

const br = document.createElement("br");
document.body.appendChild(br);

let colorizePossible = false;
let removePossible = false;

// Kreiramo buttone
const generateButton = document.createElement("button");
generateButton.textContent = "Generate";
generateButton.setAttribute("style", btnStyle);
document.body.appendChild(generateButton);

const colorizeButton = document.createElement("button");
colorizeButton.textContent = "Colorize";
colorizeButton.setAttribute("style", btnStyle);
document.body.appendChild(colorizeButton);

colorizeButton.addEventListener(
  "click",
  e => {
    e.stopPropagation();
    e.preventDefault();
    colorizePossible = true;
    removePossible = false;
  },
  false
);

const removeButton = document.createElement("button");
removeButton.textContent = "Remove";
removeButton.setAttribute("style", btnStyle);
document.body.appendChild(removeButton);
removeButton.addEventListener(
  "click",
  e => {
    e.stopPropagation();
    e.preventDefault();
    removePossible = true;
    colorizePossible = false;
  },
  false
);

// Kreiramo listu
let list = document.createElement("ol");
document.body.appendChild(list);

generateButton.addEventListener(
  "click",
  e => {
    e.preventDefault();
    e.stopPropagation();
    let childNode = list.lastElementChild;
    while (childNode) {
      list.removeChild(childNode);
      childNode = list.lastElementChild;
    }

    let max = Math.floor(Math.random() * (11 - 3)) + 3;
    for (let i = 1; i <= max; i++) {
      let item = document.createElement("li");
      item.setAttribute("draggable", "true");
      item.textContent = `Item #${i}`;
      item.setAttribute("id", `item${i}`);

      item.addEventListener("mouseenter", e => {
        e.stopPropagation();
        e.preventDefault();
        e.target.style.color = "#8d8d8d";
      });

      item.addEventListener("mouseleave", e => {
        e.stopPropagation();
        e.preventDefault();
        e.target.style.color = "black";
      });

      item.addEventListener("click", e => {
        e.stopPropagation();
        e.preventDefault();
        if (colorizePossible) {
          e.target.style.border = `3px solid ${getRandomColor()}`;
        } else if (removePossible) {
          e.target.remove();
        }
      });

      item.addEventListener("dragstart", e => {
        let target = e.target;
        e.dataTransfer.setData("text", target.id);
      });

      list.appendChild(item);
    }
  },
  false
);

// Get Random Color
const getRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 17)];
  }
  return color;
};

/* DODATNI ZADATAK:
Programski generiraj #dropzone element na koji mozes drag & dropat bilo kojeg itema iz liste iz prethodnog zadatka. (maks 20 bodova)

Pridrzavanje ili ne pridrzavanje moze nadodati (+20) ili ukloniti (-10) dodatnih bodova. */

const dragoverClass = `border: 5px dashed green; width: 500px; height: 500px; background: #ebebe0;`;

const mouseleaveClass = `border: 5px dashed black; width: 500px; height: 500px; background: yellow;`;

const defaultClass = `display:block; positon:relative; width:500px; height:500px; border:5px dashed black;dashed black;`;

const dropzona = document.createElement("div");
dropzona.setAttribute("style", defaultClass);
document.body.appendChild(dropzona);

["drop", "dragover", "mouseleave"].forEach(event =>
  dropzona.addEventListener(
    event,
    e => {
      e.preventDefault();
    },
    false
  )
);


dropzona.ondragover = e => {
  e.preventDefault();
  dropzona.setAttribute("style", dragoverClass);
};

dropzona.onmouseleave = () => {
  dropzona.setAttribute("style", mouseleaveClass);
};
