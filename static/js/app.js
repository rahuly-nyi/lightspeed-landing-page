// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  delay: 100,
  easing: "ease-in-out",
  anchorPlacement: "top-bottom",
  anchorOn: "window",
  anchorOnSelector: "body",
  anchorOnSelector: "body",
});

// Initialize Stats
function runDigitCounter({
  selector = ".stats .item span",
  duration = 3000,
  maxItems = 150,
} = {}) {
  const digits = Array.from(document.querySelectorAll(selector));

  if (digits.length === 0) return;
  if (digits.length > maxItems) {
    console.warn(`Max allowed items is ${maxItems}`);
    return;
  }

  digits.forEach((span) => {
    const target = parseInt(span.textContent, 10);

    if (isNaN(target) || target < 0 || target > 9) {
      console.warn("Each span must contain a single digit (0–9)");
      return;
    }

    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * target);

      span.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        span.textContent = target;
      }
    }

    requestAnimationFrame(update);
  });
}

/* Run counter */
runDigitCounter();
