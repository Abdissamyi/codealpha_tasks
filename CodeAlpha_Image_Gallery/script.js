const main = document.getElementById("gallery");

const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbCaption = document.getElementById('lbCaption');
const lbCounter = document.getElementById('lbCounter');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');

let images = [
  {
    src: "https://picsum.photos/id/1018/800/1000",
    alternative: "Snow-capped mountain range at dusk",
    figCaption: "Kings Canyon, Sierra Nevada",
    dataCategory: "mountains",
  },
  {
    src: "https://picsum.photos/id/1002/800/1000",
    alternative: "Rocky mountain peaks under blue sky",
    figCaption: "Swiss Alps",
    dataCategory: "mountains",
  },
  {
    src: "https://picsum.photos/id/1043/800/1000",
    alternative: "Mountain lake surrounded by cliffs",
    figCaption: "Lake Louise, Canada",
    dataCategory: "mountains",
  },

  {
    src: "https://picsum.photos/id/1076/800/1000",
    alternative: "Turquoise waves rolling onto a shoreline",
    figCaption: "Playa Blanca, Lanzarote",
    dataCategory: "ocean",
  },
  {
    src: "https://picsum.photos/id/1011/800/1000",
    alternative: "Crystal clear ocean with white sand beach",
    figCaption: "Maldives Beach",
    dataCategory: "ocean",
  },
  {
    src: "https://picsum.photos/id/1016/800/1000",
    alternative: "Blue ocean waves during sunset",
    figCaption: "Pacific Coast",
    dataCategory: "ocean",
  },

  {
    src: "https://picsum.photos/id/1015/800/1000",
    alternative: "Narrow street between old stone buildings",
    figCaption: "Old Town, Porto",
    dataCategory: "cities",
  },
  {
    src: "https://picsum.photos/id/1031/800/1000",
    alternative: "Modern city skyline at night",
    figCaption: "Downtown Skyline",
    dataCategory: "cities",
  },
  {
    src: "https://picsum.photos/id/1040/800/1000",
    alternative: "Busy city street with tall buildings",
    figCaption: "New York City",
    dataCategory: "cities",
  },

  {
    src: "https://picsum.photos/id/1039/800/1000",
    alternative: "Sunlight filtering through tall pine trees",
    figCaption: "Black Forest, Germany",
    dataCategory: "forest",
  },
  {
    src: "https://picsum.photos/id/1044/800/1000",
    alternative: "Dense green forest with hiking trail",
    figCaption: "Redwood National Park",
    dataCategory: "forest",
  },
  {
    src: "https://picsum.photos/id/1056/800/1000",
    alternative: "Misty forest in the early morning",
    figCaption: "Amazon Rainforest",
    dataCategory: "forest",
  },
];


let filterButtons = [];
let cards = [];
let visibleCards = [];
let currentIndex = 0;

function displayImages(images) {
  images.forEach(image => {
    let card = document.createElement("figure");
    let cardImage = document.createElement("img");
    let figcaptionCard = document.createElement("figcaption");

    card.className = "card";
    card.setAttribute("data-category", image.dataCategory);

    cardImage.src = image.src;
    cardImage.alt = image.alternative;
    cardImage.loading = "lazy";
    card.appendChild(cardImage);

    figcaptionCard.textContent = image.figCaption;
    card.appendChild(figcaptionCard);

    main.appendChild(card);
  });
}


// Category filtering

function setupFilters() {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter;

      cards.forEach((card) => {
        const matches = category === 'all' || card.dataset.category === category;
        card.classList.toggle('hidden', !matches);
      });

      
      visibleCards = Array.from(cards).filter((c) => !c.classList.contains('hidden'));
    });
  });
}

// Opening the lightbox

function setupCardClicks() {
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      visibleCards = Array.from(cards).filter((c) => !c.classList.contains('hidden'));
      currentIndex = visibleCards.indexOf(card);
      showImage(currentIndex);
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });
}

function showImage(index) {
  const card = visibleCards[index];
  const img = card.querySelector('img');
  const caption = card.querySelector('figcaption').textContent;

  lbImage.src = img.src;
  lbImage.alt = img.alt;
  lbCaption.textContent = caption;
  lbCounter.textContent = `${index + 1} / ${visibleCards.length}`;
}



function showNext() {
  currentIndex = (currentIndex + 1) % visibleCards.length;
  showImage(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
  showImage(currentIndex);
}

lbNext.addEventListener('click', showNext);
lbPrev.addEventListener('click', showPrev);


function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}

lbClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});


// Light / dark mode toggle

const light = document.getElementsByClassName('light-mode-btn');
const dark = document.getElementsByClassName('dark-mode-btn');

light[0].addEventListener('click', () => {
  document.body.style.backgroundColor = 'white';
  light[0].classList.add('active');
  dark[0].classList.remove('active');
});

dark[0].addEventListener('click', () => {
  document.body.style.backgroundColor = 'var(--bg)';
  dark[0].classList.add('active');
  light[0].classList.remove('active');
});


// Init: build the cards first, THEN query/select them and wire up
// all the listeners that depend on them existing in the DOM.

function init() {
  displayImages(images);

  filterButtons = document.querySelectorAll('.filter-btn');
  cards = document.querySelectorAll('.card');
  visibleCards = Array.from(cards);

  setupFilters();
  setupCardClicks();
}

window.addEventListener('DOMContentLoaded', init);