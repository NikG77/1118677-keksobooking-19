'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var roomNumber = form.querySelector('#room_number');
  var capacityPeople = form.querySelector('#capacity');

  // Проверка кастомной валидации на imput
  form.addEventListener('change', function (evt) {
    evt.preventDefault();
    if (+roomNumber.value === 1 && +roomNumber.value !== +capacityPeople.value) {
      roomNumber.setCustomValidity('Допустимо 1 комната — «для 1 гостя»');
    } else if (+roomNumber.value === 2 && (+roomNumber.value < +capacityPeople.value || +capacityPeople.value === 0)) {
      roomNumber.setCustomValidity('Допустимо 2 комнаты — «для 2 гостей» или «для 1 гостя»');
    } else if (+roomNumber.value === 3 && (+roomNumber.value < +capacityPeople.value || +capacityPeople.value === 0)) {
      roomNumber.setCustomValidity('Допустимо 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    } else if (+roomNumber.value === 100 && +capacityPeople.value !== 0) {
      roomNumber.setCustomValidity('Допустимо 100 комнат — «не для гостей»');
    } else {
      roomNumber.setCustomValidity('');
    }
  });


  // Валидация Заголовка объявления
  var inputTitle = form.querySelector('#title');
  inputTitle.addEventListener('input', function (evt) {
    evt.preventDefault();
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Имя должно состоять минимум из 30-х символов, но не более 100-ти символов ');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Имя не должно превышать 100-ти символов');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Обязательное поле для заполнения');
    } else {
      inputTitle.setCustomValidity('');
    }
  });

  // Валидация поля Цены за ночь
  var inputPrice = form.querySelector('#price');
  inputPrice.addEventListener('input', function (evt) {
    evt.preventDefault();
    if (inputPrice.validity.tooShort) {
      inputPrice.setCustomValidity('Имя должно состоять минимум из 30-х символов, но не более 100-ти символов ');
    } else if (inputPrice.validity.tooLong) {
      inputPrice.setCustomValidity('Имя не должно превышать 100-ти символов');
    } else if (inputPrice.validity.valueMissing) {
      inputPrice.setCustomValidity('Обязательное поле для заполнения');
    } else {
      inputPrice.setCustomValidity('');
    }
  });


  inputTitle.value = 'Временно чтоб постоянно не забивать данные при проверки валидации';

})();
