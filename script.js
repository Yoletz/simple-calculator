const containerChildren = document.querySelectorAll("#container > *");
const buttons = document.querySelectorAll("button");
const text = document.querySelector("#text");
const icons = document.querySelectorAll("#oper-icon > *");
const opButtons = document.querySelectorAll(".operate");

let ans = 0;
let currentOperator = "";
let lastValue = false;

function displayText(btn) {

  if (btn.id === "clear") {
    text.textContent = "";
    ans = 0;
    currentOperator = "";
    return;
  }

  if (btn.id === "zero" && text.textContent === "0") {
    return
  }

  if (text.textContent.length === 15) {
    return;
  }

  if (btn.id === "negative") {
    if (!lastValue) {
      const temp = -Number(text.textContent);
      text.textContent = temp;
    }
  }

  if (btn.id === "backspace") {
    if (!lastValue) {
      text.textContent = text.textContent.slice(0, text.textContent.length - 1);
    }
  }

  if (btn.className === "decimal") {
    if (lastValue) {
      text.textContent = "";
      lastValue = false;
    }
    
    if (btn.id === "point" && text.textContent.match(/\./)) {
      return;
    }

    if (btn.id === "point" && text.textContent === "") {
      text.textContent = "0.";
      return;
    }

    if (text.textContent === "0" && btn.id != "point") {
      text.textContent = btn.textContent;
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
  } else {
    if (lastValue) {
      currentOperator = symbol;
      return;
    }

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
  currentOperator = symbol;
  text.textContent = Math.round(ans * 1000) / 1000;
  lastValue = true;

  if (currentOperator === "equals") {
    currentOperator = "";
  }
}

for (const child of containerChildren) {
  child.style.gridArea = child.id;
}

for (const button of opButtons) {
  button.addEventListener("click", function () {

    for (const icon of icons) {
      icon.style.color = "#999";
      icon.style.fontWeight = "normal";
    }
    const icon = document.querySelector(`#${button.id}-icon`);
    if (icon) {
      icon.style.color = "black";
      icon.style.fontWeight = "bold";
    }
  });
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
