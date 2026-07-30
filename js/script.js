/* ==========================================================
   Forest Association Nepal
   Main JavaScript File
   Version : 1.0
   Author : Keshav Thakur (Practice Project)
========================================================== */


/* ==========================================================
   STRICT MODE
========================================================== */

"use strict";


/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    initializeWebsite();

});


/* ==========================================================
   INITIALIZE WEBSITE
========================================================== */

function initializeWebsite() {

    initializeStickyNavbar();

    initializeBackToTop();

    initializeSmoothScroll();

    initializeCounterAnimation();

}


/* ==========================================================
   STICKY NAVIGATION
========================================================== */

function initializeStickyNavbar() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    window.addEventListener("scroll", function () {

        if (window.scrollY > 80) {

            navbar.style.background = "#ffffff";

            navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,.08)";

            navbar.style.transition = ".3s";

        } else {

            navbar.style.background = "transparent";

            navbar.style.boxShadow = "none";

        }

    });

}


/* ==========================================================
   BACK TO TOP BUTTON
========================================================== */

function initializeBackToTop() {

    const topBtn = document.getElementById("topBtn");

    if (!topBtn) return;

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {

            topBtn.style.display = "block";

        }

        else {

            topBtn.style.display = "none";

        }

    });

}


/* ==========================================================
   GLOBAL FUNCTION
========================================================== */

function topFunction() {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


/* ==========================================================
   SMOOTH SCROLL
========================================================== */

function initializeSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link){

        link.addEventListener("click", function(e){

            const target = document.querySelector(this.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        });

    });

}


/* ==========================================================
   COUNTER ANIMATION
========================================================== */

function initializeCounterAnimation(){

    const counters=document.querySelectorAll(".counter");

    if(counters.length===0) return;

    const observer=new IntersectionObserver(function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            }

        });

    },{

        threshold:.5

    });

    counters.forEach(function(counter){

        observer.observe(counter);

    });

}


function animateCounter(counter){

    const target=Number(counter.innerText);

    let current=0;

    const speed=Math.max(20,Math.floor(target/100));

    const timer=setInterval(function(){

        current+=speed;

        if(current>=target){

            counter.innerText=target;

            clearInterval(timer);

        }

        else{

            counter.innerText=current;

        }

    },20);

}


/* ==========================================================
   CONTINUE IN PART 2

   NEXT

   ✓ Scroll Reveal Animation

   ✓ Active Navigation

   ✓ Navbar Highlight

   ✓ Gallery Hover

========================================================== */
/* ==========================================================
   SCROLL REVEAL ANIMATION
========================================================== */

function initializeScrollReveal() {

    const elements = document.querySelectorAll(
        ".about-card, .objective-card, .vision-box, .news-card, .gallery-item, .event-card, .counter-box"
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){

                entry.target.classList.add("fade-up");

                observer.unobserve(entry.target);

            }

        });

    },{

        threshold:0.15

    });

    elements.forEach(function(item){

        observer.observe(item);

    });

}


/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

function initializeActiveNavigation(){

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(function(link){

        const href = link.getAttribute("href");

        if(href === currentPage){

            link.classList.add("active");

        }

    });

}


/* ==========================================================
   NAVBAR SCROLL EFFECT
========================================================== */

function initializeNavbarScrollEffect(){

    const navbar = document.querySelector(".navbar");

    if(!navbar) return;

    window.addEventListener("scroll",function(){

        if(window.scrollY > 150){

            navbar.classList.add("shadow");

        }

        else{

            navbar.classList.remove("shadow");

        }

    });

}


/* ==========================================================
   GALLERY IMAGE EFFECT
========================================================== */

function initializeGalleryEffects(){

    const images=document.querySelectorAll(".gallery-item img");

    images.forEach(function(image){

        image.addEventListener("mouseenter",function(){

            this.style.transform="scale(1.08)";

        });

        image.addEventListener("mouseleave",function(){

            this.style.transform="scale(1)";

        });

    });

}


/* ==========================================================
   SIMPLE IMAGE PRELOAD
========================================================== */

function preloadImages(){

    const images=document.querySelectorAll("img");

    images.forEach(function(img){

        const preload=new Image();

        preload.src=img.src;

    });

}


/* ==========================================================
   UPDATE INITIALIZER
========================================================== */

const oldInitializeWebsite = initializeWebsite;

initializeWebsite = function(){

    oldInitializeWebsite();

    initializeScrollReveal();

    initializeActiveNavigation();

    initializeNavbarScrollEffect();

    initializeGalleryEffects();

    preloadImages();

};


