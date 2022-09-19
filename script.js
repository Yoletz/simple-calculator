const containerChildren = document.querySelectorAll("#container > *");
const buttons = document.querySelectorAll("button");

for (const child of containerChildren) {
  child.style.gridArea = child.id;
}

for (const button of buttons) {
  button.addEventListener("mousedown", function (e) {
    if (e.button == 0) {
      button.style.transform = "translate(5px, 5px)";
      button.style.boxShadow = "none";
    }
  });
}

document.addEventListener("mouseup", function () {
  for (const button of buttons) {
  button.style.transform = "translate(0, 0)";
  button.style.boxShadow = "5px 5px black";
  }
});