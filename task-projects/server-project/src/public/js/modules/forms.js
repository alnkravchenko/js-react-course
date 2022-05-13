import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

const forms = (formSelector, modalTimerId) => {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/form/spinner.svg",
    success: "Thanks!",
    failure: "Something went wrong..."
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
    const prevModalDialog = document.querySelector(".modal__dialog"),
      modal = document.querySelector(".modal");
    prevModalDialog.classList.add("hide");
    prevModalDialog.classList.remove("show");
    openModal(".modal", modalTimerId);

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
      closeModal(".modal");
    }, 3000);
  };

};

export default forms;
