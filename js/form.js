'use strict';

(function () {
  var NO_GUESTS = 0;
  var NumberRooms = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    NOT_FOR: 100,
  };

  var form = document.querySelector('.ad-form');
  var roomNumber = form.querySelector('#room_number');
  var capacityPeople = form.querySelector('#capacity');
  var inputTitle = form.querySelector('#title');
  var inputTypeHouse = form.querySelector('#type');
  var inputPrice = form.querySelector('#price');
  var inputTimeIn = form.querySelector('#timein');
  var inputTimeOut = form.querySelector('#timeout');


  form.addEventListener('change', function (evt) {
    evt.preventDefault();
    // Валидации по типу жилья
    if (+roomNumber.value === NumberRooms.ONE && +roomNumber.value !== +capacityPeople.value) {
      roomNumber.setCustomValidity('Допустимо 1 комната — «для 1 гостя»');
    } else if (+roomNumber.value === NumberRooms.TWO && (+roomNumber.value < +capacityPeople.value || +capacityPeople.value === NO_GUESTS)) {
      roomNumber.setCustomValidity('Допустимо 2 комнаты — «для 2 гостей» или «для 1 гостя»');
    } else if (+roomNumber.value === NumberRooms.THREE && (+roomNumber.value < +capacityPeople.value || +capacityPeople.value === NO_GUESTS)) {
      roomNumber.setCustomValidity('Допустимо 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
    } else if (+roomNumber.value === NumberRooms.NOT_FOR && +capacityPeople.value !== NO_GUESTS) {
      roomNumber.setCustomValidity('Допустимо 100 комнат — «не для гостей»');
    } else {
      roomNumber.setCustomValidity('');
    }

    // Валидация заголовка объявления
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов, но не более 100 символов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Заголовок объявления - обязательное поле для заполнения и должен состоять минимум из 30 символов, но не более 100 символов');
    } else {
      inputTitle.setCustomValidity('');
    }
  });

  // Настройка соответсвия типа жилья и цены
  inputTypeHouse.addEventListener('input', function () {
    inputPrice.min = window.data.minAvailablePrice[inputTypeHouse.value];
    inputPrice.placeholder = window.data.minAvailablePrice[inputTypeHouse.value];
  });

  // Настройка соответсвия времени въезда выезда
  inputTimeIn.addEventListener('input', function () {
    inputTimeOut.value = inputTimeIn.value;
  });

  inputTimeOut.addEventListener('input', function () {
    inputTimeIn.value = inputTimeOut.value;
  });

})();
