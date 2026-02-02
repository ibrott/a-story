const story = [
  "It started on the first day of school.",
  "Inscription day.",
  "There was a long wait.",
  "People sitting. People talking.",
  "Two people sat facing each other.",
  "They noticed each other.",
  "Nothing more.",
  "Later that day, they went to take the bus.",
  "Same bus.",
  "Same stop.",
  "They didn’t talk.",
  "Days passed.",
  "They kept seeing each other at the same bus stop.",
  "Same time.",
  "Still no words.",
  "School started.",
  "They saw each other walking in school.",
  "In the halls.",
  "Outside.",
  "Sometimes close.",
  "Sometimes far.",
  "One day, a message was sent in a school group chat.",
  "A simple question about classes.",
  "It was the first year.",
  "A private reply came.",
  "Helpful.",
  "Kind.",
  "Names were shared.",
  "Nice to meet you.",
  "Then another message.",
  "I think I’ve seen you before.",
  "Details followed.",
  "Clothes.",
  "The bus stop.",
  "The first day.",
  "Slowly, it made sense.",
  "Oh… it was you.",
  "Yes.",
  "From that moment,",
  "they were not strangers anymore.",
  "Some people meet by chance.",
  "Some meetings take time.",
  "This one took time.",
  "It started quietly.",
  "It stayed quiet.",
  "Until it wasn’t.",
  "And now,",
  "after everything that happened,",
  "there is only one thing left to ask."
];

const textEl = document.getElementById("text");
const app = document.getElementById("app");
const question = document.getElementById("question");
const confettiCanvas = document.getElementById("confetti");

let index = 0;
let typing = false;

function typeLine(line, i = 0) {
  typing = true;
  if (i < line.length) {
    textEl.textContent += line[i];
    setTimeout(() => typeLine(line, i + 1), 28);
  } else {
    typing = false;
  }
}

document.body.addEventListener("click", () => {
  if (typing) return;
  if (index < story.length) {
    textEl.textContent = "";
    typeLine(story[index]);
    index++;
  } else {
    app.style.opacity = "0";
    setTimeout(() => {
      app.classList.add("hidden");
      question.classList.remove("hidden");
      setTimeout(() => question.style.opacity = "1", 100);
    }, 1200);
  }
});

document.getElementById("yes").addEventListener("click", () => {
  question.style.opacity = "0";
  setTimeout(() => {
    document.body.innerHTML = `
      <h1 style="text-align:center; font-size:3rem;">🎉 YES! 🎉</h1>
      <p style="text-align:center; font-size:1.5rem;">Salma, Knbgheeeeeeeek ❤️<br>You just made me the happiest person alive!</p>
      <canvas id="confetti"></canvas>
    `;
    startConfetti();
  }, 500);
});

const noBtn = document.getElementById("no");
noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * 300 - 150;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px) scale(0.9)`;
});

function startConfetti() {
  const canvas = document.getElementById("confetti");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const confetti = [];

  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10 + 5,
      color: `hsl(${Math.random()*360}, 100%, 70%)`,
      tilt: Math.random() * 10 - 10
    });
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.r, c.r);
      ctx.closePath();
      c.y += Math.random() * 5 + 2;
      c.x += Math.sin(c.y * 0.05);
      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}