/* ==========================================================
   CONTINUE IN PART 3

   NEXT

   ✓ Loading Screen

   ✓ Gallery Lightbox

   ✓ Keyboard Support

   ✓ Accessibility

========================================================== */
/* ==========================================================
   LOADING SCREEN HANDLER
========================================================== */

window.addEventListener("load", function(){

    const loader = document.querySelector(".loader");

    if(loader){

        loader.style.opacity = "0";

        setTimeout(function(){

            loader.style.display = "none";

        },500);

    }

});


/* ==========================================================
   SIMPLE GALLERY LIGHTBOX
========================================================== */

function initializeGalleryLightbox(){

    const galleryImages = document.querySelectorAll(".gallery-item img");

    if(galleryImages.length === 0) return;

    const lightbox = document.createElement("div");

    lightbox.id = "lightbox";

    lightbox.innerHTML = `
        <span id="lightbox-close">&times;</span>
        <img id="lightbox-image" src="" alt="Gallery Image">
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = document.getElementById("lightbox-image");

    const closeButton = document.getElementById("lightbox-close");

    galleryImages.forEach(function(image){

        image.addEventListener("click", function(){

            lightbox.style.display = "flex";

            lightboxImage.src = this.src;

            lightboxImage.alt = this.alt;

            document.body.style.overflow = "hidden";

        });

    });

    function closeLightbox(){

        lightbox.style.display = "none";

        document.body.style.overflow = "auto";

    }

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function(event){

        if(event.target === lightbox){

            closeLightbox();

        }

    });

}


/* ==========================================================
   ESC KEY SUPPORT
========================================================== */

document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){

        const lightbox = document.getElementById("lightbox");

        if(lightbox){

            lightbox.style.display = "none";

            document.body.style.overflow = "auto";

        }

    }

});


/* ==========================================================
   LAZY IMAGE FALLBACK
========================================================== */

function initializeImageFallback(){

    const images = document.querySelectorAll("img");

    images.forEach(function(image){

        image.addEventListener("error", function(){

            this.src = "images/default-image.jpg";

        });

    });

}


/* ==========================================================
   ACCESSIBILITY
========================================================== */

function initializeAccessibility(){

    const buttons = document.querySelectorAll("button");

    buttons.forEach(function(button){

        if(!button.getAttribute("aria-label")){

            const label = button.innerText.trim();

            if(label){

                button.setAttribute("aria-label", label);

            }

        }

    });

}


/* ==========================================================
   UPDATE INITIALIZER
========================================================== */

const previousInitializeWebsite = initializeWebsite;

initializeWebsite = function(){

    previousInitializeWebsite();

    initializeGalleryLightbox();

    initializeImageFallback();

    initializeAccessibility();

};


/* ==========================================================
   CONTINUE IN PART 4

   FINAL PART

   ✓ Current Year

   ✓ Console Welcome Message

   ✓ Performance Improvements

   ✓ Utility Functions

   ✓ End of script.js

========================================================== */
/* ==========================================================
   CURRENT YEAR
========================================================== */

function updateCurrentYear() {

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }

}


/* ==========================================================
   WINDOW RESIZE HANDLER
========================================================== */

function initializeResizeHandler() {

    let resizeTimer;

    window.addEventListener("resize", function () {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {

            console.log("Window resized.");

        }, 250);

    });

}


/* ==========================================================
   HELPER FUNCTIONS
========================================================== */

function $(selector) {

    return document.querySelector(selector);

}

function $$(selector) {

    return document.querySelectorAll(selector);

}


/* ==========================================================
   SIMPLE PAGE LOADED CLASS
========================================================== */

function addLoadedClass() {

    document.body.classList.add("page-loaded");

}


/* ==========================================================
   OPTIONAL CONSOLE MESSAGE
========================================================== */

function consoleWelcome() {

    console.log("%cForest Association Nepal", "color:#2E7D32;font-size:20px;font-weight:bold;");

    console.log("%cWebsite developed as a practice project using HTML, CSS & JavaScript.", "color:#555;font-size:13px;");

    console.log("%cWelcome, Developer!", "color:#1B5E20;font-size:14px;font-weight:bold;");

}


/* ==========================================================
   UPDATE INITIALIZER
========================================================== */

const initializeWebsitePrevious = initializeWebsite;

initializeWebsite = function () {

    initializeWebsitePrevious();

    updateCurrentYear();

    initializeResizeHandler();

    addLoadedClass();

    consoleWelcome();

};


/* ==========================================================
   GLOBAL ERROR HANDLER
========================================================== */

window.addEventListener("error", function (event) {

    console.error("JavaScript Error:", event.message);

});


/* ==========================================================
   END OF SCRIPT.JS

   Forest Association Nepal
   Version : 1.0

   Developed as a Practice Project

========================================================== */
