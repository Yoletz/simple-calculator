const containerChildren = document.querySelectorAll("#container > *");

for (const child of containerChildren) {
  child.style.gridArea = child.id;
}