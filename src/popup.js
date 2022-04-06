class PopUp {
  constructor() {
    this.popup = document.querySelector(".popup__body");
    this.popupContainer = document.querySelector(".popup__container");
    this.popup.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hidePopup();
    });
  }

  setClickEventListen(event) {
    this.onClick = event;
  }

  showWithTxt(txt) {
    this.popup.value = txt;
    this.popup.textContent = txt;
    this.popupContainer.classList.remove("hide");
  }
  hidePopup() {
    this.popupContainer.classList.add("hide");
  }
}

export default PopUp;
