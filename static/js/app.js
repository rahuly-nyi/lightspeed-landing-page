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
  duration = 3,
} = {}) {
  document.querySelectorAll(selector).forEach((span) => {
    const target = Number(span.textContent);
    if (isNaN(target)) return;

    gsap.fromTo(
      span,
      { innerText: 0 },
      {
        innerText: target,
        duration,
        ease: "power3.out",
        snap: { innerText: 1 },
      }
    );
  });
}

/* Run counter */
runDigitCounter();

// Gsap ScrollTrigger
gsap.to(".step-1", {
  y: 100,
  opacity: 0,
  scrollTrigger: {
    trigger: ".step-1",
    start: "top 15%",
    end: "bottom 15%",
    markers: false,
    scrub: true,
  },
});
gsap.to(".step-2", {
  y: 100,
  opacity: 0,
  scrollTrigger: {
    trigger: ".step-2",
    start: "top 15%",
    end: "bottom 15%",
    markers: false,
    scrub: true,
  },
});
gsap.to(".step-3", {
  y: 100,
  opacity: 0,
  scrollTrigger: {
    trigger: ".step-3",
    start: "top 15%",
    end: "bottom 15%",
    markers: false,
    scrub: true,
  },
});
gsap.to(".step-4", {
  scale: 0.7,
  opacity: 0,
  scrollTrigger: {
    trigger: ".step-4",
    start: "top 15%",
    end: "bottom 15%",
    markers: false,
    scrub: true,
  },
});
