const cards = function () {
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
      res.data.forEach(({ img, altimg, title, descr, price }) => {
        new MenuCard(title, img, altimg, descr, price, 30)
          .render(".menu .container");
      });
    });
};

module.exports = cards;