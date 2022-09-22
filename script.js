const containerChildren = document.querySelectorAll("#container > *");
const buttons = document.querySelectorAll("button");
const text = document.querySelector("#text");
const icons = document.querySelectorAll("#oper-icon > *");
const opButtons = document.querySelectorAll(".operate");

let ans = 0;
let currentOperator = "";
let lastValue = false;

const validKeys = ["c", "C", "+", "-", "*", "x", "X", "/", "Enter", "=", ".",
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace", "Delete"];

function displayText(btn) {

  if (btn.id === "clear") {
    text.textContent = "";
    ans = 0;
    currentOperator = "";

    clearIcons();

    return;
  }

  if (btn.id === "zero" && text.textContent === "0") {
    return
  }

  if (btn.id === "negative") {
    if (/[a-zA-Z]/.test(text.textContent)) {
      return;
    }

    const temp = -Number(text.textContent);
    text.textContent = temp;
    lastValue = false;
  }

  if (text.textContent.length === 15) {
    return;
  }

  
  if (btn.id === "backspace") {
    if (!lastValue) {
      text.textContent = text.textContent.slice(0, text.textContent.length - 1);
    }

    if (/[a-zA-Z]/.test(text.textContent)) {
      text.textContent = "";
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

    if (btn.id === "point" && (text.textContent === "" || /[a-zA-Z]/.test(text.textContent))) {
      text.textContent = "0.";
      return;
    }

    if (text.textContent === "0" && btn.id != "point" || /[a-zA-Z]/.test(text.textContent)) {
      text.textContent = btn.textContent;
      return;
    }

    text.textContent += btn.textContent;
  }
  
  if (btn.className === "operate") {

    if (text.textContent === "" || /[a-zA-Z]/.test(text.textContent)) {
      text.textContent = "Error!";
      currentOperator = "";
      ans = 0;
      clearIcons();
      return;
    }

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
        if (Number(txt) === 0) {
          text.textContent = "Oh no!"
          currentOperator = "";
          ans = 0;
          clearIcons();
          return;
        }
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
    
    clearIcons();

    const icon = document.querySelector(`#${button.id}-icon`);
    if (icon && !/[a-zA-Z]/.test(text.textContent)) {
      icon.style.color = "black";
      icon.style.fontWeight = "bold";
    }
  });
} 

function clearIcons() {
  for (const icon of icons) {
    icon.style.color = "#999";
    icon.style.fontWeight = "normal";
  }
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

window.addEventListener("keydown", function (e) {
  if (!validKeys.includes(e.key)) {
    return;
  }

  for (const button of buttons) {

    if (button.getAttribute("data-key").includes(e.key)) {

      clearIcons();

      const icon = document.querySelector(`#${button.id}-icon`);
      if (icon && !/[a-zA-Z]/.test(text.textContent)) {
        icon.style.color = "black";
        icon.style.fontWeight = "bold";
      }

      displayText(button);
      return;
    }
  }
});
