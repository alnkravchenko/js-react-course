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

  new MenuCard(
    'Меню "Фитнес"',
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    8,
    30,
    "menu__item",
    "big"
  ).render(".menu .container");

  new MenuCard(
    'Меню "Премиум"',
    "img/tabs/elite.jpg",
    "elite",
    'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    18,
    30
  ).render(".menu .container");

  new MenuCard(
    'Меню "Постное"',
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    30
  ).render(".menu .container");


  // Forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Thanks!",
    failure: "Something went wrong..."
  };

  const postData = form => {
    form.addEventListener("submit", event => {
      event.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const req = new XMLHttpRequest();
      req.open("POST", "/test");
      req.setRequestHeader("Content-type", "application/json");

      const formData = new FormData(form);

      const obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });

      req.send(JSON.stringify(obj));

      req.addEventListener("load", () => {
        if (req.status == 200) {
          console.log(req.response);
          showThanksModal(message.success);
          form.reset();
          statusMessage.remove();
        } else {
          showThanksModal(message.failure);
        }
      });
    });
  };

  forms.forEach(postData);

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

});
