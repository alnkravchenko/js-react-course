const openModal = (modalSelector, modalTimerId) => {
  const modal = document.querySelector(modalSelector);
  document.body.style.overflow = "hidden";

  modal.classList.remove("hide");
  modal.classList.add("show");

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
};

const closeModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector);
  document.body.style.overflow = "";

  modal.classList.remove("show");
  modal.classList.add("hide");
};

const modal = (modalSelector, triggerSelector, modalTimerId) => {
  const modal = document.querySelector(modalSelector),
    modalBtn = document.querySelectorAll(triggerSelector);

  modalBtn.forEach((btn) => {
    btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
  });

  modal.addEventListener("click", (event) => {
    if (event.target && (event.target === modal || event.target.getAttribute("data-close") == "")) {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code == "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  };

  window.addEventListener("scroll", showModalByScroll);
};

export default modal;
export { openModal, closeModal };
