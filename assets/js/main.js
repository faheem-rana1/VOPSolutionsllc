
const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.navlinks');
if(toggle && nav){
  toggle.addEventListener('click',()=>nav.classList.toggle('open'));
}
