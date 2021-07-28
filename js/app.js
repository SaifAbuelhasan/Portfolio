// global variables/constants
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll('.nav__link');
const navList = document.querySelector(".nav__list");
const introSubtitle = document.querySelector(".typing-intro");
const aboutSubtitle = document.querySelector(".typing-about");
const skillsSection = document.querySelector(".my-skills");
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
  const subtitlesArr = ["Engineering Student", "Web Developer", "Learner", "Pet person", "Chess Player"];

  for(let subtitle of subtitlesArr) {
    await type(subtitle);
  }
  subtitleLoop();
}
subtitleLoop();

// About Me section typing animation
let aboutSectionScrolled = false;

function checkAboutSection() {
  if (aboutSubtitle.getBoundingClientRect().top <= 600) {
    aboutSectionScrolled = true;
    type(aboutText, 0, "ABOUT");
  }
}

function checkSkillsSection() {
  let skillsBox =  skillsSection.getBoundingClientRect();
  let marker1 = skillsBox.bottom - skillsBox.height;
  let marker2 = skillsBox.height + skillsBox.top;

  if (marker1 < 25 && marker2 > 25) {
    navList.classList.add("light-items");
  } else {
    navList.classList.remove("light-items");
  }
}

// Listen to scroll event
document.addEventListener("scroll", () => {
  // If about me subtitle isn't typed check if it's within viewport to type
  if (!aboutSectionScrolled) {
    checkAboutSection();
  }

  checkSkillsSection()
})