const start = document.getElementById("start");
const loading = document.getElementById("loading");
const main = document.getElementById("main");

const enterBtn = document.getElementById("enterBtn");

const slots = document.querySelectorAll(".slot");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalBackdrop = document.getElementById("modalBackdrop");

const g1 = document.getElementById("g1");
const g2 = document.getElementById("g2");
const g3 = document.getElementById("g3");
const g4 = document.getElementById("g4");
const infoBox = document.getElementById("infoBox");

// BGM
const bgm = document.getElementById("bgm");
const bgmToggle = document.getElementById("bgmToggle");
const bgmVolume = document.getElementById("bgmVolume");

let mainEntered = false;

function show(el){ el.classList.remove("hidden"); }
function hide(el){ el.classList.add("hidden"); }

function goMain(){
  hide(loading);
  show(main);

  bgm.volume = Number(bgmVolume.value);
  bgm.play().catch(()=>{});
  mainEntered = true;
}

enterBtn.addEventListener("click", () => {
  hide(start);
  show(loading);
  setTimeout(goMain, 4000);
});

bgmVolume.addEventListener("input", () => {
  bgm.volume = Number(bgmVolume.value);
});

bgmToggle.addEventListener("click", () => {
  if(!mainEntered) return;
  if(bgm.paused) bgm.play().catch(()=>{});
  else bgm.pause();
});

// 이미지 없으면 깨지지 않게
function safeImg(imgEl, src){
  imgEl.src = src;
  imgEl.onerror = () => {
    imgEl.removeAttribute("src");
  };
}

slots.forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.key; // a,b,c,d,e,f

    // ✅ a1~a4 자동 로딩
    safeImg(g1, `${key}1.png`);
    safeImg(g2, `${key}2.png`);
    safeImg(g3, `${key}3.png`);
    safeImg(g4, `${key}4.png`);

    // 정보칸은 너가 나중에
    infoBox.textContent = "";

    show(modal);
  });
});

closeModal.addEventListener("click", () => hide(modal));
modalBackdrop.addEventListener("click", () => hide(modal));

window.addEventListener("keydown", (e) => {
  if(e.key === "Escape") hide(modal);
});