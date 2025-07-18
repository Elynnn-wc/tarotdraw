const cardsData = [
  {
    title: "The Wheel of Luck 🎡",
    gameplay: "You’re on a hot streak! Fortune turns in your favor.",
    reward: `🎡 1. The Wheel of Luck\n🎯 Land any bonus round (Min bet $1)?\n💸 We credit you $10 extra, up to 3x per player!\n⚡ Auto-drop — no claims needed!`,
    img: "https://i.imgur.com/yUgJX2d.png",
  },
  {
    title: "The Fool 🃏",
    gameplay: "Risk it with a grin—sometimes, the unexpected hits big.",
    reward: `🃏 2. The Fool\n💥 Your next deposit gets a +30% bonus boost\nNo codes, no hassle — just reload and enjoy.`,
    img: "https://i.imgur.com/brkc14r.png",
  },
  {
    title: "The Tower 🛡",
    gameplay: "Standing firm brings unexpected rewards.",
    reward: `🛡️ 3. The Tower\n🎰 Play any single slot 100+ spins (any bet)\n💰 We send you $18.88 Lucky Angpao, guaranteed!\n📌 Just play — we track it for you.`,
    img: "https://i.imgur.com/WpwtwI9.png",
  },
  {
    title: "The Hermit 👁",
    gameplay: "You sense the right moment. Patterns speak to you.",
    reward: `👁️ 4. The Hermit\n💸 Deposit $20 or more to unlock a Random Credit Drop\n🎁 Mystery Angpao between $5 – $88\nSurprise included. Tricks excluded.`,
    img: "https://i.imgur.com/tIMa1sG.png",
  },
  {
    title: "The Sun🔥",
    gameplay: "You crave a big break — the stars might just answer.",
    reward: `🔥 5. The Sun\n🔥 Combo Deposits = Super Top-Up:\n$20 ➜ $28\n$50 ➜ $68\n$100 ➜ $138\n$200 ➜ $258\n$300 ➜ $368\n🚀 Power-up your play, no limits.`,
    img: "https://i.imgur.com/npss3ax.png",
  },
  {
    title: "The Moon 🌙",
    gameplay: "Be still. A gift awaits the quiet one.",
    reward: `🌙 6. The Moon\n✨ First-timer? We got you.\n🎁 Claim FREE $13.88 Credit — no deposit needed.\n(One-time gift. Just say hi.)`,
    img: "https://i.imgur.com/DAoe2BT.png",
  },
];

const drawSection = document.getElementById('draw-section');
const publicSection = document.getElementById('public-section');
const rewardModal = document.getElementById('rewardModal');
const modalContent = document.getElementById('modalContent');
const doneBtn = document.getElementById('doneBtn');
let resetClicks = 0;

// 显示公开区
cardsData.forEach(card => {
  const publicCard = document.createElement('div');
  publicCard.className = 'public-card';
  publicCard.innerHTML = `
    <img src="${card.img}" alt="${card.title}" />
    <div class="title">${card.title}</div>
    <div class="gameplay">${card.gameplay}</div>
  `;
  publicSection.appendChild(publicCard);
});

// 随机洗牌
const shuffled = [...cardsData].sort(() => Math.random() - 0.5);

// 抽奖卡
shuffled.forEach((card) => {
  const cardEl = document.createElement('div');
  cardEl.className = 'card';
  cardEl.innerHTML = `
    <div class="card-inner">
      <div class="card-back"></div>
      <div class="card-front" style="background-image: url('${card.img}')"></div>
    </div>
  `;

  cardEl.addEventListener('click', () => {
    if (sessionStorage.getItem('hasDrawn')) {
      alert("You already drew a card!");
      return;
    }

    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
    cardEl.classList.add('selected', 'flipped');
    sessionStorage.setItem('hasDrawn', 'true');

    setTimeout(() => {
      showReward(card.reward);
    }, 1500);
  });

  drawSection.appendChild(cardEl);
});

function showReward(content) {
  modalContent.innerText = content;
  rewardModal.classList.add('show');
  doneBtn.disabled = true;
}

function copyReward() {
  navigator.clipboard.writeText(modalContent.innerText).then(() => {
    alert("Copied!");
    doneBtn.disabled = false;
  });
}

function closeModal() {
  rewardModal.classList.remove('show');
}

document.getElementById('resetZone').addEventListener('click', () => {
  resetClicks++;
  if (resetClicks >= 5) {
    sessionStorage.removeItem('hasDrawn');
    alert('Draw reset successfully!');
    location.reload();
  }
});
