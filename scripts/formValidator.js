class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formSelector = config.formSelector;
    this._form = form;
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._inputListArr = Array.from(this._inputList);
  }

  // функция валидации формы 
  enableValidation() {
    this._addInputListeners();
  };

  // add класс ошибки 
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`); //span элемент c id : "inputID + -errorr"
    inputElement.classList.add(this._inputErrorClass);
    inputElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  // remove класс ошибки 
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`); //span элемент c id : "inputID + -errorr"
    inputElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }

  // проверка валидности input
  _handleFormInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // функция переключения кнопки submit
  _toggleButton() {
    let flag = 1;
    this._inputListArr.forEach((input) => {
      if (input.value == null || input.value == '' || !input.validity.valid) {
        this._buttonSubmit.classList.add(this._inactiveButtonClass);
        this._buttonSubmit.disabled = true;
        flag = 0;
      }
      else if (flag != 0) {
        this._buttonSubmit.classList.remove(this._inactiveButtonClass);
        this._buttonSubmit.disabled = false;
      }
    });
  }

  // функция слушателей всех инпутов 
  _addInputListeners() {
    this._toggleButton();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handleFormInput(inputElement);
        this._toggleButton();
      });
    })
  };

  // очистка валидации при закрытии формы 
  clearValidationForm() {
    this._toggleButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }
}

export { FormValidator };