const arrayContainer = document.getElementById("array-container");
const arrowContainer = document.getElementById("arrow-container");
const runBtn = document.getElementById("runBtn");
const stepBtn = document.getElementById("stepBtn");
const pauseBtn = document.getElementById("pauseBtn");
const setArrayBtn = document.getElementById("setArrayBtn");
const arrayInput = document.getElementById("arrayInput");
const iValue = document.getElementById("i-value");
const jValue = document.getElementById("j-value");

let arr = [5, 1, 4, 2, 8];
let i = 0, j = 0;
let interval;
let delay = 1000;

// Build UI
function createArrayUI() {
  arrayContainer.innerHTML = "";
  arrowContainer.innerHTML = "";
  arr.forEach(() => {
    const arrow = document.createElement("div");
    arrow.className = "arrow";
    arrow.innerHTML = "⬆";
    arrowContainer.appendChild(arrow);
  });

  arr.forEach(num => {
    const box = document.createElement("div");
    box.className = "number-box";
    box.innerText = num;
    arrayContainer.appendChild(box);
  });
  updateLoopVars();
}
createArrayUI();

function highlightLine(line) {
  document.querySelectorAll("code span").forEach(span => span.classList.remove("highlight"));
  document.querySelector(`code span[data-line="${line}"]`).classList.add("highlight");
}

function showComparison(a, b) {
  document.querySelectorAll(".number-box").forEach(box => box.classList.remove("compare"));
  document.querySelectorAll(".arrow").forEach(arrow => arrow.classList.remove("active"));

  const boxes = document.querySelectorAll(".number-box");
  const arrows = document.querySelectorAll(".arrow");

  boxes[a].classList.add("compare");
  boxes[b].classList.add("compare");
  arrows[a].classList.add("active");
  arrows[b].classList.add("active");
}

function swapUI(a, b) {
  const boxes = document.querySelectorAll(".number-box");
  const temp = boxes[a].innerText;
  boxes[a].innerText = boxes[b].innerText;
  boxes[b].innerText = temp;
}

function updateLoopVars() {
  iValue.innerText = `i = ${i}`;
  jValue.innerText = `j = ${j}`;
}

async function bubbleSortStep() {
  if (i < arr.length - 1) {
    if (j < arr.length - i - 1) {
      highlightLine(3);
      showComparison(j, j + 1);
      updateLoopVars();

      await new Promise(res => setTimeout(res, delay));

      highlightLine(4);
      if (arr[j] > arr[j + 1]) {
        highlightLine(5);
        await new Promise(res => setTimeout(res, delay / 2));

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapUI(j, j + 1);
      }

      j++;
    } else {
      j = 0;
      i++;
    }
  } else {
    clearInterval(interval);
    highlightLine(11);
  }
}

runBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = setInterval(bubbleSortStep, delay * 1.5);
});

pauseBtn.addEventListener("click", () => clearInterval(interval));

stepBtn.addEventListener("click", bubbleSortStep);

speedSlider.addEventListener("input", (e) => {
  delay = parseInt(e.target.value);
});

setArrayBtn.addEventListener("click", () => {
  const values = arrayInput.value.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v));
  if (values.length > 0) {
    arr = values;
    i = 0;
    j = 0;
    createArrayUI();
    clearInterval(interval);
    highlightLine(1);
  }
});
