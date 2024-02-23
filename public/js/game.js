const userMainInput = document.querySelector(".main__user-input");
const mainContainer = document.querySelector(".main__container");
const startText = document.querySelector(".main__start-text");
const popup = document.querySelector(".main__popup-container");
const popupX = document.querySelector(".main__popup-xmark");
const partes = document.querySelectorAll(".partes");
const btnStart = document.querySelector(".main__btn--start");
const btnAnother = document.querySelector(".main__btn--another");
const actualTime = document.querySelector(".actual-time");
const accuracy = document.querySelector(".accuracy");
const wpm = document.querySelector(".wpm");
const popupTime = document.querySelector(".main__popup-time");
const popupAcc = document.querySelector(".main__popup-accuracy");
const popupWpm = document.querySelector(".main__popup-wpm");

//inicializaciones
let counter = 0; //para ir contando las letras
let correctCounter = 0; //letras correctas
let incorrectCounter = 0; //letras incorrectas
let seconds = 0; //tiempo
let start = false; //si es false la primera letra tiene un borde izq, cuando sea true se lo saco
let time; //nombre del timer, asi desps lo puedo frenar (con clear)
let firstLetter = false; //para saber si ya se toco la primer letra
let finish = false; //creo esta variable para poder sacarle el letter border a la ultima letra
userMainInput.disabled = true; //el input empieza inhabilitado, solo se habilita con el start button

//boton para iniciar el juego
btnStart.addEventListener("click", function () {
  time = setInterval(function () {
    seconds++;
    //escribo los segundos q voy
    actualTime.innerText = seconds + "s";
  }, 1000);
  userMainInput.disabled = false;
  userMainInput.focus();
  partes[counter].classList.add("first-letter-border");
  startText.classList.add("disappear");
});

//boton para otra frase
btnAnother.addEventListener("click", function () {
  location.reload();
});

//boton para cerrar el popup
popupX.addEventListener("click", function () {
  mainContainer.style.filter = "blur(0)";
  popup.classList.remove("appear");
});

//funcion principal
userMainInput.addEventListener("keydown", (e) => {
  if (!start) {
    partes[counter].classList.remove("first-letter-border"); //le saco el borde izq a la primer letra
  }
  start = true;

  if (e.key == partes[counter].innerText) {
    //veo si coincide la letra del user con la del text
    partes[counter].style.color = "green";
    correctCounter++;
  } else if (e.code == "Space" && partes[counter].innerHTML == "&nbsp;") {
    //veo si es un espacio
    correctCounter++;
  } else if (e.key != "Backspace" && e.key != "Shift" && e.key != "Dead") {
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
  } else if (e.key == "Shift" || e.key == "Dead") {
    //si presiono el shift o el acento, no suman al contador
    counter = counter;
  } else {
    counter++;
  }

  //para la linea de la letra q esta focus
  if (counter != 0 && !finish) {
    partes[counter - 1].classList.add("letter-border");
    if (firstLetter && counter > 1) {
      partes[counter - 2].classList.remove("letter-border");
    }
  }
  firstLetter = true;

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
    popupTime.innerText = seconds;
    popupAcc.innerText = ((correctCounter * 100) / counter).toFixed(1) + "%";
    popupWpm.innerText = (((correctCounter / 5) * 60) / seconds).toFixed(1);
  }

  //escribo las stats
  if (counter == 0) {
    accuracy.innerText = 0 + "%";
  } else {
    accuracy.innerText = ((correctCounter * 100) / counter).toFixed(1) + "%";
  }
  wpm.innerText = (((correctCounter / 5) * 60) / seconds).toFixed(1);
});
