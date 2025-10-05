// Birds Animation
(function(){
  const birdsContainer = document.querySelector('.birds');
  if(!birdsContainer) return;
  const birdSVG = `
    <svg viewBox="0 0 64 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 24c8-4 14-12 26-12 4 0 6 1 10 3 4 2 10 2 16 0 0 0-6-1-10-4 4-2 14-4 18-2-8-6-22-6-28-3-8 4-14 0-20 2-6 2-8 7-12 10v6z" fill="black"/>
    </svg>`;

  const MAX_BIRDS = 3; // max birds on screen
  let activeBirds = 0;

  function spawnBird() {
    if(activeBirds >= MAX_BIRDS) return;
    activeBirds++;

    const bird = document.createElement('div');
    bird.className = 'bird';
    bird.innerHTML = birdSVG;

    // size
    const size = 30 + Math.random()*40; // 30-70px
    bird.style.width = size+'px';
    bird.style.height = (size*0.6)+'px';

    // start top position
    const top = 10 + Math.random()*60; // 10-70% viewport
    bird.style.top = top+'vh';

    // flight duration
    const dur = 10 + Math.random()*5; // 10-15s
    bird.style.setProperty('--dur', dur+'s');

    // vertical drift
    const drift = (Math.random()*60-30).toFixed(1)+'px';
    bird.style.setProperty('--drift', drift);

    // rotation
    const rot = (Math.random()*12-6).toFixed(1)+'deg';
    bird.style.setProperty('--rot', rot);

    birdsContainer.appendChild(bird);

    // remove after finished flight
    setTimeout(()=>{
      bird.remove();
      activeBirds--;
    }, (dur+0.5)*1000);
  }

  // spawn birds every 2-3 seconds
  setInterval(()=>{ spawnBird(); }, 2200);

  // blur birds when over text
  function blurBirds() {
    document.querySelectorAll('.bird').forEach(b=>{
      const rect = b.getBoundingClientRect();
      if(rect.top > window.innerHeight*0.3 && rect.bottom < window.innerHeight*0.7){
        b.style.filter = 'blur(2px)';
        b.style.opacity = '0.6';
      } else {
        b.style.filter = 'blur(0px)';
        b.style.opacity = '0.95';
      }
    });
    requestAnimationFrame(blurBirds);
  }
  blurBirds();

})();

// Neon Floating Hearts
const heartsContainer = document.querySelector('.hearts');
function createHeart(){
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random()*100 + 'vw';
  heart.style.fontSize = (15 + Math.random()*30)+'px';
  heart.style.animationDuration = (4 + Math.random()*4)+'s';
  heart.innerText = '❤️';
  heartsContainer.appendChild(heart);
  setTimeout(()=>heart.remove(),6000);
}
setInterval(()=>{if(Math.random()<0.4) createHeart();},500);
setInterval(()=>{if(Math.random()<0.3) createHeart();},700);



// 3D Tilt Gallery on Scroll
const galleryImgs = document.querySelectorAll('.gallery img');
window.addEventListener('scroll', ()=>{
  const scrollPos = window.scrollY;
  const maxRotate = 15;
  galleryImgs.forEach((img,idx)=>{
    const rotateY = Math.min(scrollPos/50*(idx+1), maxRotate);
    const rotateX = Math.min(scrollPos/100*(idx+1), maxRotate);
    img.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
  });
});