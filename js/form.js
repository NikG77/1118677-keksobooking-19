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
})();
