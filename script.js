const containerChildren = document.querySelectorAll("#container > *");
const buttons = document.querySelectorAll("button");
const text = document.querySelector("#text");
const icons = document.querySelectorAll("#oper-icon > *");

let ans = null;
let currentOperator = "";
let lastValue = false;

function displayText(btn) {

  if (lastValue) {
    text.textContent = "";
    lastValue = false;
  }

  if (btn.id === "clear") {
    text.textContent = "";
    return;
  }

  if (btn.id === "zero" && text.textContent === "0") {
    return
  }

  if (text.textContent.length === 15) {
    return;
  }

  if (btn.className === "decimal") {
    text.textContent += btn.textContent;
  } else if (btn.id === "point") {
    if (text.textContent.match(/\./)) {
      return;
    }
    text.textContent += btn.textContent;
  } else if (btn.className === "operate") {
    operate(btn.id, text.textContent);
  }
}

function operate(symbol, txt) {
  if (!currentOperator) {
    ans = Number(txt);
    currentOperator = symbol;
  } else {
    switch (currentOperator) {
      case "add":
        ans += Number(txt);
        break;
      case "sub":
        ans -= Number(txt);
        break;
      case "mul":
        ans *= Number(txt);
        break;
      case "div":
        ans /= Number(txt);
        break;
    }
  }
  text.textContent = ans;
  lastValue = true;

  if (symbol === "equals") {
    ans = null;
    currentOperator = "";
  }
}

for (const child of containerChildren) {
  child.style.gridArea = child.id;
}

function pressedButton(button) {
  button.style.transform = "translate(5px, 5px)";
  button.style.boxShadow = "none";
  displayText(button);
}

function unpressedButton(button) {
  button.style.transform = "translate(0, 0)";
  button.style.boxShadow = "5px 5px black";
}

for (const button of buttons) {
  button.addEventListener("mousedown", function (e) {
    if (e.button == 0) {
      pressedButton(button);
    }
  });
}

document.addEventListener("mouseup", function () {
  for (const button of buttons) {
    unpressedButton(button);
  }
});
