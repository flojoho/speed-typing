

const modal = document.getElementById('modal');
const infoIcon = document.getElementById('infoIcon');
const modalContent = document.getElementById('modalContent');

infoIcon.addEventListener('click', () => {
  modal.classList.add('show');
});

modal.addEventListener('click', e => {
  if(e.target !== modalContent) {
    modal.classList.remove('show');
  }
});