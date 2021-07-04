// constants
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll('.nav__link');
const introSubtitle = document.querySelector(".typing")

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
async function type(string, counter=0) {
  if(counter == string.length) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(clear(string))
      }, 1000)
    })
  }
  introSubtitle.textContent += string[counter];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(type(string, counter+1))
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