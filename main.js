
const cardsData = [
  {
    name: "The Wheel of Luck",
    image: "https://i.ibb.co/vcbXxkr/1.png",
    meaning: "You’re on a hot streak! Fortune turns in your favor.",
    prizeCode: "Prize A",
  },
  {
    name: "The Watcher’s Eye",
    image: "https://i.ibb.co/JFk9MpK/2.png",
    meaning: "You sense the right moment. Patterns speak to you.",
    prizeCode: "Prize B",
  },
  {
    name: "The Tower Guardian",
    image: "https://i.ibb.co/QYRDW3Y/3.png",
    meaning: "Standing firm brings unexpected rewards.",
    prizeCode: "Prize C",
  },
  {
    name: "The Trickster’s Deal",
    image: "https://i.ibb.co/WBjpDgv/4.png",
    meaning: "Risk it with a grin—sometimes, the unexpected hits big.",
    prizeCode: "Prize D",
  },
  {
    name: "The Flame of Desire",
    image: "https://i.ibb.co/YXWjvZW/5.png",
    meaning: "You crave a big break — the stars might just answer.",
    prizeCode: "Prize E",
  },
  {
    name: "The Silent Moon",
    image: "https://i.ibb.co/fp3K08y/6.png",
    meaning: "Be still. A gift awaits the quiet one.",
    prizeCode: "Prize F",
  },
];

const backImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-VMGhrkIYAz3Rua633jI8s_zcqnP2fzYBPw&s";
let hasFlipped = false;
let copySuccess = false;
let clickCount = 0;

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function renderDrawSection() {
  const shuffled = shuffle(cardsData);
  const drawSection = document.getElementById("draw-section");
  drawSection.innerHTML = "";

  shuffled.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

    const inner = document.createElement("div");
    inner.className = "card-inner";
    inner.addEventListener("click", () => flipCard(inner, card));

    const front = document.createElement("div");
    front.className = "card-front";
    const frontImg = document.createElement("img");
    frontImg.src = card.image;
    front.appendChild(frontImg);

    const back = document.createElement("div");
    back.className = "card-back";
    const backImg = document.createElement("img");
    backImg.src = backImage;
    back.appendChild(backImg);

    inner.appendChild(front);
    inner.appendChild(back);
    cardDiv.appendChild(inner);
    drawSection.appendChild(cardDiv);
  });
}

function flipCard(inner, card) {
  if (hasFlipped) return;
  hasFlipped = true;
  inner.classList.add("flipped");

  setTimeout(() => {
    showReward(card.prizeCode);
  }, 3000);
}

function showReward(prizeCode) {
  const modal = document.getElementById("rewardModal");
  const content = document.getElementById("modalContent");
  const doneBtn = document.getElementById("doneBtn");
  content.textContent = `Your reward: ${prizeCode}`;
  doneBtn.disabled = true;
  copySuccess = false;
  modal.style.display = "flex";
}

function copyReward() {
  const text = document.getElementById("modalContent").textContent;
  navigator.clipboard.writeText(text).then(() => {
    copySuccess = true;
    document.getElementById("doneBtn").disabled = false;
  });
}

function closeModal() {
  if (!copySuccess) return;
  document.getElementById("rewardModal").style.display = "none";
}

function renderPublicSection() {
  const publicSection = document.getElementById("public-section");
  publicSection.innerHTML = "";

  cardsData.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card public-card";

    const img = document.createElement("img");
    img.src = card.image;

    const text = document.createElement("div");
    text.className = "meaning";
    text.textContent = card.meaning;

    cardDiv.appendChild(img);
    cardDiv.appendChild(text);
    publicSection.appendChild(cardDiv);
  });
}

function setupReset() {
  document.getElementById("resetZone").addEventListener("click", () => {
    clickCount++;
    if (clickCount >= 5) {
      const pw = prompt("Enter admin password to reset:");
      if (pw === "royale2025") {
        hasFlipped = false;
        renderDrawSection();
        alert("Reset successful");
      }
      clickCount = 0;
    }
  });
}

renderDrawSection();
renderPublicSection();
setupReset();
