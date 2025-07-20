// Animated flower tiling over full viewport

const patternURL = 'images/flower_pattern.png'; // your filled and transparent PNG
const FLOWER_SIZE = window.innerWidth < 600 ? 220 : 140; // Fewer flowers on mobile
const ROTATE_SPEED = 0.2; // radians per second

function createFlowerTile(x, y, size, initialAngle) {
  const img = document.createElement('img');
  img.src = patternURL;
  img.width = size;
  img.height = size;
  img.style.position = 'absolute';
  img.style.left = `${x}px`;
  img.style.top = `${y}px`;
  img.style.pointerEvents = 'none';
  img.style.willChange = 'transform';
  img.dataset.angle = initialAngle.toString();
  return img;
}

function setupFlowers() {
  const overlay = document.querySelector('.flower-overlay');
  overlay.innerHTML = '';
  const w = window.innerWidth, h = window.innerHeight;
  const xCols = Math.ceil(w / FLOWER_SIZE) + 1;
  const yRows = Math.ceil(h / FLOWER_SIZE) + 1;
  let flowers = [];
  for (let y = 0; y < yRows; ++y) {
    for (let x = 0; x < xCols; ++x) {
      const offsetX = x * FLOWER_SIZE;
      const offsetY = y * FLOWER_SIZE;
      // Slightly random angle for a playful look
      const initialAngle = (Math.random() * Math.PI * 2);
      const img = createFlowerTile(offsetX, offsetY, FLOWER_SIZE, initialAngle);
      overlay.appendChild(img);
      flowers.push(img);
    }
  }
  return flowers;
}

let flowerNodes = [];
function animateFlowers(ts) {
  ts = ts / 1000.0; // seconds
  flowerNodes.forEach((img, i) => {
    const baseAngle = parseFloat(img.dataset.angle);
    // Alternate even/odd rows direction, base angle makes each flower a bit unique
    const spin = ((i % 2 === 0) ? 1 : -1) * (ts * ROTATE_SPEED) + baseAngle;
    img.style.transform = `rotate(${spin}rad)`;
  });
  requestAnimationFrame(animateFlowers);
}

// Initial setup and on resize
function initOverlay() {
  flowerNodes = setupFlowers();
}
window.addEventListener('resize', initOverlay);
window.addEventListener('DOMContentLoaded', () => {
  initOverlay();
  requestAnimationFrame(animateFlowers);
});
