(function () {
  function localPath(url) {
    if (!url) return url;
    return url.replace(/^https?:\/\/(www\.)?cropin\.com/, "");
  }

  function parseSettings(el) {
    var raw = el.getAttribute("data-settings");
    if (!raw) return null;
    try {
      return JSON.parse(raw.replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
    } catch (e) {
      return null;
    }
  }

  function bootVideos() {
    document.querySelectorAll('[data-settings*="background_video_link"]').forEach(function (container) {
      var settings = parseSettings(container);
      if (!settings || !settings.background_video_link) return;
      var video = container.querySelector(".elementor-background-video-hosted");
      if (!video) return;
      var src = localPath(settings.background_video_link);
      if (video.getAttribute("src") !== src) video.setAttribute("src", src);
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.autoplay = true;
      video.play().catch(function () {});
    });

    document.querySelectorAll("video[src*='cropin.com']").forEach(function (video) {
      video.src = localPath(video.getAttribute("src"));
    });
  }

  function loadLottie(done) {
    if (window.lottie) return done();
    var existing = document.querySelector('script[src*="lottie.min.js"]');
    if (existing) {
      existing.addEventListener("load", done, { once: true });
      setTimeout(done, 2000);
      return;
    }
    var script = document.createElement("script");
    script.src = "/wp-content/plugins/elementor-pro/assets/lib/lottie/lottie.min.js";
    script.onload = done;
    document.head.appendChild(script);
  }

  function bootLottie() {
    loadLottie(function () {
      if (!window.lottie) return;
      document.querySelectorAll(".elementor-widget-lottie").forEach(function (widget) {
        var container = widget.querySelector(".e-lottie__animation");
        if (!container || container.dataset.cropinLottieInit) return;
        var settings = parseSettings(widget);
        var path = localPath(settings && settings.source_json && settings.source_json.url);
        if (!path) return;
        container.dataset.cropinLottieInit = "1";
        var parent = container.closest(".e-lottie__container");
        if (parent) {
          parent.style.width = "100%";
          parent.style.maxWidth = parent.style.maxWidth || "100%";
        }
        container.style.width = "100%";
        if (!container.style.minHeight) container.style.minHeight = "320px";
        window.lottie.loadAnimation({
          container: container,
          renderer: settings.renderer === "canvas" ? "canvas" : "svg",
          loop: settings.loop !== "no",
          autoplay: true,
          path: path,
          rendererSettings: { preserveAspectRatio: "xMidYMid meet" }
        });
      });
    });
  }

  function boot() {
    bootVideos();
    bootLottie();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.addEventListener("load", boot);
  setTimeout(boot, 1200);
  setTimeout(boot, 3500);
})();
