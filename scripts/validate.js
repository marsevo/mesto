const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__error_visible'
}
// ф-ия валидации всех форм 
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        form.addEventListener('input', () => {
            toggleButton(form, config);
        });
        setEventListeners(form, config);
        toggleButton(form, config);
    });
}

// ф-ия проверки на валидность и вывода сообщения вылидации
const checkInputValidity = (evt, config) => {
    const input = evt.target;
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`);   //span элемент c id : "inputID + -errorr"

    if (input.validity.valid) {
        input.classList.remove(config.inputErrorClass)
        errorElement.textContent = '';
    } else {
        input.classList.add(config.inputErrorClass);
        errorElement.textContent = input.validationMessage;
    }
}

// ф-ия подключения кнопки
const enableButton = (config, buttonSubmit) => {
    buttonSubmit.classList.remove(config.inactiveButtonClass);
    buttonSubmit.disabled = false;
}

// ф-ия отключения кнопки
const disableButton = (config, buttonSubmit) => {
    buttonSubmit.classList.add(config.inactiveButtonClass);
    buttonSubmit.disabled = true;
}
// ф-ия проверки инпутов на валидность
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    }) 
}

// Функция переключения кнопки submit
const toggleButton = (form, config) => {
    const buttonSubmit = form.querySelector(config.submitButtonSelector);
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));

    if (hasInvalidInput(inputList)) {
        disableButton(config, buttonSubmit);

    } else {
        enableButton(config, buttonSubmit);
    }
}

// ф-ия обработки событий для всех инпутов 
const setEventListeners = (form, config) => {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    inputList.forEach(function (item) {
        item.addEventListener('input', (evt) => {
            checkInputValidity(evt, config);
        })
    });
}

// включение валидации
enableValidation(validationConfig); 
