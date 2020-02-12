'use strict';

(function () {
  var NOT_FOR_GUESTS_ROOMS = 100;
  var NO_GUESTS = 0;

  var minAvailablePrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var form = document.querySelector('.ad-form');
  var roomNumber = form.querySelector('#room_number');
  var capacityPeople = form.querySelector('#capacity');
  var inputTitle = form.querySelector('#title');
  var inputTypeHouse = form.querySelector('#type');
  var inputPrice = form.querySelector('#price');
  var inputTimeIn = form.querySelector('#timein');
  var inputTimeOut = form.querySelector('#timeout');

  // Проверка кастомной валидации на input
  form.addEventListener('change', function (evt) {
    evt.preventDefault();
    if (+roomNumber.value === 1 && +roomNumber.value !== +capacityPeople.value) {
      roomNumber.setCustomValidity('Допустимо 1 комната — «для 1 гостя»');
    } else if (+roomNumber.value === 2 && (+roomNumber.value < +capacityPeople.value || +capacityPeople.value === NO_GUESTS)) {
      roomNumber.setCustomValidity('Допустимо 2 комнаты — «для 2 гостей» или «для 1 гостя»');
    } else if (+roomNumber.value === 3 && (+roomNumber.value < +capacityPeople.value || +capacityPeople.value === NO_GUESTS)) {
      roomNumber.setCustomValidity('Допустимо 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    } else if (+roomNumber.value === NOT_FOR_GUESTS_ROOMS && +capacityPeople.value !== NO_GUESTS) {
      roomNumber.setCustomValidity('Допустимо 100 комнат — «не для гостей»');
    } else {
      roomNumber.setCustomValidity('');
    }
  });

  // Проверка соответсвия типа жилья и цены
  inputTypeHouse.addEventListener('input', function () {
    inputPrice.placeholder = minAvailablePrice[inputTypeHouse.value];
    inputPrice.min = minAvailablePrice[inputTypeHouse.value];
  });

  // Проверка соответсвия времени въезда выезда
  inputTimeIn.addEventListener('input', function () {
    inputTimeOut.value = inputTimeIn.value;
  });

  inputTimeOut.addEventListener('input', function () {
    inputTimeIn.value = inputTimeOut.value;
  });

  // Валидация Заголовка объявления
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

  inputTitle.value = 'Временно чтоб постоянно не забивать данные при проверки валидации';

})();
