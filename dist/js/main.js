/*
$(".menu a").on("click", function(e) {
  if (this.has !== "") {
    e.preventDefault();

    const hash = this.hash;

    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top
      },
      1500
    );
  }
});*/

const TypeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

TypeWriter.prototype.type = function() {
  const current = this.wordIndex % this.words.length;
  const fullTxt = this.words[current];
  let typeSpeed = 300;

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.wordIndex++;
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  new typeWriter(txtElement, words, wait);
}

function splitScroll() {
  const controller = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    duration: "200%",
    triggerElement: ".about-title",
    triggerHook: 0
  })
    .setPin(".about-title")
    .addTo(controller);
}

splitScroll();

const loader = document.querySelector(".loader");
const message = document.querySelector(".message");

function init() {
  setTimeout(() => {
    message.style.display = "block";

    setTimeout(() => (loader.style.opacity = 0), 50);
    setTimeout(() => (message.style.opacity = 1), 50);
  }, 1000);
}

init();

const contactSection = document.querySelector(".contact");

function changeBgColor() {
  if (this.scrollY > this.innerHeight * 6.2) {
    contactSection.classList.add("color-active");
  } else {
    contactSection.classList.remove("color-active");
  }
}

window.addEventListener("scroll", changeBgColor);

//
const main = document.querySelector(".main");
const underlay = document.querySelector(".underlay");
const headline = document.querySelector(".headline");

const t1 = new TimelineMax();

t1.fromTo(main, 1, { height: "0%" }, { height: "90%", ease: Power2.easeInOut })
  .fromTo(
    main,
    1.2,
    { width: "40%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    underlay,
    1.2,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=0.5"
  )
  .fromTo(
    headline,
    1.2,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.5"
  );
