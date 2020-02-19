'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var fileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var preview = document.querySelector('.ad-form__photo');

  var i = 0;
  var newElementImg = [];


  fileChooser.addEventListener('change', function () {

    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        newElementImg[i] = document.createElement('img');
        newElementImg[i].dataset.index = i;
        preview.insertBefore(newElementImg[i], preview.childNodes[0]);
        preview.querySelector('img').alt = 'Фотография жилья N' + (i + 1);
        preview.querySelector('img').width = '70';
        preview.querySelector('img').height = '70';
        preview.querySelector('img').src = reader.result;
        i++;
      });

      reader.readAsDataURL(file);
    }
  });


})();
