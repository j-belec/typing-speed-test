const userMainInput = document.querySelector(".main__user-input");
const partes = document.querySelectorAll(".partes");
const btnStart = document.querySelector(".main__btn--start");
const btnAnother = document.querySelector(".main__btn--another");
const actualTime = document.querySelector(".actual-time");
const accuracy = document.querySelector(".accuracy");
const wpm = document.querySelector(".wpm");

let contador = 0; //para ir contando las letras
let acertadas = 0; //letras acertadas
let equivocadas = 0; //letras equivocadas
let segundos = 0; //para el tiempo
let inicio = false; //si es false es q no se puede jugar
let time;
let firstLetter = false;
let finish = false; //creo esta variable para poder sacarle el letter border a la ultima letra

userMainInput.disabled = true;

//boton para iniciar el juego
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

//boton para otra frase
btnAnother.addEventListener("click", function () {
  location.reload();
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
  } else if (e.key != "Backspace" && e.key != "Shift" && e.key != "Dead") {
    //si la letra esta equivocada
    partes[contador].style.color = "red";
    equivocadas++;
  }

  console.log(contador);
  //para la ultima letra
  if (contador == partes.length - 1) {
    partes[contador - 1].classList.remove("letter-border");
    finish = true;
    userMainInput.disabled = true;
    clearInterval(time); //delete the interval
  }
  console.log(contador);

  //if i press delete key
  if (e.key == "Backspace") {
    if (contador != 0) {
      contador--;
      if (partes[contador].style.color == "green") {
        acertadas--;
      } else if (partes[contador].style.color == "red") {
        //para q no haya equivocadas negativas
        if (equivocadas != 0) {
          equivocadas--;
        } else {
          equivocadas = 0;
        }
      } else {
        acertadas--; //para los espacios q no son ni verdes ni rojos
      }
      partes[contador].style.color = "black";
      partes[contador + 1].style.color = "black";
      partes[contador].classList.remove("letter-border");

      // equivocadas--;
    }
  } else if (e.key == "Shift" || e.key == "Dead") {
    contador = contador;
  } else {
    contador++;
  }

  //for the focus letter line
  if (contador != 0 && !finish) {
    partes[contador - 1].classList.add("letter-border");
    if (firstLetter && contador > 1) {
      partes[contador - 2].classList.remove("letter-border");
    }
  }
  console.log(acertadas);
  firstLetter = true;

  //accuracy
  if (contador == 0) {
    accuracy.innerText = 0 + "%";
  } else {
    accuracy.innerText = ((acertadas * 100) / contador).toFixed(1) + "%";
  }
  console.log("timempo " + segundos);
  //wpm
  wpm.innerText = (((acertadas / 5) * 60) / segundos).toFixed(1);
});
