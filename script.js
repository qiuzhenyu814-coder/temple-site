 const jiaBox   = document.getElementById('jia-box');
const resultEl = document.getElementById('result');
const poemBox  = document.getElementById('poem-box');
const buttons  = document.querySelectorAll('.lottery-buttons button');

let canDraw = false;
let selectedNumber = null;

// 一開始按鈕全部關閉
buttons.forEach(btn => {
  btn.disabled = true;
  btn.classList.add('disabled');
});

// 擲筊
jiaBox.addEventListener('click', () => {
  // 搖筊動畫
  jiaBox.classList.add('shaking');
  setTimeout(() => jiaBox.classList.remove('shaking'), 600);

  const r = Math.random();
  let text = "";

  if (r < 0.4) {
    // 聖筊：可以取籤，順便決定第幾籤（1~20）
    canDraw = true;
    selectedNumber = Math.floor(Math.random() * 20) + 1;
    text = `🎉 聖筊 · 可以取籤（第 ${selectedNumber} 籤）`;
  } else if (r < 0.75) {
    // 笑筊
    canDraw = false;
    selectedNumber = null;
    text = "😆 笑筊 · 請重新擲筊";
  } else {
    // 陰筊
    canDraw = false;
    selectedNumber = null;
    text = "🌑 陰筊 · 暫時不宜求問";
  }

  resultEl.textContent = text;

  // 控制按鈕開關
  buttons.forEach(btn => {
    btn.disabled = !canDraw;
    btn.classList.toggle('disabled', !canDraw);
  });

  // 不可取籤就收起籤詩
  if (!canDraw) {
    poemBox.classList.remove('show');
    poemBox.innerHTML = "";
  }
});

// 顯示籤詩
function showPoem(num) {
  if (!canDraw) return;   // 沒聖筊就不讓看

  const imgName = `籤詩${num}.png`;  // 檔名：籤詩1.png ~ 籤詩20.png
  poemBox.innerHTML = `<img src="${imgName}" alt="第 ${num} 籤">`;
  poemBox.classList.add('show');
}

// 點籤詩 → 關掉籤詩
poemBox.addEventListener('click', () => {
  poemBox.classList.remove('show');
  poemBox.innerHTML = "";
});

// 給 HTML 的 onclick 用
window.showPoem = showPoem;
