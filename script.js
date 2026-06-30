// selections

let DOM = {
  circle: document.querySelector(".circle"),
  hero_sec: document.querySelector(".hero"),
  border: document.querySelector(".border"),
  hero_heading: document.querySelector(".hero-content-box > h2"),
  nav: document.querySelector("nav"),
  about_card: document.querySelector(".about-card-wrapper"),
  project_box: document.querySelector(".project-box"),
  cards: document.querySelectorAll(".skill-card"),
  resume_download: document.querySelector("#download-resume"),
};

// global declaration

let GD = {
  mouse: {
    x: 0,
    y: 0,
  },

  curr_mouse: {
    x: 0,
    y: 0,
  },

  lastScrollY: window.scrollY,

  projects: [
    {
      id: 1,
      title: "Weather App",
      description:
        "A responsive weather app with real-time updates, forecasts, city search, and a built-in productivity planner.",
      liveLink: "https://anandsuthar12.github.io/web-weather/",
      github: "https://github.com/anandsuthar12/web-weather",
    },

    {
      id: 2,
      title: "Snake Game",
      description:
        "A classic Snake game featuring smooth controls, score tracking, and responsive gameplay.",
      liveLink: "https://anandsuthar12.github.io/snake-game/",
      github: "https://github.com/anandsuthar12/snake-game",
    },

    {
      id: 3,
      title: "Kanban Board",
      description:
        "A drag-and-drop Kanban board for organizing tasks with a clean and intuitive interface.",
      liveLink: "https://anandsuthar12.github.io/kanban/",
      github: "https://github.com/anandsuthar12/kanban",
    },

    {
      id: 4,
      title: "Productivity Dashboard",
      description:
        "A productivity dashboard combining task management, notes, and useful widgets in one place.",
      liveLink: "https://anandsuthar12.github.io/productivity-dashboard/",
      github: "https://github.com/anandsuthar12/productivity-dashboard",
    },

    {
      id: 5,
      title: "Image Editor",
      description:
        "A browser-based image editor with essential editing tools and a clean, responsive interface.",
      liveLink: "https://anandsuthar12.github.io/image-editor-1.0/",
      github: "https://github.com/anandsuthar12/image-editor-1.0",
    },
  ],

  positions: [
    { x: "20%", y: "15%" },
    { x: "35%", y: "5%" },
    { x: "65%", y: "25%" },
    { x: "15%", y: "55%" },
    { x: "45%", y: "50%" },
    { x: "85%", y: "20%" },
    { x: "80%", y: "60%" },
    { x: "50%", y: "80%" },
    { x: "5%", y: "8%" },
    { x: "25%", y: "90%" },
  ],
};

// functions

function animate_skill_card() {
  DOM.cards.forEach((card) => {
    gsap.to(card, {
      y: `+=${gsap.utils.random(10, 20)}`,

      x: `+=${gsap.utils.random(-10, 10)}`,

      rotation: gsap.utils.random(-3, 3),

      duration: gsap.utils.random(2.5, 4),

      repeat: -1,

      yoyo: true,

      ease: "sine.inOut",
    });

    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.2,

        duration: 0.25,
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,

        duration: 0.25,
      });
    });
  });

  DOM.cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;

      const y = e.clientY - rect.top;

      const rotateY = x - rect.width / 2;

      const rotateX = -(y - rect.height / 2);

      gsap.to(card, {
        rotateX,

        rotateY,

        transformPerspective: 800,

        duration: 0.3,
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateX: 0,

        rotateY: 0,

        duration: 0.4,
      });
    });
  });
}

animate_skill_card();

function skills_card() {
  DOM.cards.forEach((card, i) => {
    gsap.set(card, {
      left: GD?.positions[i]?.x,
      top: GD?.positions[i]?.y,
      xPercent: -50,
      yPercent: -50,
    });
  });
}

skills_card();

function matrix_effect(target, slap = 50) {
  let charactar = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  let counter = 0;
  let text = target.innerHTML;

  let interval = setInterval(() => {
    let arr = text.split("").map((ech, idx) => {
      if (counter >= idx) {
        return ech;
      } else {
        return charactar.split("")[
          Math.floor(Math.random() * charactar.length)
        ];
      }
    });

    counter += 0.6;
    arr = arr.join("");

    target.innerHTML = arr;
  }, slap);
}

matrix_effect(DOM.hero_heading);

