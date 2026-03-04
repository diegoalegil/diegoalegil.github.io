document.addEventListener("DOMContentLoaded", () => {

  /* ========= STACK CARDS ========= */

  const stackSection = document.querySelector("#stack");
  const cards = document.querySelectorAll("#stack .card");

  const stackObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        cards.forEach((card, index) => {

          setTimeout(() => {
            card.classList.add("visible");
          }, index * 220);

        });

        stackObserver.unobserve(stackSection);

      }

    });

  }, { threshold: 0.45 });

  if (stackSection) {
    stackObserver.observe(stackSection);
  }


  /* ========= REVEAL ELEMENTS ========= */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

    });

  }, { threshold: 0.25 });

  revealElements.forEach(el => revealObserver.observe(el));

});
const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

},{threshold:0.3});

timelineItems.forEach(item=>timelineObserver.observe(item));