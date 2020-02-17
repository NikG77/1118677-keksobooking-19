'use strict';
// Работает с фильтрами
(function () {
  var filters = document.querySelector('.map__filters');
  var filterTypeOfHouse = filters.querySelector('#housing-type');
  var addressDataCopy = [];


  filterTypeOfHouse.addEventListener('change', function () {
    if (window.map.openCardStatus) {
      window.map.closePopup();
    }
    addressDataCopy = [];
    if (filterTypeOfHouse.value === 'any') {
      addressDataCopy = window.map.addressData;
    } else {
      addressDataCopy = window.map.addressData.filter(function (data) {
        return data.offer.type === filterTypeOfHouse.value;
      });
    }

    window.pin.renderPins(addressDataCopy.slice(0, 5));

  });
  /*
  // console.log('статус', window.map.openCardStatus);

  // Фильтр по типу жилья
  filterTypeOfHouse.addEventListener('change', function () {
    if (window.map.openCardStatus) {
      window.map.closePopup();
    }

    addressDataCopy = [];
    if (filterTypeOfHouse.value === 'any') {
      addressDataCopy = window.map.addressData;
    } else {
      addressDataCopy = window.map.addressData.filter(function (data) {

        return data.offer.type === filterTypeOfHouse.value;
      });
    }

    console.log('Массив после фильтрации', addressDataCopy, addressDataCopy.slice(0, 1));
    window.pin.renderPins(addressDataCopy);


  });
*/
})();