function handle_border(dets, val) {
  let dimenssion = val;

  if (dets == "grow") {
    let interval = setInterval(() => {
      DOM.border.style.height = `${dimenssion}px`;
      dimenssion += 5;

      if (dimenssion == 55) {
        clearInterval(interval);
      }
    }, 10);
  } else if (dets == "shrink") {
    let interval = setInterval(() => {
      DOM.border.style.height = `${dimenssion}px`;
      dimenssion -= 5;

      if (dimenssion == -5) {
        clearInterval(interval);
        DOM.border.style.display = "none";
      }
    }, 10);
  }
}

function setup_circle_border() {
  GD.curr_mouse.x += (GD.mouse.x - GD.curr_mouse.x) * 0.05;
  GD.curr_mouse.y += (GD.mouse.y - GD.curr_mouse.y) * 0.05;

  DOM.circle.style.left = `${GD.curr_mouse.x}px`;
  DOM.circle.style.top = `${GD.curr_mouse.y}px`;

  DOM.border.style.left = `${GD.curr_mouse.x}px`;
  DOM.border.style.top = `${GD.curr_mouse.y}px`;

  requestAnimationFrame(setup_circle_border);
}

setup_circle_border();

function tiltcard(x, y) {
  DOM.about_card.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
}

function reveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.2 },
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });
}

reveal();

function setup_project_card() {
  let clutter = ``;
  let btn = ``;
  GD.projects.forEach((ech, id) => {
    clutter += `<div class="project-card" id="${id}">
                    <h2>${ech.title}</h2>

                    <p>${ech.description}</p>

                    <div class="project-card-code-box">
                        <a href="${ech.liveLink}">live link</a>
                        <a href="${ech.github}">github</a>
                    </div>
                </div>`;
  });

  DOM.project_box.innerHTML = clutter;
}

setup_project_card();

(function handle_a() {
  document.querySelectorAll(".project-box a").forEach((link) => {
    link.setAttribute("target", "_blank");
  });
})();

let project_cards = document.querySelectorAll(".project-card");

// event listner

DOM.hero_sec.addEventListener("mousemove", (e) => {
  GD.mouse.x = e.offsetX;
  GD.mouse.y = e.offsetY;
});

DOM.hero_sec.addEventListener("click", (e) => {
  DOM.border.style.display = "block";

  //   takes 100ms to grow
  handle_border("grow", 0);

  setTimeout(() => {
    handle_border("shrink", 50);
  }, 270);
});

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > GD.lastScrollY) {
    DOM.nav.style.height = `0px`;
    DOM.nav.style.opacity = 0;
  } else if (currentScrollY < GD.lastScrollY) {
    DOM.nav.style.height = `fit-content`;
    DOM.nav.style.opacity = 1;
  }

  GD.lastScrollY = currentScrollY;
});

DOM.about_card.addEventListener("mousemove", (e) => {
  let rect = DOM.about_card.getBoundingClientRect();

  let h = rect.height;
  let w = rect.width;

  // mouse position relative to card center
  let howmuch_x = e.clientX - rect.left;
  let howmuch_y = e.clientY - rect.top;

  // normalize to -1 to +1 range
  let normalX = (howmuch_x / w) * 2 - 1; // -1 left, +1 right
  let normalY = (howmuch_y / h) * 2 - 1; // -1 top, +1 bottom

  // max tilt degree
  let maxTilt = 25;

  let rotateY = normalX * maxTilt; // left/right tilt
  let rotateX = -normalY * maxTilt; // up/down tilt (negative for natural feel)

  tiltcard(rotateX, rotateY);
});

DOM.about_card.addEventListener("mouseout", () => {
  tiltcard(0, 0);
});

project_cards.forEach((ech, id) => {
  ech.addEventListener("mousemove", (e) => {
    let rect = ech.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    ech.style.background = `radial-gradient(
    circle 150px at ${x}px ${y}px,
    rgba(168, 85, 247, 0.75) 10%,
    rgba(168, 85, 247, 0.25) 40%,
    transparent 80%
  )`;
  });

  ech.addEventListener("mouseleave", (e) => {
    ech.style.background = `transparent`;
  });
});

DOM.resume_download.addEventListener("click", (e) => {
  let link = document.createElement("a");

  link.href = "./assets/resume.pdf";
  link.download = "Lokendra_Suthar_Resume.pdf";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
});
