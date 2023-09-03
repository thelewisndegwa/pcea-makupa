const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
 
  
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');  
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation){
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }            
        });
        //Burger Animation
        burger.classList.toggle('toggle');
    });
}


var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type:"fractiion",
    },
    autoplay:{
        delay:3000,
        disableOnInteraction:false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect:"creative",
    creativeEffect: {
        prev:{
            shadow:true,
            translate: [0,0-400],
        },
        next:{
            translate: ["100%",0,0]
        },
    },
  });

// Smooth scroll to the introduction section when clicking "Get Started"
document.querySelectorAll('a[href^="#id_intro_container"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
  
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth' // Add smooth scroll behavior
        });
      }
    });
  });
  

navSlide();
