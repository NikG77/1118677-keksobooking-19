'use strict';
// Обработка успешной и неуспешной отправки формы
(function () {
  var main = document.querySelector('main');

  // Закрытие окна успешной загрузки
  var closePopupSuccessLoad = function () {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', onSuccessLoadEscPress);
    document.removeEventListener('click', onSuccessLoadClickOutPress);
  };

  // Закрытие окна неуспешной загрузки
  var closePopupErrorLoad = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorLoadEscPress);
    document.removeEventListener('click', onErrorLoadClickOutPress);
  };

  // Обработчик закрытия окна при неуспешной загрузки по ESC
  var onErrorLoadEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopupErrorLoad);
  };

  // Обработчик закрытия окна при неуспешной загрузки по клику
  // вне этой области экрана
  var onErrorLoadClickOutPress = function (evt) {
    var targetSuccess = evt.target.closest('.error__message');
    if (!targetSuccess) {
      closePopupErrorLoad();
    }
  };

  // Обработчик закрытия окна успешной загрузки по ESC
  var onSuccessLoadEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopupSuccessLoad);
  };

  // Обработчик закрытия окна успешной загрузки по клику
  // в этой области экрана
  var onSuccessLoadClickOutPress = function (evt) {
    var targetSuccess = evt.target.closest('.success__message');
    if (!targetSuccess) {
      closePopupSuccessLoad();
    }
  };

  // Успешная отправка форм
  var onLoadForm = function () {
    window.map.resetForm();
    // Выводит по шаблону сообщение об успешной отправки формы
    var successTemplate = document.querySelector('#success').content;
    var successElement = successTemplate.cloneNode(true);
    main.appendChild(successElement);

    // Слушатель на закрытие сообщения успешной отправки
    document.addEventListener('keydown', onSuccessLoadEscPress);
    // Слушатель по клику
    document.addEventListener('click', onSuccessLoadClickOutPress);
  };

  // Неуспешная отправка формы
  var onErrorForm = function () {

    // Выводит по шаблону сообщение об неуспешной отправки формы
    var errorTemplate = document.querySelector('#error').content;
    var errorElement = errorTemplate.cloneNode(true);
    main.appendChild(errorElement);

    // Слушатель на закрытие сообщения успешной отправки
    document.addEventListener('keydown', onErrorLoadEscPress);

    // Слушатель по клику
    document.addEventListener('click', onErrorLoadClickOutPress);

    var errorButton = document.querySelector('.error__button');
    // Слушатель по Enter на поле
    errorButton.addEventListener('click', closePopupErrorLoad);
  };

  window.unloadHandlers = {
    onLoadForm: onLoadForm,
    onErrorForm: onErrorForm
  };

})();
