(function () {
  "use strict";

  const viewportDefaults = {
    width: 1366,
    height: 768,
  };

  const fullPageHeights = {
    "375x667": 3200,
    "390x844": 3600,
    "768x1024": 4200,
    "1280x720": 2600,
    "1366x768": 2800,
    "1440x900": 3200,
    "1920x1080": 3600,
  };

  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;
  let autoReloadTimer = 0;
  let syncingHorizontalScroll = false;
  let currentLang = "ja";
  const localSources = {
    left: null,
    right: null,
  };

  const translations = {
    ja: {
      pageTitle: "Kasanely - Webサイト比較・重ね合わせチェックツール",
      metaDescription: "Kasanelyは、2つのWebサイトを横並び・重ね合わせ・スワイプ・差分表示で比較できる、ビルド不要の静的HTMLツールです。Basic認証付きURLにも対応します。",
      ogDescription: "URLを指定した2つのWebページを、横並び・重ね合わせ・スワイプ・差分表示で確認できる静的HTMLツール。Basic認証付きURLにも対応します。",
      twitterDescription: "2つのWebページを視覚比較できる、ビルド不要の静的HTMLツール。",
      skipLink: "比較エリアへ移動",
      mobileWarning: "KasanelyはPCでの利用を想定しています。スマートフォンでは表示や操作が崩れる可能性があります。",
      navLinks: "ページ内リンク",
      languageSwitch: "言語切り替え",
      langJa: "日本語",
      langEn: "EN",
      settingsLink: "設定",
      notesLink: "制限事項",
      intro: "2つのWebサイトを横並び、重ね合わせ、スワイプ、差分表示で比較できます。静的ファイルだけで動作し、Basic認証付きURLにも対応します。",
      urlSection: "比較するURL",
      leftUrl: "比較元URL",
      rightUrl: "比較先URL",
      localHtml: "ローカルHTML",
      clearFile: "解除",
      noLocalFile: "ローカルHTML未選択",
      basicAuth: "Basic認証を使う",
      username: "ユーザー名",
      password: "パスワード",
      settingsPanel: "表示設定",
      viewportLabel: "表示サイズ",
      pageHeightLabel: "ページ全体の高さ",
      displayMode: "比較モード",
      sideBySide: "横並び",
      overlay: "重ね合わせ",
      overlayLegend: "重ね合わせ",
      difference: "差分",
      amountLabel: "透明度 / swipe位置",
      rightShiftX: "比較先の横位置",
      load: "読み込み",
      xScroll: "比較エリアの横スクロール",
      leftShiftPanel: "比較元の縦位置調整",
      rightShiftPanel: "比較先の縦位置調整",
      leftShiftUp: "比較元を上へ1px移動",
      leftShiftDown: "比較元を下へ1px移動",
      rightShiftUp: "比較先を上へ1px移動",
      rightShiftDown: "比較先を下へ1px移動",
      leftPx: "左 px",
      rightPx: "右 px",
      preview: "比較プレビュー",
      leftFrameTitle: "比較元サイト",
      rightFrameTitle: "比較先サイト",
      swipePosition: "swipe位置",
      notesTitle: "制限事項",
      basicAuthNotePrefix: "Kasanelyは静的HTMLツールのため、iframeに任意のAuthorizationヘッダーは付けられません。Basic認証は",
      basicAuthNoteSuffix: "形式のURLを生成して読み込みます。認証情報がURLに含まれるため、公開画面や録画での利用には注意してください。",
      iframeNote: "X-Frame-OptionsやContent-Security-Policyによってiframe表示が禁止されているサイトは、ブラウザ側だけでは表示できません。その場合はサーバー側プロキシが必要です。",
      footer: "認証情報は保存しません。ただし読み込み先URLには認証情報が含まれるため、信頼できる環境で利用してください。",
      statusNotLoaded: "未読み込み",
      statusLocalHtml: "ローカルHTML表示中",
      statusUrlMissing: "URL未入力",
      statusLoading: "読み込み中",
      statusUrlError: "URL形式エラー",
      statusShown: "表示中",
    },
    en: {
      pageTitle: "Kasanely - Web Page Comparison and Overlay Tool",
      metaDescription: "Kasanely is a no-build static HTML tool for comparing two websites side by side, as an overlay, with a swipe handle, or with difference blending. It also supports Basic-auth URLs.",
      ogDescription: "A static HTML tool for checking two web pages side by side, as an overlay, with a swipe handle, or with difference blending. Basic-auth URLs are supported.",
      twitterDescription: "A no-build static HTML tool for visually comparing two web pages.",
      skipLink: "Skip to comparison area",
      mobileWarning: "Kasanely is designed for desktop use. Layout and controls may break on smartphones.",
      navLinks: "Page links",
      languageSwitch: "Language switcher",
      langJa: "JA",
      langEn: "English",
      settingsLink: "Settings",
      notesLink: "Limitations",
      intro: "Compare two websites side by side, as an overlay, with a swipe handle, or with difference blending. It runs as static files and supports Basic-auth URLs.",
      urlSection: "URLs to compare",
      leftUrl: "Source URL",
      rightUrl: "Target URL",
      localHtml: "Local HTML",
      clearFile: "Clear",
      noLocalFile: "No local HTML selected",
      basicAuth: "Use Basic auth",
      username: "Username",
      password: "Password",
      settingsPanel: "Display settings",
      viewportLabel: "Viewport size",
      pageHeightLabel: "Full page height",
      displayMode: "Comparison mode",
      sideBySide: "Side by side",
      overlay: "Overlay",
      overlayLegend: "Overlay",
      difference: "Difference",
      amountLabel: "Opacity / swipe position",
      rightShiftX: "Target horizontal position",
      load: "Load",
      xScroll: "Horizontal scroll for comparison area",
      leftShiftPanel: "Source vertical position controls",
      rightShiftPanel: "Target vertical position controls",
      leftShiftUp: "Move source up by 1px",
      leftShiftDown: "Move source down by 1px",
      rightShiftUp: "Move target up by 1px",
      rightShiftDown: "Move target down by 1px",
      leftPx: "Left px",
      rightPx: "Right px",
      preview: "Comparison preview",
      leftFrameTitle: "Source site",
      rightFrameTitle: "Target site",
      swipePosition: "Swipe position",
      notesTitle: "Limitations",
      basicAuthNotePrefix: "Because Kasanely is a static HTML tool, it cannot attach arbitrary Authorization headers to iframe requests. Basic auth creates and loads a URL in the",
      basicAuthNoteSuffix: "format. Credentials are included in the URL, so be careful when using it on shared screens or recordings.",
      iframeNote: "Sites that block iframe embedding with X-Frame-Options or Content-Security-Policy cannot be displayed by the browser alone. Those cases require a server-side proxy.",
      footer: "Kasanely does not store credentials. The loaded URL can include credentials, so use it only in a trusted environment.",
      statusNotLoaded: "Not loaded",
      statusLocalHtml: "Showing local HTML",
      statusUrlMissing: "URL missing",
      statusLoading: "Loading",
      statusUrlError: "Invalid URL",
      statusShown: "Shown",
    },
  };

  const fields = {
    left: {
      url: $("left-url"),
      auth: $("left-auth-enabled"),
      user: $("left-user"),
      pass: $("left-pass"),
      file: $("left-file"),
      clearFile: $("left-clear-file"),
      fileName: $("left-file-name"),
      frame: $("left-frame"),
      status: $("left-status"),
      shiftY: $("left-shift-y"),
    },
    right: {
      url: $("right-url"),
      auth: $("right-auth-enabled"),
      user: $("right-user"),
      pass: $("right-pass"),
      file: $("right-file"),
      clearFile: $("right-clear-file"),
      fileName: $("right-file-name"),
      frame: $("right-frame"),
      status: $("right-status"),
      shiftY: $("right-shift-y"),
    },
  };

  function selectedRadio(name) {
    return document.querySelector(`input[name="${name}"]:checked`);
  }

  function setCssPx(name, value, fallback) {
    const number = Number(value);
    root.style.setProperty(name, `${Number.isFinite(number) ? number : fallback}px`);
  }

  function translate(key) {
    return translations[currentLang][key] || translations.ja[key] || key;
  }

  function setMetaContent(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.setAttribute("content", value);
  }

  function getSavedLanguage() {
    try {
      return window.localStorage.getItem("kasanely-language") || "";
    } catch (error) {
      return "";
    }
  }

  function saveLanguage(language) {
    try {
      window.localStorage.setItem("kasanely-language", language);
    } catch (error) {
      // Ignore storage errors so file:// and private browsing keep working.
    }
  }

  function refreshDynamicLabels() {
    Object.keys(fields).forEach((sideName) => {
      const config = fields[sideName];
      if (!localSources[sideName]) config.fileName.textContent = translate("noLocalFile");
      const statusKey = config.status.dataset.statusKey || "statusNotLoaded";
      config.status.textContent = translate(statusKey);
    });
  }

  function applyLanguage(language) {
    currentLang = translations[language] ? language : "ja";
    document.documentElement.lang = currentLang;
    document.title = translate("pageTitle");
    setMetaContent('meta[name="description"]', translate("metaDescription"));
    setMetaContent('meta[property="og:locale"]', currentLang === "ja" ? "ja_JP" : "en_US");
    setMetaContent('meta[property="og:title"]', translate("pageTitle"));
    setMetaContent('meta[property="og:description"]', translate("ogDescription"));
    setMetaContent('meta[name="twitter:title"]', translate("pageTitle"));
    setMetaContent('meta[name="twitter:description"]', translate("twitterDescription"));

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = translate(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      element.setAttribute("aria-label", translate(element.dataset.i18nAria));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      element.setAttribute("title", translate(element.dataset.i18nTitle));
    });
    document.querySelectorAll("[data-lang-choice]").forEach((button) => {
      const selected = button.dataset.langChoice === currentLang;
      button.setAttribute("aria-pressed", String(selected));
    });
    refreshDynamicLabels();
    saveLanguage(currentLang);
  }

  function normalizeUrl(rawValue) {
    const rawUrl = rawValue.trim();
    if (!rawUrl) return "";
    if (/^https?:\/\//i.test(rawUrl)) return rawUrl;
    return `https://${rawUrl}`;
  }

  function buildAuthUrl(sideName) {
    const config = fields[sideName];
    const normalized = normalizeUrl(config.url.value);
    if (!normalized) return "";

    const parsed = new URL(normalized);
    if (config.auth.checked) {
      parsed.username = config.user.value;
      parsed.password = config.pass.value;
    } else {
      parsed.username = "";
      parsed.password = "";
    }

    return parsed.toString();
  }

  function updateAuthState(sideName) {
    const config = fields[sideName];
    const enabled = config.auth.checked;
    config.user.disabled = !enabled;
    config.pass.disabled = !enabled;
  }

  function setStatus(sideName, statusKey) {
    fields[sideName].status.dataset.statusKey = statusKey;
    fields[sideName].status.textContent = translate(statusKey);
  }

  function hasAnySource() {
    return Boolean(
      fields.left.url.value.trim()
      || fields.right.url.value.trim()
      || localSources.left
      || localSources.right
    );
  }

  function scheduleReload() {
    window.clearTimeout(autoReloadTimer);
    autoReloadTimer = window.setTimeout(() => {
      if (hasAnySource()) loadFrames();
    }, 450);
  }

  function revokeLocalSource(sideName) {
    if (!localSources[sideName]) return;
    URL.revokeObjectURL(localSources[sideName].url);
    localSources[sideName] = null;
  }

  function clearLocalFile(sideName, options = {}) {
    const config = fields[sideName];
    revokeLocalSource(sideName);
    config.file.value = "";
    config.clearFile.hidden = true;
    config.fileName.textContent = translate("noLocalFile");
    if (options.clearFrame) {
      config.frame.removeAttribute("src");
      setStatus(sideName, "statusNotLoaded");
    }
  }

  function setLocalFile(sideName, file) {
    const config = fields[sideName];
    if (!file) return;

    revokeLocalSource(sideName);
    localSources[sideName] = {
      name: file.name,
      url: URL.createObjectURL(file),
    };
    config.url.value = "";
    config.clearFile.hidden = false;
    config.fileName.textContent = file.name;
    loadFrame(sideName);
  }

  function loadFrame(sideName) {
    try {
      const localSource = localSources[sideName];
      if (localSource) {
        setStatus(sideName, "statusLocalHtml");
        fields[sideName].frame.src = localSource.url;
        return;
      }

      const src = buildAuthUrl(sideName);
      if (!src) {
        setStatus(sideName, "statusUrlMissing");
        fields[sideName].frame.removeAttribute("src");
        return;
      }

      setStatus(sideName, "statusLoading");
      fields[sideName].frame.src = src;
    } catch (error) {
      setStatus(sideName, "statusUrlError");
    }
  }

  function loadFrames() {
    loadFrame("left");
    loadFrame("right");
  }

  function updateViewport() {
    const viewport = $("viewport").value;
    const [width, height] = viewport.split("x").map(Number);
    const nextWidth = Number.isFinite(width) ? width : viewportDefaults.width;
    const nextHeight = Number.isFinite(height) ? height : viewportDefaults.height;

    root.style.setProperty("--viewport-width", `${nextWidth}px`);
    root.style.setProperty("--viewport-height", `${nextHeight}px`);

    if (!$("page-height").dataset.touched) {
      $("page-height").value = String(fullPageHeights[viewport] || Math.max(nextHeight * 4, 2400));
      updatePageHeight();
    }
    updateHorizontalScroller();
    if ($("stage").dataset.mode === "overlay") centerOverlayStage();
  }

  function updateMode() {
    const mode = selectedRadio("display-mode").value;
    const overlay = selectedRadio("overlay-mode").value;
    const stage = $("stage");
    const comparison = $("comparison");
    stage.dataset.mode = mode;
    stage.dataset.overlay = overlay;
    comparison.dataset.mode = mode;

    const overlayDisabled = mode !== "overlay";
    document.querySelectorAll("input[name='overlay-mode']").forEach((input) => {
      input.disabled = overlayDisabled;
    });
    $("amount").disabled = overlayDisabled;
    updateHorizontalScroller();
    if (mode === "overlay") centerOverlayStage();
  }

  function updateAmount() {
    const amount = Number($("amount").value);
    const safeAmount = Number.isFinite(amount) ? Math.min(Math.max(amount, 0), 100) : 50;
    root.style.setProperty("--right-opacity", String(safeAmount / 100));
    root.style.setProperty("--swipe", `${safeAmount}%`);
    $("swipe-handle").setAttribute("aria-valuenow", String(safeAmount));
  }

  function updatePageHeight() {
    const rawHeight = Number($("page-height").value);
    const pageHeight = Number.isFinite(rawHeight) ? Math.min(Math.max(rawHeight, 800), 20000) : 3200;
    root.style.setProperty("--page-height", `${pageHeight}px`);
  }

  function centerOverlayStage() {
    window.requestAnimationFrame(() => {
      const comparison = $("comparison");
      const stage = $("stage");
      if (!comparison || stage.dataset.mode !== "overlay") return;

      const maxScroll = Math.max(comparison.scrollWidth - comparison.clientWidth, 0);
      const comparisonRect = comparison.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const comparisonCenter = comparisonRect.left + comparisonRect.width / 2;
      const stageCenter = stageRect.left + stageRect.width / 2;
      const centeredScroll = comparison.scrollLeft + stageCenter - comparisonCenter;
      comparison.scrollLeft = Math.min(Math.max(centeredScroll, 0), maxScroll);
      updateHorizontalScroller();
    });
  }

  function updateShift(sideName) {
    setCssPx(`--${sideName}-shift-y`, fields[sideName].shiftY.value, 0);
  }

  function updateRightShiftX() {
    setCssPx("--right-shift-x", $("right-shift-x").value, 0);
  }

  function syncHorizontalScroll(source, target) {
    if (syncingHorizontalScroll || !source || !target) return;
    const sourceMax = Math.max(source.scrollWidth - source.clientWidth, 0);
    const targetMax = Math.max(target.scrollWidth - target.clientWidth, 0);
    const ratio = sourceMax ? source.scrollLeft / sourceMax : 0;

    syncingHorizontalScroll = true;
    target.scrollLeft = targetMax * ratio;
    window.requestAnimationFrame(() => {
      syncingHorizontalScroll = false;
    });
  }

  function updateHorizontalScroller() {
    const comparison = $("comparison");
    const scroller = $("sticky-x-scroll");
    const inner = $("sticky-x-scroll-inner");
    if (!comparison || !scroller || !inner) return;

    inner.style.width = `${comparison.scrollWidth}px`;
    scroller.hidden = comparison.scrollWidth <= comparison.clientWidth + 1;
    if (scroller.hidden) return;

    const comparisonMax = Math.max(comparison.scrollWidth - comparison.clientWidth, 0);
    const scrollerMax = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
    const ratio = comparisonMax ? comparison.scrollLeft / comparisonMax : 0;
    scroller.scrollLeft = scrollerMax * ratio;
  }

  function updateShiftPanelStickyOffset() {
    const settings = $("settings");
    if (!settings) return;

    const gap = 14;
    const height = settings.getBoundingClientRect().height;
    root.style.setProperty("--shift-panel-sticky-top", `${Math.round(height + gap)}px`);
  }

  function updateShiftPanelState() {
    const comparison = $("comparison");
    const leftPanel = document.querySelector(".shift-panel-left");
    const rightPanel = document.querySelector(".shift-panel-right");
    if (!comparison || !leftPanel || !rightPanel) return;

    updateShiftPanelStickyOffset();

    const rect = comparison.getBoundingClientRect();
    const isNarrow = window.matchMedia("(max-width: 760px)").matches;
    const stickyTop = Number.parseFloat(getComputedStyle(root).getPropertyValue("--shift-panel-sticky-top")) || 154;
    const panelHeight = leftPanel.offsetHeight;
    const shouldStick = isNarrow
      ? rect.top < window.innerHeight - 120 && rect.bottom > 120
      : rect.top <= stickyTop && rect.bottom > stickyTop + panelHeight;

    const leftX = Math.max(12, rect.left);
    const rightX = Math.min(window.innerWidth - rightPanel.offsetWidth - 12, rect.right - rightPanel.offsetWidth);
    root.style.setProperty("--shift-panel-left-x", `${Math.round(leftX)}px`);
    root.style.setProperty("--shift-panel-right-x", `${Math.round(rightX)}px`);
    document.body.classList.toggle("shift-panels-stuck", shouldStick);
  }

  function nudgeShift(sideName, step) {
    const input = fields[sideName].shiftY;
    const nextValue = (Number(input.value) || 0) + step;
    input.value = String(nextValue);
    updateShift(sideName);
  }

  function startShiftHold(button) {
    const sideName = button.dataset.shift;
    const step = Number(button.dataset.step);
    let intervalId = 0;
    let timeoutId = 0;

    nudgeShift(sideName, step);
    timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => nudgeShift(sideName, step), 45);
    }, 280);

    const stop = () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
      window.removeEventListener("blur", stop);
    };

    window.addEventListener("pointerup", stop, { once: true });
    window.addEventListener("pointercancel", stop, { once: true });
    window.addEventListener("blur", stop, { once: true });
  }

  function setSwipeFromPointer(clientX) {
    const rect = $("stage").getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    $("amount").value = String(Math.round(Math.min(Math.max(percent, 0), 100)));
    updateAmount();
  }

  function startSwipeDrag(event) {
    if ($("stage").dataset.mode !== "overlay" || $("stage").dataset.overlay !== "swipe") return;
    event.preventDefault();
    setSwipeFromPointer(event.clientX);

    const move = (moveEvent) => setSwipeFromPointer(moveEvent.clientX);
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop, { once: true });
  }

  function bindEvents() {
    Object.keys(fields).forEach((sideName) => {
      fields[sideName].url.addEventListener("input", () => {
        if (fields[sideName].url.value.trim()) clearLocalFile(sideName);
        scheduleReload();
      });
      fields[sideName].file.addEventListener("change", () => {
        const [file] = fields[sideName].file.files;
        if (file) {
          setLocalFile(sideName, file);
        } else {
          clearLocalFile(sideName, { clearFrame: true });
        }
      });
      fields[sideName].clearFile.addEventListener("click", () => clearLocalFile(sideName, { clearFrame: true }));
      fields[sideName].auth.addEventListener("change", () => {
        updateAuthState(sideName);
        scheduleReload();
      });
      fields[sideName].user.addEventListener("input", scheduleReload);
      fields[sideName].pass.addEventListener("input", scheduleReload);
      fields[sideName].frame.addEventListener("load", () => setStatus(sideName, "statusShown"));
      fields[sideName].shiftY.addEventListener("input", () => updateShift(sideName));
    });

    $("load").addEventListener("click", loadFrames);
    $("viewport").addEventListener("change", () => {
      updateViewport();
      scheduleReload();
    });
    $("page-height").addEventListener("input", () => {
      $("page-height").dataset.touched = "true";
      updatePageHeight();
      scheduleReload();
    });
    document.querySelectorAll("input[name='display-mode']").forEach((input) => input.addEventListener("change", updateMode));
    document.querySelectorAll("input[name='overlay-mode']").forEach((input) => input.addEventListener("change", updateMode));
    document.querySelectorAll("[data-lang-choice]").forEach((button) => {
      button.addEventListener("click", () => applyLanguage(button.dataset.langChoice));
    });
    $("amount").addEventListener("input", updateAmount);
    $("right-shift-x").addEventListener("input", updateRightShiftX);
    $("comparison").addEventListener("scroll", () => syncHorizontalScroll($("comparison"), $("sticky-x-scroll")));
    $("sticky-x-scroll").addEventListener("scroll", () => syncHorizontalScroll($("sticky-x-scroll"), $("comparison")));
    window.addEventListener("scroll", updateShiftPanelState, { passive: true });
    $("swipe-handle").addEventListener("pointerdown", startSwipeDrag);
    $("swipe-handle").addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const step = event.key === "ArrowLeft" ? -1 : 1;
      $("amount").value = String(Math.min(Math.max((Number($("amount").value) || 0) + step, 0), 100));
      updateAmount();
    });

    document.querySelectorAll("[data-shift]").forEach((button) => {
      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        button.setPointerCapture(event.pointerId);
        startShiftHold(button);
      });
      button.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        nudgeShift(button.dataset.shift, Number(button.dataset.step));
      });
    });
  }

  function init() {
    bindEvents();
    applyLanguage(getSavedLanguage() || document.documentElement.lang || "ja");
    updateAuthState("left");
    updateAuthState("right");
    updateViewport();
    updateMode();
    updateAmount();
    updatePageHeight();
    updateShift("left");
    updateShift("right");
    updateRightShiftX();
    updateHorizontalScroller();
    updateShiftPanelState();
    new ResizeObserver(updateHorizontalScroller).observe($("comparison"));
    new ResizeObserver(updateShiftPanelState).observe($("settings"));
    window.addEventListener("resize", () => {
      updateHorizontalScroller();
      updateShiftPanelState();
      if ($("stage").dataset.mode === "overlay") centerOverlayStage();
    });
  }

  document.addEventListener("DOMContentLoaded", init);

  window.kasanely = {
    buildAuthUrl,
    normalizeUrl,
    updateViewport,
    updatePageHeight,
    updateShift,
    updateRightShiftX,
    updateHorizontalScroller,
    applyLanguage,
    loadFrames,
  };
})();
