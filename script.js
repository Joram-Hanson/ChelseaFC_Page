/* 
   script.js  -  how the Chelsea website behaves
   
   It uses the data from data.js (images, sections, trophies, legends,
   squad...) so make sure data.js is loaded first in the HTML.

   What is in here:
     1. Start-up                    5. History section
     2. Things used on every page   6. Trophies section
     3. Home page                   7. Hall of Fame section
     4. Details page router         8. Squad section
    */

"use strict";

/* 
   1. START-UP
   Everything starts once the page has finished loading.
    */
document.addEventListener("DOMContentLoaded", function () {
  setupTheme();
  setupMobileNav();
  setupBackToTop();
  setupImageFallbacks(document);
  document.getElementById("year").textContent = new Date().getFullYear();

  // data-page on the <body> tells us which page we are on
  const page = document.body.dataset.page;

  if (page === "home") {
    initHome();
  } else if (page === "details") {
    initDetails();
  }
});

/* 
   2. THINGS USED ON EVERY PAGE
   */

/* Dark / light mode. */
function setupTheme() {
  const button = document.getElementById("theme-toggle");

  // localStorage can fail in some browsers, so we wrap it in try/catch
  let saved = null;
  try {
    saved = localStorage.getItem("chelsea-theme");
  } catch (error) {
    saved = null;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  button.addEventListener("click", function () {
    const current = document.documentElement.dataset.theme;
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("chelsea-theme", next);
    } catch (error) {
      /* not saved, no problem */
    }
  });

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    button.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    button.setAttribute("aria-pressed", theme === "dark");
  }
}

/* The "Menu" button on small screens */
function setupMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");

  toggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });
}

