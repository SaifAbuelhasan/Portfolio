// global variables/constants
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll('.nav__link');
const introSubtitle = document.querySelector(".typing-intro");
const aboutSubtitle = document.querySelector(".typing-about");
const aboutText = "Student & developer based in Ismailia, Egypt";

// Control navbar
navToggle.addEventListener("click", () => {
	document.body.classList.toggle("nav-open");
})

navLinks.forEach((link) => {
	link.addEventListener("click", () => {
		document.body.classList.remove("nav-open");
	})
})

// Typing effect

let job = "Software Engineer";
let arr = job.split("");
let timer;

// Clear subtitle
async function clear(string) {
  if (string === '') {
    introSubtitle.textContent = '';
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(0)
        }, 250)
    })
  }

  string = string.slice(0, -1);
  introSubtitle.textContent = string;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clear(string))
    }, 70)
  })
}

// Type a subtitle
async function type(string, counter=0, section="INTRO") {
  if(counter == string.length) {
    if (section === "ABOUT") {
      return;
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(clear(string))
      }, 1000)
    })
  }
  if (section === "INTRO") {
    introSubtitle.textContent += string[counter];
  } else if (section === "ABOUT") {
    aboutSubtitle.textContent += string[counter]
  }
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(type(string, counter+1, section))
    }, 70)
  })
}

// Loop through subtitles
async function subtitleLoop() {
  const subtitlesArr = ["Engineering Student", "Web Developer", "Learner", "Animal Lover", "Chess Player"];

  for(let subtitle of subtitlesArr) {
    await type(subtitle);
  }
  subtitleLoop();
}
subtitleLoop();

// About Me section typing animation
let scrolled = false;

function checkAboutSection() {
  if (aboutSubtitle.getBoundingClientRect().top <= 600) {
    scrolled = true;
    type(aboutText, 0, "ABOUT");
  }
}

// Listen to scroll event
document.addEventListener("scroll", () => {
  // If about me subtitle isn't typed check if it's within viewport to type
  if (!scrolled) {
    checkAboutSection();
  }
})