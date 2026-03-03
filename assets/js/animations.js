// SCROLL REVEAL
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
    }
  });
},{threshold:0.1});

document.querySelectorAll(".reveal").forEach(el=>{
  observer.observe(el);
});

// SCROLL PROGRESS BAR
const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll",()=>{
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + "%";
});
