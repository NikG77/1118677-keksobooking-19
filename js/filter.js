'use strict';
// Работает с фильтрами
(function () {
  var filters = document.querySelector('.map__filters');
  var filterTypeOfHouse = filters.querySelector('#housing-type');
  var addressDataCopy = [];
  /*
  // Фильтрация по типу жилья
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

    window.pin.renderPins(addressDataCopy.slice(0, window.data.NUMBER_PIN_SHOW));

  });
    */
})();
