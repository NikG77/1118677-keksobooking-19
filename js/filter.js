'use strict';
// Работает с фильтрами
(function () {
  var filters = document.querySelector('.map__filters');
  var filterTypeOfHouse = filters.querySelector('#housing-type');


  // Фильтрация по типу жилья
  filterTypeOfHouse.addEventListener('change', function () {
    if (window.map.openCardStatus) {
      window.map.closePopup();
    }

    if (filterTypeOfHouse.value === 'any') {
      window.map.addressDataCopy = window.map.addressData;
    } else {
      window.map.addressDataCopy = window.map.addressData.filter(function (data) {
        return data.offer.type === filterTypeOfHouse.value;
      });
    }

    window.pin.renderPins(window.map.addressDataCopy.slice(0, window.data.NUMBER_PIN_SHOW));

  });

})();
