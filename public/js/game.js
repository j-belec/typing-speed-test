const userMainInput = document.querySelector(".main__user-input");
const partes = document.querySelectorAll(".partes");
const btnStart = document.querySelector(".main__btn--start");
const btnAnother = document.querySelector(".main__btn--another");
const actualTime = document.querySelector(".actual-time");
const accuracy = document.querySelector(".accuracy");

let contador = 0; //para ir contando las letras
let acertadas = 0; //letras acertadas
let equivocadas = 0; //letras equivocadas
let segundos = 0; //para el tiempo
let inicio = false; //si es false es q no se puede jugar
let time;
let firstLetter = false;

userMainInput.disabled = true;

//para iniciar el juego
btnStart.addEventListener("click", function () {
  inicio = true;
  if (inicio) {
    time = setInterval(function () {
      segundos++;
      actualTime.innerText = segundos + "s";
    }, 1000);
    userMainInput.disabled = false;
    userMainInput.placeholder = "";
    userMainInput.focus();
  }
});

//main function
userMainInput.addEventListener("keydown", (e) => {
  console.log(contador);
  if (e.key == partes[contador].innerText) {
    //veo si coincide la letra del user con la del text
    partes[contador].style.color = "green";
    acertadas++;
  } else if (e.code == "Space" && partes[contador].innerHTML == "&nbsp;") {
    //veo si es un espacio
    acertadas++;
  } else {
    //si la letra esta equivocada
    partes[contador].style.color = "red";
    equivocadas++;
  }

  //para la ultima letra
  if (contador == partes.length - 1) {
    userMainInput.disabled = true;
    clearInterval(time); //delete the interval
  }

  //if i press delete key
  if (e.key == "Backspace") {
    if (contador != 0) {
      contador--;
      if (partes[contador].style.color == "green") {
        acertadas--;
      } else if (partes[contador].style.color == "red") {
        equivocadas--;
      } else {
        acertadas--; //para los espacios q no son ni verdes ni rojos
      }
      partes[contador].style.color = "black";
      partes[contador + 1].style.color = "black";
      partes[contador].classList.remove("letter-border");

      equivocadas--;
    }
  } else {
    contador++;
  }

  //for the focus letter line
  if (contador != 0) {
    partes[contador - 1].classList.add("letter-border");
    if (firstLetter && contador > 1) {
      partes[contador - 2].classList.remove("letter-border");
    }
  }
  firstLetter = true;

  if (contador == 0) {
    accuracy.innerText = 0 + "%";
  } else {
    accuracy.innerText = ((acertadas * 100) / contador).toFixed(2) + "%";
  }
});

btnAnother.addEventListener("click", function () {
  location.reload();
});
