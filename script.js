/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

const modeToggle = document.querySelector(".dark-light");

const saveMode = localStorage.getItem("mode");

if (saveMode === "dark-mode") {
   document.documentElement.classList.add("dark");
   modeToggle.classList.add("active");
}  

modeToggle.addEventListener("click", () => {
   document.documentElement.classList.toggle("dark");

   if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("mode", "dark-mode");
      modeToggle.classList.add("active");
   } else {
      localStorage.setItem("mode", "light-mode");
      modeToggle.classList.remove("active");
   }
});

/* Show menu */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Hide menu */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

// document.addEventListener('click', (e) => {
//   if (!navMenu.contains(e.target)) {
//     navMenu.classList.remove('show-menu');
//   }
// });

document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('show-menu');
  }
});

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
    //Quando clicarmos em um nav-link ele vai remover o show-menu
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () => {
   //Se a barra de rolagem for maior que 50 da altura da viewport, adicione a classe `blur-header` à tag de cabeçalho.
   const header = document.getElementById('header');
   this.scrollY >= 50 ? header.classList.add('blur-header')
                      : header.classList.remove('blur-header');
}
window.addEventListener('scroll', blurHeader);

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
   e.preventDefault()

   // serviceID - templateID - #form -publicKey
   emailjs.sendForm('service_2002J21', 'template_2002J21', '#contact-form', 'QnJeNBNyhgpLHXHcZ')
      .then(() => {
         //Mostrar mensagem enviada
         contactMessage.textContent = 'Mensagem enviada com sucesso ✅'

         //Remover mensagem depois de 5s
         setTimeout(() => {
            contactMessage.textContent = '';
         }, 5000)

         //Limpar os imputs
         contactForm.reset()

      }, () => {
         //Mostrar mensagem n/enviada
         contactMessage.textContent = 'Mensagem não enviada (erro de serviço) ❌'
      })
}

contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
   const scrollUp = document.getElementById('scroll-up');

   //Quando a altura da barra de rolagem for superior a 350 pixels da altura da viewport, 
   // adicione a classe `show-scroll` à tag `<a>` com a barra de rolagem para cima.

   this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                       : scrollUp.classList.remove('show-scroll')

}
window.addEventListener('scroll', scrollUp);

/*=============== SHOW SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id')

const scrollActive = () => {
   const scrollY = window.pageYOffset;

   sections.forEach(current => {
            const sectionHeight = current.offsetHeight,
                     sectionTop = current.offsetTop - 58,
                     sectionId = current.getAttribute('id'),
                     sectionClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
      
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
               sectionClass.classList.add('active-link');
            }else {
               sectionClass.classList.remove('active-link');
            }
   });
}
window.addEventListener('scroll', scrollActive);

/****************** SCROLL REVEAL ANIMATION *******************/
const sr = ScrollReveal({
   origin: 'top',
   distance: '60px',
   duration: 2500,
   delay: 400,
   reset: true,// Animations repeat
   viewFactor: 0.01
});

sr.reveal(`.home__data, .home__social, .contact__container, .footer__container`);
sr.reveal(`.home__image`, {origin: 'bottom'});
sr.reveal(`.about__data, .skills__data`, {origin: 'left'});
sr.reveal(`.about__image`, {origin: 'right'});
sr.reveal(`.services__card, .projects__card`, {interval: 100});

sr.reveal('.skills__content', {
   origin: 'left',
   beforeReveal: function () {
      setTimeout(() => {
         document.querySelectorAll('.skill-per').forEach((skill) => {
            skill.classList.add('active');
         });
      }, 200);
   },

   beforeReset: function () {
      document.querySelectorAll('.skill-per').forEach((skill) => {
         skill.classList.remove('active');
      });
   }
});   

/****************** CUSTOM CURSOR *******************/
const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0 // Store mouse position;

const cursorMouse = () => {
   //Position the cursor
   cursor.style.left = `${mouseX}px`
   cursor.style.top = `${mouseY}px`
   cursor.style.transform = 'translate(-50%, -50%)'

   // Update the cursro animation
   requestAnimationFrame(cursorMouse)
}

document.addEventListener('mousemove', (e) => {
   mouseX = e.clientX
   mouseY = e.clientY
});

cursorMouse()

/* Hide custom cursor on links */
const allLinks = document.querySelectorAll('a');

allLinks.forEach(item => {
   item.addEventListener('mouseover', () => {
      cursor.classList.add('hide-cursor');
   });
   item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hide-cursor');
   });
});