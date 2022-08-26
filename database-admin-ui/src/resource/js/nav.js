const btn = document.querySelector('.hamburger');
const ps = document.querySelectorAll('.nav-link p');
const spans = document.querySelectorAll('.hamburger span')

btn.addEventListener('click', function () {
  spans.forEach(span => span.classList.toggle('active'));
  ps.forEach(p => p.classList.toggle('active'));
  document.body.classList.toggle("active");
});


const navlinks = document.querySelectorAll('.nav-link');
navlinks.forEach(navlink => {
  navlink.addEventListener('click', function(a) {
    let current = document.getElementsByClassName("act")[0];
    current.className = current.className.replace(" act", "");
    this.className += " act";
  });
});