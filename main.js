const cards = [
  {
    title: "The Wheel of Luck 🎡",
    meaning: "You’re on a hot streak! Fortune turns in your favor.",
    image: "images/card1.png",
    reward: "Prize A"
  },
  {
    title: "The Watcher’s Eye 👁",
    meaning: "You sense the right moment. Patterns speak to you.",
    image: "images/card2.png",
    reward: "Prize B"
  },
  {
    title: "The Tower Guardian 🛡",
    meaning: "Standing firm brings unexpected rewards.",
    image: "images/card3.png",
    reward: "Prize C"
  },
  {
    title: "The Trickster’s Deal 🃏",
    meaning: "Risk it with a grin—sometimes, the unexpected hits big.",
    image: "images/card4.png",
    reward: "Prize D"
  },
  {
    title: "The Flame of Desire 🔥",
    meaning: "You crave a big break — the stars might just answer.",
    image: "images/card5.png",
    reward: "Prize E"
  },
  {
    title: "The Silent Moon 🌙",
    meaning: "Be still. A gift awaits the quiet one.",
    image: "images/card6.png",
    reward: "Prize F"
  }
];

let hasDrawn = false;
let copyAllowed = false;
let resetCount = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(card, index) {
  const cardEl = document.createElement("div");
  cardEl.className = "card";
  cardEl.dataset.index = index;

  cardEl.innerHTML = `
    <div class="card-inner">
      <div class="card-front" style="background-image: url('${card.image}')"></div>
      <div class="card-back"></div>
    </div>
  `;

  cardEl.addEventListener("click", () => {
    if (hasDrawn) return;
    hasDrawn = true;
    cardEl.classList.add("flipped");

    setTimeout(() => {
      showModal(card.reward);
    }, 3000); // delay after flip
  });

  return cardEl;
}

function showModal(rewardText) {
  const modal = document.getElementById("rewardModal");
  const content = document.getElementById("modalContent");
  const doneBtn = document.getElementById("doneBtn");

  content.textContent = `Your Reward:\n${rewardText}`;
  modal.classList.add("show");
  doneBtn.disabled = true;
  copyAllowed = false;
}

function closeModal() {
  if (!copyAllowed) return;
  document.getElementById("rewardModal").classList.remove("show");
}

function copyReward() {
  const text = document.getElementById("modalContent").textContent;
  navigator.clipboard.writeText(text).then(() => {
    copyAllowed = true;
    document.getElementById("doneBtn").disabled = false;
  });
}

function renderDrawSection() {
  const drawContainer = document.getElementById("draw-section");
  const shuffled = shuffle([...cards]);
  shuffled.forEach((card, i) => {
    drawContainer.appendChild(createCard(card, i));
  });
}

function renderPublicCards() {
  const publicContainer = document.getElementById("public-section");
  cards.forEach((card) => {
    const el = document.createElement("div");
    el.className = "public-card";
    el.innerHTML = `
      <img src="${card.image}" alt="${card.title}">
      <div class="title">${card.title}</div>
      <div class="gameplay">${card.meaning}</div>
    `;
    publicContainer.appendChild(el);
  });
}

// Admin reset logic
document.getElementById("resetZone").addEventListener("click", () => {
  resetCount++;
  if (resetCount >= 5) {
    const pwd = prompt("Enter admin password:");
    if (pwd === "royale2025") {
      location.reload();
    }
    resetCount = 0;
  }
});

renderDrawSection();
renderPublicCards();
