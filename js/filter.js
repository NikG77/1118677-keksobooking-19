'use strict';
// Фильтры
(function () {
  var filters = document.querySelector('.map__filters');
  var filterTypeOfHouse = filters.querySelector('#housing-type');
  var filterPriceOfHouse = filters.querySelector('#housing-price');
  var filterRoomsOfHouse = filters.querySelector('#housing-rooms');
  var filterGuestOfHouse = filters.querySelector('#housing-guests');
  // var filterFeaturesOfHouse = filters.querySelector('#housing-features');

  // Фильтрация по типу жилья
  filters.addEventListener('change', function () {

    window.map.addressData.forEach(function (item) {
      console.log(item.offer.guests);
    });


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
      if (filterPriceOfHouse.value === 'middle' && data.offer.price >= 10000 && data.offer.price < 50000) {
        return data.offer.price;
      } else if (filterPriceOfHouse.value === 'low' && data.offer.price < 10000) {
        return data.offer.price;
      } else if (filterPriceOfHouse.value === 'high' && data.offer.price >= 50000) {
        return data.offer.price;
      }
      return filterPriceOfHouse.value === 'any';
    });

    // Фильтр по числу комнат
    window.map.addressDataCopy = window.map.addressDataCopy.filter(function (data) {
      if (+filterRoomsOfHouse.value === +data.offer.rooms) {
        return data.offer.rooms;
      }
      return filterRoomsOfHouse.value === 'any';
    });

    console.log('До фильтра guests', filterGuestOfHouse.value, window.map.addressDataCopy);

    window.map.addressDataCopy = window.map.addressDataCopy.filter(function (data) {
      console.log('Внутри guests', filterGuestOfHouse.value, data.offer.guests);
      if (+filterGuestOfHouse.value === +data.offer.guests) {
        return data.offer.guests;
      }
      return filterGuestOfHouse.value === 'any';
    });

    console.log('На выходе', window.map.addressDataCopy);
    window.pin.renderPins(window.map.addressDataCopy.slice(0, window.data.NUMBER_PIN_SHOW));

  });

})();
