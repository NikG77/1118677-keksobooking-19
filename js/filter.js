'use strict';
// Фильтры
(function () {
  var PRICE_MIDLE = {
    MIN: 10000,
    MAX: 50000,
  };

  var filters = document.querySelector('.map__filters');
  var filterTypeOfHouse = filters.querySelector('#housing-type');
  var filterPriceOfHouse = filters.querySelector('#housing-price');
  var filterRoomsOfHouse = filters.querySelector('#housing-rooms');
  var filterGuestOfHouse = filters.querySelector('#housing-guests');
  var filterFeaturesOfHouse = filters.querySelector('#housing-features');

  var updateFilters = function () {
    var filterFeaturesChecked = filterFeaturesOfHouse.querySelectorAll('input[type="checkbox"]:checked');

    // Фильтрация по типу жилья
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

    // Фильтр по цене
    window.map.addressDataCopy = window.map.addressDataCopy.filter(function (data) {
      if (filterPriceOfHouse.value === 'middle' && data.offer.price >= PRICE_MIDLE.MIN && data.offer.price < PRICE_MIDLE.MAX) {
        return true;
      } else if (filterPriceOfHouse.value === 'low' && data.offer.price < PRICE_MIDLE.MIN) {
        return true;
      } else if (filterPriceOfHouse.value === 'high' && data.offer.price >= PRICE_MIDLE.MAX) {
        return true;
      }
      return filterPriceOfHouse.value === 'any';
    });

    // Фильтр по числу комнат
    window.map.addressDataCopy = window.map.addressDataCopy.filter(function (data) {
      if (+filterRoomsOfHouse.value === +data.offer.rooms) {
        return true;
      }
      return filterRoomsOfHouse.value === 'any';
    });

    // фильтр по кол-ву гостей
    window.map.addressDataCopy = window.map.addressDataCopy.filter(function (data) {
      if (+filterGuestOfHouse.value === +data.offer.guests) {
        return true;
      }
      return filterGuestOfHouse.value === 'any';
    });

    // Фильтр по удобствам
    window.map.addressDataCopy = window.map.addressDataCopy.filter(function (data) {
      var resultOfChecking = true;
      for (var i = 0; i < filterFeaturesChecked.length; i++) {
        resultOfChecking = data.offer.features.some(function (item) {
          return item === filterFeaturesChecked[i].value;
        });
        if (!resultOfChecking) {
          break;
        }
      }
      return resultOfChecking;
    });

    window.pin.renderPins(window.map.addressDataCopy.slice(0, window.data.NUMBER_PIN_SHOW));
  };

  var onSelectFilters = window.debounce(function () {
    updateFilters();
  });

  filters.addEventListener('change', onSelectFilters);

})();
