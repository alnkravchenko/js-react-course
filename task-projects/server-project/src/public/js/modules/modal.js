const modal = function () {
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
};

module.exports = modal;
