// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  delay: 100,
  easing: "ease-in-out",
  anchorPlacement: "top-bottom",

  disable: function () {
    return window.innerWidth < 768;
  },
});

// Gsap ScrollTrigger
window.addEventListener("load", () => {
  gsap.to(".step-1", {
    y: 100,
    opacity: 0,
    scrollTrigger: {
      trigger: ".step-1",
      start: "top 15%",
      end: "bottom 15%",
      scrub: true,
      markers: false,
      invalidateOnRefresh: true,
    },
  });

  gsap.to(".step-2", {
    y: 100,
    opacity: 0,
    scrollTrigger: {
      trigger: ".step-2",
      start: "top 15%",
      end: "bottom 15%",
      scrub: true,
      markers: false,
      invalidateOnRefresh: true,
    },
  });

  gsap.to(".step-3", {
    y: 100,
    opacity: 0,
    scrollTrigger: {
      trigger: ".step-3",
      start: "top 15%",
      end: "bottom 15%",
      scrub: true,
      markers: false,
      invalidateOnRefresh: true,
    },
  });

  gsap.to(".step-4", {
    scale: 0.7,
    opacity: 0,
    scrollTrigger: {
      trigger: ".step-4",
      start: "top 15%",
      end: "bottom 15%",
      scrub: true,
      markers: false,
      invalidateOnRefresh: true,
    },
  });

  // Recalculate positions after everything has loaded
  ScrollTrigger.refresh();
});

// Counter Configuration
const counterConfig = () => {
  const START_AT = 184;
  const END_AT = 7000;

  // Use your real start/end here (IST / Asia-Kolkata implied)
  const START_DATE = new Date("2025-12-05T00:00:00+05:30");
  const END_DATE = new Date("2026-01-12T23:59:59+05:30");

  // How often the "virtual" counter ticks
  const SLOT_MINUTES = 30; // change to 30 if you want half-hour steps

  // ------------ DATE-BASED VALUE CALC ------------
  function getApplicationsCount(now = new Date()) {
    if (now <= START_DATE) return START_AT;
    if (now >= END_DATE) return END_AT;

    const totalMs = END_DATE - START_DATE;
    const slotMs = SLOT_MINUTES * 60 * 1000;
    const totalSlots = Math.floor(totalMs / slotMs);

    const totalIncrements = END_AT - START_AT;
    const incrementsPerSlot = totalIncrements / totalSlots; // ~7.3 per hour

    const elapsedMs = now - START_DATE;
    const slotsPassed = Math.floor(elapsedMs / slotMs);

    let value = START_AT + Math.floor(slotsPassed * incrementsPerSlot);
    if (value > END_AT) value = END_AT;

    return value;
  }

  // ------------ SET DIGITS INTO SPANS ------------
  function setCounterDigits(value) {
    // 4-digit padded string: 84 → "0084"
    const digits = value.toString().padStart(4, "0").split("");

    const spans = document.querySelectorAll(".stats .item span");
    spans.forEach((span, index) => {
      const digit = digits[index] || "0";
      span.dataset.value = digit; // this is what GSAP will animate to
      span.innerText = "0"; // reset so animation always starts from 0
    });
  }

  // function setCounterDigits(value) {
  //   const items = document.querySelectorAll(".stats .item");
  //   const spans = document.querySelectorAll(".stats .item span");

  //   // Is this a 4-digit value?
  //   const isFourDigit = value >= 1000;

  //   // Toggle the FIRST box
  //   if (items[0]) {
  //     if (isFourDigit) {
  //       items[0].classList.remove("d-none"); // show when 4 digits
  //     } else {
  //       items[0].classList.add("d-none"); // hide when < 1000
  //     }
  //   }

  //   // 4-digit padded string: 84 → "0084"
  //   const digits = value.toString().padStart(4, "0").split("");

  //   spans.forEach((span, index) => {
  //     const digit = digits[index] || "0";
  //     span.dataset.value = digit; // GSAP animates to this
  //     span.innerText = "0"; // reset so animation always starts from 0
  //   });
  // }

  // ------------ GSAP COUNTER ANIMATION ------------
  function runDigitCounter({
    selector = ".stats .item span",
    duration = 5, // shorter looks snappier
  } = {}) {
    document.querySelectorAll(selector).forEach((span) => {
      const target = Number(span.dataset.value);
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

  // ------------ INITIALISE ON LOAD ------------
  const currentApplications = getApplicationsCount(); // date-based, monotonic
  setCounterDigits(currentApplications); // fills in the 4 digits

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: ".stats",
    start: "top 90%",
    once: true,
    onEnter: () => runDigitCounter(),
  });
};
counterConfig();
