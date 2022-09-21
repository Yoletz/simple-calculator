const containerChildren = document.querySelectorAll("#container > *");
const buttons = document.querySelectorAll("button");
const text = document.querySelector("#text");

let ans = 0;

function displayText(btn) {
  
  if (text.textContent.length === 15) {
    return;
  }

  if (btn.className === "decimal") {
    text.textContent += btn.textContent;
  } else if (btn.id === "clear") {
    text.textContent = ""
    ans = 0;
  } else if (btn.id === "point") {

    if (text.textContent.match(/\./)) {
      return;
    }
    text.textContent += btn.textContent;
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
