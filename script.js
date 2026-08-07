const surpriseTexts = [
  'You are my sunshine, my best friend, and the love of my life. Happy Birthday! 🌸',
  'Every moment with you feels like a dream. Today and always, I celebrate you. 💫',
  'Your smile brightens every day. I hope this birthday brings you endless joy. ❤️',
  'I love you more than words can say. Thank you for being mine. 🌹',
  'You are beautiful, kind, and magical. I am so lucky to share life with you. ✨',
  'Your laughter is my favorite sound, and your love is my favorite home. 🏡',
  'Every day with you is a new adventure, and every moment is a gift. 🎁',
];

const heartRow = document.getElementById('heartRow');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
const cakeCard = document.querySelector('.cake-card');
const blowButton = document.querySelector('.blow-button');

let confettiPieces = [];

function resizeCanvas() {
  if (!confettiCanvas) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
if (confettiCanvas) resizeCanvas();

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createConfetti() {
  if (!confettiCanvas || !ctx) return;
  confettiPieces = [];
  const count = 30;
  for (let i = 0; i < count; i += 1) {
    confettiPieces.push({
      x: randomBetween(0, confettiCanvas.width),
      y: randomBetween(-confettiCanvas.height, 0),
      radius: randomBetween(6, 12),
      color: `hsl(${randomBetween(300, 360)}, 92%, ${randomBetween(60, 78)}%)`,
      tilt: randomBetween(-0.4, 0.4),
      tiltAngle: randomBetween(0, Math.PI),
      speed: randomBetween(1.4, 2.8),
    });
  }
}

function drawConfetti() {
  if (!confettiCanvas || !ctx) return;
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach((piece) => {
    piece.y += piece.speed;
    piece.tiltAngle += 0.05;
    piece.x += Math.sin(piece.tiltAngle) * 1.1;
    piece.tilt = Math.sin(piece.tiltAngle) * 12;

    if (piece.y > confettiCanvas.height + 20) {
      piece.y = randomBetween(-20, -5);
      piece.x = randomBetween(0, confettiCanvas.width);
    }

    ctx.beginPath();
    ctx.lineWidth = piece.radius * 1.2;
    ctx.strokeStyle = piece.color;
    ctx.moveTo(piece.x + piece.tilt, piece.y);
    ctx.lineTo(piece.x + piece.tilt + piece.radius / 2, piece.y + piece.radius);
    ctx.stroke();
  });
  requestAnimationFrame(drawConfetti);
}

function pickRandomMessage(exclude) {
  const filtered = surpriseTexts.filter((text) => text !== exclude);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

if (heartRow) {
  heartRow.addEventListener('click', (event) => {
    const card = event.target.closest('.heart-card');
    if (!card) return;

    const backFace = card.querySelector('.heart-card__back');
    const previousMessage = backFace.textContent;
    const nextMessage = pickRandomMessage(previousMessage);

    if (!card.classList.contains('flipped')) {
      backFace.textContent = nextMessage;
      card.classList.add('flipped');
    } else {
      card.classList.remove('flipped');
    }

    if (ctx) createConfetti();
  });
}

function blowCandle() {
  if (!cakeCard || cakeCard.classList.contains('blown')) return;
  cakeCard.classList.add('blown');
  if (ctx) createConfetti();
}

if (blowButton) {
  blowButton.addEventListener('click', blowCandle);
}

if (ctx) {
  createConfetti();
  requestAnimationFrame(drawConfetti);
}
