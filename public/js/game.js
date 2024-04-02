const userMainInput = document.querySelector(".main__user-input");
const mainContainer = document.querySelector(".main__container");
const startText = document.querySelector(".main__start-text");
const popup = document.querySelector(".main__popup-container");
const popupX = document.querySelector(".main__popup-xmark");
const partes = document.querySelectorAll(".partes");
const btnRestart = document.querySelector(".main__btn--restart");
const btnAnother = document.querySelector(".main__btn--another");
const actualTime = document.querySelector(".actual-time");
const accuracy = document.querySelector(".accuracy");
const wpm = document.querySelector(".wpm");
const popupTime = document.querySelector(".main__popup-time");
const popupAcc = document.querySelector(".main__popup-accuracy");
const popupWpm = document.querySelector(".main__popup-wpm");
const caps = document.querySelector(".main__caps");
const chars = document.querySelector(".main__popup-chars");
const charsCor = document.querySelector(".main__popup-chars-cor");
const charsInc = document.querySelector(".main__popup-chars-inc");

//inicializaciones
let counter = 0; //para ir contando las letras
let correctCounter = 0; //letras correctas
let incorrectCounter = 0; //letras incorrectas
let seconds = 0; //tiempo
let start = false; //si es false la primera letra tiene un borde izq, cuando sea true se lo saco
let start2 = false; //para q una vez q el user toque una tecla arranque todo
let time; //nombre del timer, asi desps lo puedo frenar (con clear)
let firstLetter = false; //para saber si ya se toco la primer letra
let finish = false; //creo esta variable para poder sacarle el letter border a la ultima letra
userMainInput.disabled = true; //el input empieza inhabilitado, solo se habilita con el start button

//para q empieze el cursor en la primera letra
partes[counter].classList.add("first-letter-border");
userMainInput.disabled = false;
userMainInput.focus();

//para las mayusculas
document.addEventListener("keydown", (e) => {
  if (e.key == "CapsLock") {
    caps.classList.toggle("disappear");
  }
});

//boton para otra frase
btnAnother.addEventListener("click", function () {
  location.reload();
});

//boton para cerrar el popup
popupX.addEventListener("click", function () {
  // location.reload();
  mainContainer.style.filter = "blur(0)";
  popup.classList.remove("appear");
});

//funcion principal
userMainInput.addEventListener("keydown", (e) => {
  if (!start2) {
    time = setInterval(function () {
      seconds++;
      //escribo los segundos q voy
      actualTime.innerText = seconds + "s";
    }, 1000);
    startText.classList.add("disappear");
    start2 = true;
  }

  if (e.key == partes[counter].innerText) {
    //veo si coincide la letra del user con la del text
    partes[counter].style.color = "green";
    correctCounter++;
  } else if (e.code == "Space" && partes[counter].innerHTML == "&nbsp;") {
    //veo si es un espacio
    correctCounter++;
  } else if (
    e.key != "Backspace" &&
    e.key != "Shift" &&
    e.key != "Dead" &&
    e.key != "CapsLock"
  ) {
    //si la letra esta equivocada
    partes[counter].style.color = "red";
    incorrectCounter++;
  }

  //si presiono la tecla borrar
  if (e.key == "Backspace") {
    if (counter != 0) {
      counter--;
      if (partes[counter].style.color == "green") {
        correctCounter--;
      } else if (partes[counter].style.color == "red") {
        //para q el contador de letras incorrectas no pueda ser negativo
        if (incorrectCounter != 0) {
          incorrectCounter--;
        } else {
          incorrectCounter = 0;
        }
      } else {
        correctCounter--; //para los espacios, q no son ni verdes ni rojos
      }
      partes[counter].style.color = "black";
      partes[counter + 1].style.color = "black";
      partes[counter].classList.remove("letter-border");
    }

    // if (counter == 0) {
    //   partes[counter].classList.add("first-letter-border");
    // }
  } else if (e.key == "Shift" || e.key == "Dead" || e.key == "CapsLock") {
    //si presiono el shift o el acento, no suman al contador
    counter = counter;
  } else {
    counter++;
  }

  // para sacar o agregar el borde izquierdo de la primera letra
  if (counter != 0) {
    partes[0].classList.remove("first-letter-border");
  }
  if (counter == 0) {
    partes[0].classList.add("first-letter-border");
  }

  //para la linea de la letra q esta focus
  if (counter != 0 && !finish) {
    partes[counter - 1].classList.add("letter-border");
    if (firstLetter && counter > 1) {
      partes[counter - 2].classList.remove("letter-border");
    }
  }
  firstLetter = true;

  // console.log(counter);
  // console.log(incorrectCounter);
  // console.log(correctCounter);

  //al teminar
  if (counter == partes.length) {
    partes[counter - 1].classList.remove("letter-border");
    userMainInput.disabled = true;
    finish = true;
    clearInterval(time); //borro el intervalo
    //cambios visuales q ocurren al terminar
    mainContainer.style.filter = "blur(10px)";
    popup.classList.add("appear");
    popup.style.animation = "popup-bright 2s";
    popupTime.innerText = seconds + "s";
    popupAcc.innerText = ((correctCounter * 100) / counter).toFixed(1) + "%";
    popupWpm.innerText = (((correctCounter / 5) * 60) / seconds).toFixed(1);
    chars.innerText = counter;
    charsCor.innerText = correctCounter;
    charsInc.innerText = incorrectCounter;
  }

  //escribo las stats
  if (counter == 0) {
    accuracy.innerText = 0 + "%";
  } else {
    accuracy.innerText = ((correctCounter * 100) / counter).toFixed(1) + "%";
  }
  if (seconds != 0) {
    wpm.innerText = (((correctCounter / 5) * 60) / seconds).toFixed(1);
  } else {
    wpm.innerText = 0;
  }
});

//boton para repetir la misma frase
btnRestart.addEventListener("click", () => {
  if (counter != 0) {
    partes[counter - 1].classList.remove("letter-border");
  }
  //le agrego el borde izq a la primera letra
  partes[0].classList.add("first-letter-border");

  //pongo todas las letras en color negro
  for (i = 0; i < counter; i++) {
    partes[i].style.color = "black";
  }

  userMainInput.disabled = false;
  userMainInput.focus();
  clearInterval(time); //borro el intervalo
  actualTime.innerText = "--";
  accuracy.innerText = "--";
  wpm.innerText = "--";

  //reinicio contadores y variables
  counter = 0;
  correctCounter = 0;
  incorrectCounter = 0;
  seconds = 0;
  start = false;
  start2 = false;
  time;
  firstLetter = false;
  finish = false;
});
