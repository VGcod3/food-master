const calc = () => {

  const result = document.querySelector('.calculating__result span')

  let sex = "female", height, weight, age, ratio = 1.375;

  calc()

  getStaticInformation('#gender', 'calculating__choose-item_active')
  getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active')

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');


  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
        } else {
          sex = e.target.getAttribute('id');
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calc();
      });
    });
  }


  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      switch (input.getAttribute('id')) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calc();
    });
  }

  function calc() {

    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    let maleK = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)

    let femaleK = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)

    result.innerText = (sex == 'female') ? femaleK : maleK;
  }
}

export default calc;