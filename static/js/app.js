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

// Scroll to top on page load
class ScrollToTopManager {
  constructor(options = {}) {
    this.options = {
      behavior: "instant", // 'instant', 'smooth', or 'auto'
      forceTop: true, // Always enforce top scroll
      useHistoryAPI: true, // Use history.scrollRestoration
      debug: false, // Log debug messages
      ...options,
    };

    this.init();
  }

  init() {
    // Disable browser's scroll restoration if enabled
    if (this.options.useHistoryAPI && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
      this.log("Browser scroll restoration disabled");
    }

    // Set up all event listeners
    this.setupEventListeners();

    // Initial scroll to top
    this.scrollToTop();

    this.log("ScrollToTopManager initialized");
  }

  setupEventListeners() {
    // On page load
    window.addEventListener("load", () => {
      this.scrollToTop();
    });

    // When page is shown (including from cache)
    window.addEventListener("pageshow", (event) => {
      if (event.persisted || this.options.forceTop) {
        setTimeout(() => this.scrollToTop(), 10);
      }
    });

    // Before page unload (optional cleanup)
    window.addEventListener("beforeunload", () => {
      if (this.options.forceTop) {
        window.scrollTo(0, 0);
      }
    });

    // DOMContentLoaded as additional safety
    document.addEventListener("DOMContentLoaded", () => {
      this.scrollToTop();
    });
  }

  scrollToTop() {
    try {
      if (this.options.behavior === "instant") {
        // For instant scroll, use scrollTo(0, 0)
        window.scrollTo(0, 0);

        // Also try scrollTo with options as fallback
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
      } else {
        // For smooth or auto behavior
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: this.options.behavior,
        });
      }

      // Additional fallback
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      this.log("Scrolled to top");
    } catch (error) {
      console.warn("Scroll to top failed:", error);
    }
  }

  log(message) {
    if (this.options.debug) {
      console.log(`[ScrollToTop] ${message}`);
    }
  }

  // Public method to manually trigger
  forceScrollToTop() {
    this.scrollToTop();
  }

  // Public method to disable
  disable() {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "auto";
    }
    this.log("ScrollToTopManager disabled");
  }
}

