export default class PopUp {
  constructor(message) {
    this.popup = document.querySelector(".popup__body");
    this.popupContainer = document.querySelector(".popup__container");
    this.popup.addEventListener("click", () => this.clickEvent());
    this._clickEvent;
    this.message = message;
    this.setContent(this.message);
  }
  set clickEvent(f) {
    this._clickEvent = f;
  }
  get clickEvent() {
    return this._clickEvent;
  }

  show() {
    this.popupContainer.classList.remove("hide");
  }
  hide() {
    this.popupContainer.classList.add("hide");
  }
  setContent(value) {
    console.log("this?");
    this.popup.value = value;
    this.popup.textContent = value;
  }
}
