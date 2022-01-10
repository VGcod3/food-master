import { getResource } from '../services/service'

function openModal(modalSelector, timerId) {
  const modal = document.querySelector(modalSelector);

  disableScroll();
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (timerId) {
    clearInterval(timerId);
  }

}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  enableScroll();
  modal.classList.add('hide')
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function disableScroll() {
  let widthScroll = window.innerWidth - document.body.offsetWidth;

  document.body.style.cssText = `
				top: ${window.scrollY}px;
				left: 0;
				width: 100%;
				height: 100vh;
				padding-right: ${widthScroll}px;
		`;
};

function enableScroll() {
  document.body.style.cssText = '';
};

const modal = (triggerSelector, modalSelector, timerId) => {

  const modalTrigger = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);

  //open modal on button click
  modalTrigger.forEach(btn => btn.addEventListener('click', () => { openModal(modalSelector, timerId) }))

  //close modal on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') closeModal(modalSelector);
  })

  //close modal on esc click
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) closeModal(modalSelector)
  })



  //open modal by scroll
  window.addEventListener('scroll', showModalByScroll)


  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, timerId);
      window.removeEventListener('scroll', showModalByScroll);
    }

  }


  // Используем классы для создание карточек меню

  class MenuCard {
    constructor({ img, altimg, title, descr, price, parentSelector, ...classes }) {
      this.src = img;
      this.alt = altimg;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes = [];
      this.transfer = 27;
      this.changeToUAH();
    }


    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
      this.parent.append(element);
    }
  }

  try {
    getResource('http://localhost:3000/menu')
      .then(data => {
        console.log(Object.values(data))
        Object.values(data).forEach((info) => {
          new MenuCard(info).render();
        });
      });
  } catch (error) {
    console.log(error)
  }

}

export default modal;

export { openModal, closeModal, enableScroll, disableScroll }