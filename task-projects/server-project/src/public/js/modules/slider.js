const slider = function () {
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
    if (i >= 0 && i < 10) {
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
      offset = parseFloat(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      counter.textContent = prettifyIndex(sliderIndex);
      switchDot(sliderIndex - 1);
    });
  });
};

export default slider;
