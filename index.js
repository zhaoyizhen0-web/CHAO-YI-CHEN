(() => {
  const coverFG = document.querySelector(".coverFG");
  const categoryFG = document.querySelector(".categoryFG");
  const categories = document.querySelector(".categoryPage");

  const bgCover = document.querySelector(".bgCover");
  const bgCategory = document.querySelector(".bgCategory");

  if (!coverFG || !categoryFG || !categories || !bgCover || !bgCategory) return;

  const clamp01 = (v) => Math.max(0, Math.min(1, v));

  // ✅ 讓轉場更「柔」：用 ease 曲線，避免分界太硬
  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  const update = () => {
    const rect = categories.getBoundingClientRect();
    const vh = window.innerHeight;

    // 0 -> 1：第二頁從底部進入到頂部
    const raw = clamp01((vh - rect.top) / vh);
    const p = easeInOut(raw);

    // ✅ 背景也做 crossfade（分界線消失）
    bgCover.style.opacity = String(1 - p);
    bgCategory.style.opacity = String(p);

    // ✅ 只淡出「第一頁內容」
    coverFG.style.opacity = String(1 - p);
    coverFG.style.transform = `translateY(${p * -18}px)`;

    // ✅ 只淡入「第二頁內容」
    categoryFG.style.opacity = String(p);
    categoryFG.style.transform = `translateY(${(1 - p) * 18}px)`;
  };

  // 初始狀態
  categoryFG.style.opacity = "0";
  categoryFG.style.transform = "translateY(18px)";
  coverFG.style.opacity = "1";
  coverFG.style.transform = "translateY(0px)";

  bgCover.style.opacity = "1";
  bgCategory.style.opacity = "0";

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
})();
