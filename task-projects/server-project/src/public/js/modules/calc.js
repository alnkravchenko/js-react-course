const calc = function () {
  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", sex);
  }

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", ratio);
  }

  const initLocalSetting = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute("id") == localStorage.getItem("sex")) {
        elem.classList.add(activeClass);
      }

      if (elem.getAttribute("data-ratio") == localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  };

  initLocalSetting("#gender div", "calculating__choose-item_active");
  initLocalSetting(".calculating__choose_big div", "calculating__choose-item_active");

  const calculateCalories = () => {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return;
    }

    if (sex == "female") {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  };

  calculateCalories();

  const getStaticInfo = (selector, activeClass) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener("click", event => {
        if (event.target.getAttribute("data-ratio")) {
          ratio = +event.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", ratio);
        } else {
          sex = event.target.getAttribute("id");
          localStorage.setItem("sex", sex);
        }

        elements.forEach(elem => elem.classList.remove(activeClass));
        event.target.classList.add(activeClass);

        calculateCalories();
      });
    });
  };

  getStaticInfo("#gender div", "calculating__choose-item_active");
  getStaticInfo(".calculating__choose_big div", "calculating__choose-item_active");

  const getDynamicInfo = selector => {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {

      if (input.value.match(/\D/g)) {
        input.style.border = "1.5px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute("id")) {
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

      calculateCalories();
    });
  };

  getDynamicInfo("#height");
  getDynamicInfo("#weight");
  getDynamicInfo("#age");
};

module.exports = calc;