/* Highlight the nav link for the page we are on */
function highlightNav(activeKey) {
  const links = document.querySelectorAll("[data-nav]");
  links.forEach(function (link) {
    const isActive = link.dataset.nav === activeKey;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

/* The round arrow button that appears when you scroll down */
function setupBackToTop() {
  const button = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    button.hidden = window.scrollY < 600;
  });

  button.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* If an image file is missing, hide the broken icon so the blue
   background shows instead. Call this again after adding new images. */
function setupImageFallbacks(root) {
  const pictures = root.querySelectorAll("img");

  pictures.forEach(function (img) {
    if (img.dataset.fallbackReady) {
      return; // already set up
    }
    img.dataset.fallbackReady = "true";

    function markMissing() {
      img.classList.add("img-missing");
    }

    img.addEventListener("error", markMissing);

    // The error may already have happened before this code ran
    if (img.complete && img.naturalWidth === 0) {
      markMissing();
    }
  });
}

//3. HOME PAGE
    
function initHome() {
  highlightNav("home");
  setupCounters();
  setupCardSlider();
  setupFacts();
}

/* The trophy numbers count up from 0 when they scroll into view */
function setupCounters() {
  const counters = document.querySelectorAll("[data-trophy]");
  const strip = document.getElementById("trophy-strip");

  // Read each number from the trophies array in data.js
  counters.forEach(function (el) {
    const trophy = trophies.find(function (t) {
      return t.id === el.dataset.trophy;
    });
    if (trophy) {
      el.dataset.target = trophy.count;
    } else {
      el.dataset.target = el.textContent; // keep the number typed in the HTML
    }
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // If the user prefers no animation (or the browser is old), show the numbers straight away
  if (reduceMotion || !("IntersectionObserver" in window)) {
    counters.forEach(function (el) {
      el.textContent = el.dataset.target;
    });
    return;
  }

  counters.forEach(function (el) {
    el.textContent = "0";
  });

  // IntersectionObserver tells us when an element becomes visible
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          counters.forEach(animateCount);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(strip);
}

function animateCount(el) {
  const target = Number(el.dataset.target);
  const duration = 1400; // milliseconds
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // starts fast, ends slow
    el.textContent = Math.round(target * eased);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

/* The left and right arrows for the row of cards */
function setupCardSlider() {
  const track = document.getElementById("cards-track");
  const prev = document.getElementById("prev-btn");
  const next = document.getElementById("next-btn");

  // How far to scroll: one card width plus the gap between cards
  function stepSize() {
    const card = track.querySelector(".card");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
    return card.getBoundingClientRect().width + gap;
  }

  prev.addEventListener("click", function () {
    track.scrollBy({ left: -stepSize(), behavior: "smooth" });
  });
  next.addEventListener("click", function () {
    track.scrollBy({ left: stepSize(), behavior: "smooth" });
  });

  // Grey out an arrow when there is nothing more to scroll to
  function updateArrows() {
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  }
  track.addEventListener("scroll", updateArrows);
  window.addEventListener("resize", updateArrows);
  updateArrows();
}

/* "Show another fact" button */
function setupFacts() {
  const text = document.getElementById("fact-text");
  const button = document.getElementById("fact-btn");
  let lastIndex = 0;

  button.addEventListener("click", function () {
    let index;
    // keep picking until we get a different fact from the last one
    do {
      index = Math.floor(Math.random() * facts.length);
    } while (index === lastIndex && facts.length > 1);

    lastIndex = index;
    text.textContent = facts[index];
  });
}

/* 
   4. DETAILS PAGE ROUTER
   Reads ?section=... from the address and shows the right section.
    */
function initDetails() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("section");

  const title = document.getElementById("page-title");
  const intro = document.getElementById("page-intro");
  const crumb = document.getElementById("crumb");
  const content = document.getElementById("detail-content");

  // If the address has no valid section, ask the user to choose one
  if (!sections[key]) {
    document.title = "Chelsea FC | Choose a section";
    title.textContent = "Choose a section";
    intro.textContent = "That page does not exist. Pick one of the sections below.";
    crumb.textContent = "Choose a section";
    content.innerHTML = "";
    highlightNav("");
    buildMoreLinks("");
    return;
  }

  const info = sections[key];
  document.title = "Chelsea FC | " + info.title;
  title.textContent = info.title;
  intro.textContent = info.intro;
  crumb.textContent = info.title;
  highlightNav(key);

  // switch runs a different function depending on the value of key
  switch (key) {
    case "history":
      renderHistory(content);
      break;
    case "trophies":
      renderTrophies(content);
      break;
    case "halloffame":
      renderHallOfFame(content);
      break;
    case "squad":
      renderSquad(content);
      break;
  }

  setupImageFallbacks(content);
  buildMoreLinks(key);
}

/* The "Keep exploring" links at the bottom (every section except this one) */
function buildMoreLinks(currentKey) {
  const list = document.getElementById("more-links");
  list.innerHTML = "";

  sectionOrder.forEach(function (key) {
    if (key === currentKey) {
      return; // skip the page we are already on
    }
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.className = "chip";
    link.href = "details.html?section=" + key;
    link.textContent = sections[key].title;
    item.appendChild(link);
    list.appendChild(item);
  });
}

/* 
   5. HISTORY SECTION
    */
function renderHistory(container) {
  // Build the list of club facts (label and value)
  const factRows = clubFacts
    .map(function (fact) {
      return "<dt>" + fact.label + "</dt><dd>" + fact.value + "</dd>";
    })
    .join("");

  // Build one button per year for the timeline
  const yearButtons = timeline
    .map(function (event, index) {
      return '<button class="chip" type="button" data-index="' + index + '" aria-pressed="false">' + event.year + "</button>";
    })
    .join("");

  container.innerHTML =
    '<section class="split" aria-labelledby="club-title">' +
    '  <figure class="photo">' +
    "    <!-- 👉 YOUR STADIUM IMAGE: change the path in data.js (images.stadium) -->" +
    '    <img src="' + images.stadium + '" alt="Stamford Bridge, the home of Chelsea FC">' +
    "    <figcaption>Stamford Bridge, Chelsea's home since 1905.</figcaption>" +
    "  </figure>" +
    "  <article>" +
    '    <h2 id="club-title">The club</h2>' +
    "    <p>Chelsea Football Club play at Stamford Bridge in west London. Despite the name, the stadium is in Fulham. The club took the name of the next-door borough because Fulham already had a team.</p>" +
    '    <dl class="facts">' + factRows + "</dl>" +
    "  </article>" +
    "</section>" +
    '<section aria-labelledby="timeline-title">' +
    '  <h2 id="timeline-title">Key moments</h2>' +
    '  <div class="timeline-years" id="timeline-years">' + yearButtons + "</div>" +
    '  <article class="timeline-panel" id="timeline-panel" aria-live="polite"></article>' +
    "</section>" +
    '<section aria-labelledby="leadership-title">' +
    '  <h2 id="leadership-title">Ownership and leadership</h2>' +
    '  <div class="leadership">' +
    "    <article><h3>Owners</h3><p>" + leadership.owner + "</p></article>" +
    "    <article><h3>Chairman</h3><p>" + leadership.chairman + "</p></article>" +
    "    <article><h3>Head coach</h3><p>" + leadership.coach + "</p></article>" +
    "</div>" +
    "</section>";

  // Show the chosen timeline event inside the panel
  const panel = container.querySelector("#timeline-panel");
  const buttons = container.querySelectorAll("#timeline-years button");

  function showEvent(index) {
    const event = timeline[index];
    panel.innerHTML = "<h3>" + event.year + ": " + event.title + "</h3><p>" + event.text + "</p>";
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", button.dataset.index === String(index));
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      showEvent(Number(button.dataset.index));
    });
  });

  showEvent(0); // start on the first event
}

/* 
   6. TROPHIES SECTION
    */
function renderTrophies(container) {
  // Add up all the counts using reduce
  const total = trophies.reduce(function (sum, trophy) {
    return sum + trophy.count;
  }, 0);

  // The filter buttons: the first value is what the button shows, the second is the category
  const filters = [
    ["All", "all"],
    ["League", "league"],
    ["Domestic cups", "domestic"],
    ["Europe", "europe"],
    ["World", "world"]
  ];

  const filterButtons = filters
    .map(function (pair) {
      return '<button class="chip" type="button" data-filter="' + pair[1] + '" aria-pressed="' + (pair[1] === "all") + '">' + pair[0] + "</button>";
    })
    .join("");

  container.innerHTML =
    '<section class="split" aria-labelledby="cabinet-title">' +
    '  <figure class="photo">' +
    "    <!-- 👉 YOUR TROPHIES IMAGE: change the path in data.js (images.trophies) -->" +
    '    <img src="' + images.trophies + '" alt="Trophies won by Chelsea FC">' +
    "    <figcaption>Chelsea's trophy cabinet.</figcaption>" +
    "  </figure>" +
    "  <article>" +
    '    <h2 id="cabinet-title">The trophy cabinet</h2>' +
    "    <p>Chelsea won their first league title in 1955 and their first European trophy in 1971. In 2025 they became the first club to win all five major UEFA competitions, and they are the only London club to be champions of Europe and champions of the world.</p>" +
    '    <p class="trophy-total"><strong>' + total + '</strong> major trophies in total</p>' +
    "  </article>" +
    "</section>" +
    '<section aria-labelledby="honours-title">' +
    '  <h2 id="honours-title">Honours</h2>' +
    '  <div class="filter-row" id="filter-row" role="group" aria-label="Filter trophies">' + filterButtons + "</div>" +
    '  <div class="trophy-grid" id="trophy-grid"></div>' +
    "</section>";

  const grid = container.querySelector("#trophy-grid");
  const filterRow = container.querySelector("#filter-row");

  // Draw the trophy cards for the chosen category
  function drawTrophies(category) {
    const visible = trophies.filter(function (trophy) {
      return category === "all" || trophy.category === category;
    });

    grid.innerHTML = visible
      .map(function (trophy) {
        return (
          '<article class="trophy">' +
          '  <p class="trophy-count">' + trophy.count + "</p>" +
          "  <h3>" + trophy.name + "</h3>" +
          '  <p class="trophy-note">' + trophy.note + "</p>" +
          '  <button class="link-btn" type="button" aria-expanded="false" aria-controls="years-' + trophy.id + '">Show years</button>' +
          '  <p class="trophy-years" id="years-' + trophy.id + '" hidden>' + trophy.years.join(", ") + "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  // One click listener on the row handles all the filter buttons
  filterRow.addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) {
      return;
    }
    filterRow.querySelectorAll("button").forEach(function (other) {
      other.setAttribute("aria-pressed", other === button);
    });
    drawTrophies(button.dataset.filter);
  });

  // One click listener on the grid handles every "Show years" button
  grid.addEventListener("click", function (event) {
    const button = event.target.closest(".link-btn");
    if (!button) {
      return;
    }
    const years = document.getElementById(button.getAttribute("aria-controls"));
    const nowHidden = !years.hidden;
    years.hidden = nowHidden;
    button.setAttribute("aria-expanded", !nowHidden);
    button.textContent = nowHidden ? "Show years" : "Hide years";
  });

  drawTrophies("all");
}

/* 
   7. HALL OF FAME SECTION
    */
function renderHallOfFame(container) {
  // Quick links to jump to each legend
  const jumpLinks = legends
    .map(function (player) {
      return '<a class="chip" href="#legend-' + player.id + '">' + player.name + "</a>";
    })
    .join("");

  // One article per legend. The photo is on the side, the text beside it.
  const articles = legends
    .map(function (player) {
      // Initials (first letter of the first and last word) show if the photo is missing
      const words = player.name.split(" ");
      const initials = words[0].charAt(0) + words[words.length - 1].charAt(0);

      const honourItems = player.honours
        .map(function (honour) { return "<li>" + honour + "</li>"; })
        .join("");

      return (
        '<article class="legend" id="legend-' + player.id + '">' +
        '  <figure class="legend-photo" data-initials="' + initials + '">' +
        "    <!-- 👉 PHOTO: save it as " + player.image + " -->" +
        '    <img src="' + player.image + '" alt="' + player.name + '" loading="lazy">' +
        "  </figure>" +
        "  <div>" +
        "    <h3>" + player.name + "</h3>" +
        '    <p class="legend-meta">' + player.role + ", " + player.years + "</p>" +
        "    <p>" + player.summary + "</p>" +
        '    <dl class="legend-stats">' +
        "      <div><dt>Games</dt><dd>" + player.games + "</dd></div>" +
        "      <div><dt>" + player.stat.label + "</dt><dd>" + player.stat.value + "</dd></div>" +
        "</dl>" +
        '    <button class="link-btn" type="button" aria-expanded="false" aria-controls="honours-' + player.id + '">Show honours</button>' +
        '    <ul class="honours" id="honours-' + player.id + '" hidden>' + honourItems + "</ul>" +
        "  </div>" +
        "</article>"
      );
    })
    .join("");

  container.innerHTML =
    '<section id="legends-section" aria-labelledby="legends-title">' +
    '  <h2 id="legends-title">Ten Chelsea legends</h2>' +
    '  <nav class="jump-links" aria-label="Jump to a player">' + jumpLinks + "</nav>" +
    articles +
    '  <p class="legend-meta">Games and goals are for Chelsea in all competitions.</p>' +
    "</section>";

  // "Show honours" buttons (event delegation again)
  container.querySelector("#legends-section").addEventListener("click", function (event) {
    const button = event.target.closest(".link-btn");
    if (!button) {
      return;
    }
    const list = document.getElementById(button.getAttribute("aria-controls"));
    const nowHidden = !list.hidden;
    list.hidden = nowHidden;
    button.setAttribute("aria-expanded", !nowHidden);
    button.textContent = nowHidden ? "Show honours" : "Hide honours";
  });
}

/* 
   8. SQUAD SECTION
    */
function renderSquad(container) {
  const filters = [
    ["All", "all"],
    ["Goalkeepers", "goalkeeper"],
    ["Defenders", "defender"],
    ["Midfielders", "midfielder"],
    ["Forwards", "forward"]
  ];

  const filterButtons = filters
    .map(function (pair) {
      return '<button class="chip" type="button" data-group="' + pair[1] + '" aria-pressed="' + (pair[1] === "all") + '">' + pair[0] + "</button>";
    })
    .join("");

  container.innerHTML =
    '<section aria-labelledby="squad-title">' +
    '  <h2 id="squad-title">First team 2026/27</h2>' +
    '  <div class="squad-controls">' +
    '    <div class="filter-row" id="squad-filters" role="group" aria-label="Filter by position" style="margin:0">' + filterButtons + "</div>" +
    '    <input id="squad-search" type="search" placeholder="Search name, club or country" aria-label="Search the squad">' +
    "  </div>" +
    '  <p class="squad-count" id="squad-count" aria-live="polite"></p>' +
    '  <div class="squad-list" id="squad-list"></div>' +
    '  <p class="legend-meta">Squads change every transfer window. Always check chelseafc.com for the latest.</p>' +
    "</section>";

  const list = container.querySelector("#squad-list");
  const count = container.querySelector("#squad-count");
  const filterRow = container.querySelector("#squad-filters");
  const search = container.querySelector("#squad-search");

  // These two variables remember what the user has chosen
  let activeGroup = "all";
  let query = "";

  function drawSquad() {
    const text = query.trim().toLowerCase();

    // Keep only the players that match the position AND the search text
    const visible = squad.filter(function (player) {
      const matchesGroup = activeGroup === "all" || player.group === activeGroup;
      const searchable = (player.name + " " + player.from + " " + player.nationality).toLowerCase();
      const matchesSearch = text === "" || searchable.includes(text);
      return matchesGroup && matchesSearch;
    });

    // Control flow: choose a different message depending on how many matched
    if (visible.length === 0) {
      count.textContent = "No players match your search. Try another name or clear the box.";
    } else if (visible.length === squad.length) {
      count.textContent = "Showing all " + squad.length + " players.";
    } else {
      count.textContent = "Showing " + visible.length + " of " + squad.length + " players.";
    }

    list.innerHTML = visible
      .map(function (player) {
        return (
          '<article class="player">' +
          "  <h3>" + player.name + "</h3>" +
          '  <p class="player-meta">' + player.role + ", " + player.nationality + "</p>" +
          '  <p class="player-from">Joined from ' + player.from + "</p>" +
          "  <p>" + player.achievements + "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  filterRow.addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) {
      return;
    }
    activeGroup = button.dataset.group;
    filterRow.querySelectorAll("button").forEach(function (other) {
      other.setAttribute("aria-pressed", other === button);
    });
    drawSquad();
  });

  // "input" fires every time the user types a letter
  search.addEventListener("input", function () {
    query = search.value;
    drawSquad();
  });

  drawSquad();
}