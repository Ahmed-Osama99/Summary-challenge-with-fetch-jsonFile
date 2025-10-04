const DOM = {
  endScore: document.querySelector(".end-result"),
  summaryContainer: document.querySelector(".summary"),
  //   reactionScore: document.querySelector(".reaction .score"),
  //   memoryScore: document.querySelector(".memory .score"),
  //   verbalScore: document.querySelector(".verbal .score"),
  //   visualScore: document.querySelector(".visual .score"),
};

async function fetchScores() {
  try {
    let finalScore = 0;
    const response = await fetch("data.json");
    const result = await response.json();
    // console.log(result)
    result.forEach((element) => {
      finalScore += element.score;
      createSummary(element);
    });
    let averageScore = finalScore / result.length;
    startCount(DOM.endScore, averageScore);
  } catch (error) {
    console.log(error);
  }
}

function startCount(el, score) {
  score = parseInt(score) || 0;
  if (score <= 0) {
    el.textContent = 0;
    return; // Exit if score is invalid
  }
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == score) {
      console.log(score);
      clearInterval(count);
    }
  }, 500 / score);
}

function createSummary(element) {
  // create elements
  const summaryDiv = document.createElement("div");
  const categorySpan = document.createElement("span");
  const image = document.createElement("img");
  const scoreContainer = document.createElement("div");
  const scoreSpan = document.createElement("span");
  const totalSpan = document.createElement("span");
  // create class names
  categorySpan.className = "category";
  scoreContainer.className = "sum-score";
  scoreSpan.className = "score";
  totalSpan.className = "total";
  // render summary data
  image.src = element.icon;
  summaryDiv.className = element.category.toLowerCase();
  totalSpan.textContent = " / 100";
  //   categorySpan.appendChild(image)
  categorySpan.append(image, element.category);
  scoreContainer.append(scoreSpan, totalSpan);
  summaryDiv.append(categorySpan, scoreContainer);
  DOM.summaryContainer.appendChild(summaryDiv);
  console.log(summaryDiv);
  // update data dynamically 
  startCount(scoreSpan, element.score);
}

fetchScores();
