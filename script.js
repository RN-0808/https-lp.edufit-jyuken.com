// =========================================================
// EduFit LP - JS
// - Sticky CTA visibility
// - Click tracking hooks (GA4 if present)
// =========================================================

(function () {
  const LINE_URL = "https://lin.ee/I0frdWV";

  function safeGtag(eventName, params) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params || {});
      }
    } catch (_) {}
  }

  function bindCtas() {
    const ctas = document.querySelectorAll("[data-cta]");
    ctas.forEach((a) => {
      // keep URL consistent
      if (a.tagName === "A") a.href = LINE_URL;

      a.addEventListener("click", () => {
        const loc = a.getAttribute("data-cta-loc") || "unknown";
        safeGtag("line_click", { location: loc });
      });
    });
  }

  function bindFaqTracking() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((d, idx) => {
      d.addEventListener("toggle", () => {
        if (d.open) {
          safeGtag("faq_open", { index: idx + 1 });
        }
      });
    });
  }

  function setupStickyCta() {
    const sticky = document.getElementById("stickyCta");
    const sentinel = document.getElementById("hero-sentinel");
    if (!sticky || !sentinel) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When sentinel is NOT visible, show sticky CTA (user has scrolled past hero area)
          if (entry.isIntersecting) {
            sticky.classList.remove("is-visible");
            sticky.setAttribute("aria-hidden", "true");
          } else {
            sticky.classList.add("is-visible");
            sticky.setAttribute("aria-hidden", "false");
          }
        });
      },
      { root: null, threshold: 0 }
    );

    io.observe(sentinel);
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindCtas();
    bindFaqTracking();
    setupStickyCta();
  });
})();
