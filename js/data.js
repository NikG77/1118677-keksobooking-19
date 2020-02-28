'use strict';

(function () {

  window.data = {
    NUMBER_PIN_SHOW: 5,

    // Для "переводчика"
    typeHouseListMap: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },

    // Минимальные цены для типов жилья
    minAvailablePrice: {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    },

    // Флаг активно окно или нет
    flagOpenMap: false,
  };
})();

