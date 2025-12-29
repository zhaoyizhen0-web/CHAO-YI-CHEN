(function () {
  const lb = document.getElementById("lightbox");
  if (!lb) return;

  const img = document.getElementById("lbImg");
  const cap = document.getElementById("lbCap");
  const close = document.getElementById("lbClose");

  function open(src, caption="") {
    img.src = src;
    img.alt = caption || "image";
    cap.textContent = caption || "";
    lb.classList.add("show");
  }
  function hide() {
    lb.classList.remove("show");
    img.src = "";
    cap.textContent = "";
  }

  document.querySelectorAll("[data-lightbox]").forEach(el => {
    el.addEventListener("click", () => open(el.dataset.src, el.dataset.cap || ""));
  });

  close?.addEventListener("click", hide);
  lb.addEventListener("click", (e) => { if (e.target === lb) hide(); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
})();