// Usage:
// const scrollManager = new ScrollToTopManager();
// or with options:
const scrollManager = new ScrollToTopManager({
  behavior: "instant", // 'smooth' for smooth scrolling
  debug: false,
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
// ! With date-based counter
// const counterConfig = () => {
//   const START_AT = 184;
//   const END_AT = 7000;

//   // Use your real start/end here (IST / Asia-Kolkata implied)
//   const START_DATE = new Date("2025-12-05T00:00:00+05:30");
//   const END_DATE = new Date("2026-01-12T23:59:59+05:30");

//   // How often the "virtual" counter ticks
//   const SLOT_MINUTES = 30; // change to 30 if you want half-hour steps

//   // ------------ DATE-BASED VALUE CALC ------------
//   function getApplicationsCount(now = new Date()) {
//     if (now <= START_DATE) return START_AT;
//     if (now >= END_DATE) return END_AT;

//     const totalMs = END_DATE - START_DATE;
//     const slotMs = SLOT_MINUTES * 60 * 1000;
//     const totalSlots = Math.floor(totalMs / slotMs);

//     const totalIncrements = END_AT - START_AT;
//     const incrementsPerSlot = totalIncrements / totalSlots; // ~7.3 per hour

//     const elapsedMs = now - START_DATE;
//     const slotsPassed = Math.floor(elapsedMs / slotMs);

//     let value = START_AT + Math.floor(slotsPassed * incrementsPerSlot);
//     if (value > END_AT) value = END_AT;

//     return value;
//   }

//   // ------------ SET DIGITS INTO SPANS ------------
//   function setCounterDigits(value) {
//     // 4-digit padded string: 84 → "0084"
//     const digits = value.toString().padStart(4, "0").split("");

//     const spans = document.querySelectorAll(".stats .item span");
//     spans.forEach((span, index) => {
//       const digit = digits[index] || "0";
//       span.dataset.value = digit; // this is what GSAP will animate to
//       span.innerText = "0"; // reset so animation always starts from 0
//     });
//   }

//   // function setCounterDigits(value) {
//   //   const items = document.querySelectorAll(".stats .item");
//   //   const spans = document.querySelectorAll(".stats .item span");

//   //   // Is this a 4-digit value?
//   //   const isFourDigit = value >= 1000;

//   //   // Toggle the FIRST box
//   //   if (items[0]) {
//   //     if (isFourDigit) {
//   //       items[0].classList.remove("d-none"); // show when 4 digits
//   //     } else {
//   //       items[0].classList.add("d-none"); // hide when < 1000
//   //     }
//   //   }

//   //   // 4-digit padded string: 84 → "0084"
//   //   const digits = value.toString().padStart(4, "0").split("");

//   //   spans.forEach((span, index) => {
//   //     const digit = digits[index] || "0";
//   //     span.dataset.value = digit; // GSAP animates to this
//   //     span.innerText = "0"; // reset so animation always starts from 0
//   //   });
//   // }

//   // ------------ GSAP COUNTER ANIMATION ------------
//   function runDigitCounter({
//     selector = ".stats .item span",
//     duration = 5, // shorter looks snappier
//   } = {}) {
//     document.querySelectorAll(selector).forEach((span) => {
//       const target = Number(span.dataset.value);
//       if (isNaN(target)) return;

//       gsap.fromTo(
//         span,
//         { innerText: 0 },
//         {
//           innerText: target,
//           duration,
//           ease: "power3.out",
//           snap: { innerText: 1 },
//         }
//       );
//     });
//   }

//   // ------------ INITIALISE ON LOAD ------------
//   const currentApplications = getApplicationsCount(); // date-based, monotonic
//   setCounterDigits(currentApplications); // fills in the 4 digits

//   gsap.registerPlugin(ScrollTrigger);

//   ScrollTrigger.create({
//     trigger: ".stats",
//     start: "top 90%",
//     once: true,
//     onEnter: () => runDigitCounter(),
//   });
// };
const counterConfig = () => {
  // 🔗 1. PUBLISH your sheet to the web as CSV and paste that URL here
  // File → Share → Publish to web → select the correct sheet → CSV
  const SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAUvjKAYluANYT8wtx5rWnWPPuA_1-9dfVnq5xQWmF1XatWK7TqdP3-IPNYkcZ2uTe88nnJ1r7oDQk/pub?gid=1648361970&single=true&output=csv";

  // How many header rows at the top of the sheet (usually 1)
  const HEADER_ROWS = 1;

  // Optional: if you want to add an offset (e.g. started somewhere else)
  const BASE_OFFSET = 0; // e.g. 100 if you want “100 + actual submissions”

  // ------------ GET COUNT FROM GOOGLE SHEET ------------
  async function getSubmissionCountFromSheet() {
    try {
      const res = await fetch(SHEET_CSV_URL);
      if (!res.ok) throw new Error("Network error fetching sheet");

      const csvText = await res.text();

      // Split CSV by line; each line is one row
      const rows = csvText.trim().split(/\r?\n/);

      // Subtract header row(s)
      const dataRowCount = Math.max(rows.length - HEADER_ROWS, 0);

      return BASE_OFFSET + dataRowCount;
    } catch (err) {
      console.error("Error getting submission count from sheet:", err);

      // Fallback if something breaks
      return BASE_OFFSET;
    }
  }

  // ------------ SET DIGITS INTO SPANS ------------
  function setCounterDigits(value) {
    // Pad to 4 digits: 84 → "0084"
    const digits = value.toString().padStart(4, "0").split("");

    const spans = document.querySelectorAll(".stats .item span");
    spans.forEach((span, index) => {
      const digit = digits[index] || "0";
      span.dataset.value = digit; // this is what GSAP will animate to
      span.innerText = "0"; // reset so animation always starts from 0
    });
  }

  // ------------ GSAP COUNTER ANIMATION ------------
  function runDigitCounter({
    selector = ".stats .item span",
    duration = 3, // shorter looks snappier
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
  async function initCounter() {
    const currentCount = await getSubmissionCountFromSheet(); // real submissions
    setCounterDigits(currentCount); // fill digits based on sheet

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: ".stats",
      start: "top 90%",
      once: true,
      onEnter: () => runDigitCounter(),
    });
  }

  initCounter();
};
counterConfig();
