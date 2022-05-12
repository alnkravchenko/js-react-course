'use strict';

window.addEventListener("DOMContentLoaded", () => {

  // Tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

  const hideTabContent = (tabs, content) => {
    content.forEach(element => {
      element.classList.add("hide");
      element.classList.remove("show", "fade");
    });

    tabs.forEach(tab => {
      tab.classList.remove("tabheader__item_active");
    });
  };

  const showTabContent = (tabs, content, tabIndex = 0) => {
    content[tabIndex].classList.remove("hide");
    content[tabIndex].classList.add("show", "fade");

    tabs[tabIndex].classList.add("tabheader__item_active");
  };

  const activateTab = (tabsParent, tabs, content) => {
    tabsParent.addEventListener("click", (event) => {
      event.preventDefault();
      if (event.target && event.target.classList.contains("tabheader__item")) {
        const tabIndex = Array.from(tabs).indexOf(event.target);
        hideTabContent(tabs, content);
        showTabContent(tabs, content, tabIndex);
      }
    });
  };

  hideTabContent(tabs, tabsContent);
  showTabContent(tabs, tabsContent);
  activateTab(tabsParent, tabs, tabsContent);


  // Timer
  const deadline = new Date(Date.parse(new Date()) + (6 * 24 * 60 * 60 * 1000));

  const getTimeRemaining = endTime => {
    let days, hours, minutes, seconds;
    const start = new Date(),
          end = Date.parse(endTime),
          diff = end - start;
    if (diff > 0) {
      days = Math.floor(diff / (1000 * 60 * 60 * 24));
      hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((diff / (1000 * 60)) % 60);
      seconds = Math.floor((diff / 1000) % 60);
    } else {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    }

    return {
      "total": diff,
      "days": days,
      "hours": hours,
      "minutes": minutes,
      "seconds": seconds,
    };
  };

  const prettifyTime = value => {
    if (value >= 0 && value < 10) {
      return `0${value}`;
    } else {
      return value;
    }
  };

  const startTimer = (selector, endTime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector("#days"),
          hours = timer.querySelector("#hours"),
          minutes = timer.querySelector("#minutes"),
          seconds = timer.querySelector("#seconds"),
          timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const time = getTimeRemaining(endTime);

      days.innerHTML = prettifyTime(time.days);
      hours.innerHTML = prettifyTime(time.hours);
      minutes.innerHTML = prettifyTime(time.minutes);
      seconds.innerHTML = prettifyTime(time.seconds);

      if (time.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  };

  startTimer(".timer", deadline);

  // Modal window
  const modal = document.querySelector(".modal"),
        modalBtn = document.querySelectorAll("[data-modal]");

  const openModal = () => {
    document.body.style.overflow = "hidden";

    modal.classList.remove("hide");
    modal.classList.add("show");
    clearInterval(modalTimerId);
  };

  const closeModal = () => {
    document.body.style.overflow = "";

    modal.classList.remove("show");
    modal.classList.add("hide");
  };

  modalBtn.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target && (event.target === modal || event.target.getAttribute("data-close") == "")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code == "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  };

  window.addEventListener("scroll", showModalByScroll);
  
  // Menu field

  class MenuCard {
    constructor(name, imagePath, alt, desc, price, rate, ...classes) {
      this.name = name;
      this.img = imagePath;
      this.alt = alt;
      this.description = desc;
      this.price = price;
      this.classes = classes;
      this.convertToUAH(rate);
    }

    convertToUAH(rate) {
      this.price = this.price * rate;
    }

    render(parentSelector) {
      const parent = document.querySelector(parentSelector);
      const div = document.createElement("div");
      if (!this.classes.length) { 
        this.classes = ["menu__item"];
      }
      this.classes.forEach(className => div.classList.add(className));
      div.innerHTML = `
          <img src=${this.img} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.name}</h3>
          <div class="menu__item-descr">${this.description}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
      `;
      parent.append(div);
    }
  }

  axios.get("http://localhost:3000/menu")
    .then(res => {
      res.data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(title, img, altimg, descr, price, 30)
          .render(".menu .container");
      });
    });

  // Forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Thanks!",
    failure: "Something went wrong..."
  };

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: data
    });

    return await res.json();
  };

  const bindPostData = form => {
    form.addEventListener("submit", event => {
      event.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
      .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
      })
      .catch(() => showThanksModal(message.failure))
      .finally(() => form.reset());

    });
  };

  forms.forEach(bindPostData);

  const showThanksModal = message => {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    prevModalDialog.classList.remove("show");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
    <div class="modal__content">
      <form action="#">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </form>
    </div>
    `;

    modal.append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 3000);
  };

  // Slider

  const slider = document.querySelector(".offer__slider"),
        slides = slider.querySelectorAll(".offer__slide"),
        prevBtn = slider.querySelector(".offer__slider-prev"),
        nextBtn = slider.querySelector(".offer__slider-next"),
        counter = slider.querySelector("#current"),
        total = slider.querySelector("#total"),
        slidesWrapper = slider.querySelector(".offer__slider-wrapper"),
        slidesField = slidesWrapper.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width;

  let sliderIndex = 1;
  let offset = 0;

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
        dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  const prettifyIndex = i => {
    if (i >= 0 && i < 10){
      return `0${i}`;
    } else {
      return i;
    }
  };

  const switchDot = index => {
    dots.forEach(dot => dot.style.opacity = ".5");
    dots[index].style.opacity = 1;
  };

  prevBtn.addEventListener("click", () => {
    if (offset == 0) {
      offset = parseFloat(width) * (slides.length - 1);
    } else {
      offset -= parseFloat(width);
    }
    if (sliderIndex > 1) {
      sliderIndex--;
    } else {
      sliderIndex = +total.textContent;
    }
    counter.textContent = prettifyIndex(sliderIndex);
    slidesField.style.transform = `translateX(-${offset}px)`;

    switchDot(sliderIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (offset == parseFloat(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += parseFloat(width);
    }
    if (sliderIndex < slides.length) {
      sliderIndex++;
    } else {
      sliderIndex = 1;
    }
    counter.textContent = prettifyIndex(sliderIndex);
    slidesField.style.transform = `translateX(-${offset}px)`;

    switchDot(sliderIndex - 1);
  });

  counter.textContent = prettifyIndex(1);
  total.textContent = prettifyIndex(slides.length);

  dots.forEach(dot => {
    dot.addEventListener("click", event => {
      const slideTo = event.target.getAttribute("data-slide-to");

      sliderIndex = slideTo;
      offset = parseInt(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      counter.textContent = prettifyIndex(sliderIndex);
      switchDot(sliderIndex - 1);
    });
  });

  // Calculator

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
});