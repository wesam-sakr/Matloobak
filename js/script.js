$(document).ready(function () {

  var bodyDir = $('body').css('direction')
  var dirAr
  if (bodyDir == "rtl") {
    dirAr = true
  }
  else {
    dirAr = false
  }

  // loading

  $("body").css('overflow-y', 'auto');

  $('#loading').fadeOut(500);

  $('select').niceSelect();

  $(".fav").click(function () {
    $(this).find("i").toggleClass("bi-heart bi-heart-fill");
  });


  // ----- scroll top button ------

  var btn_top = $('#scroll-top');

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn_top.addClass('show');
    } else {
      btn_top.removeClass('show');
    }
  })

  btn_top.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  });


  // upload and preview multiple media *images and videos* such as dropzone
  function MediaUpload() {
    var mediaArray = [];

    $('.upload__inputfile').each(function () {
      $(this).on('change', function (e) {
        var mediaWrap = $(this).closest('.upload__box').find('.upload__media-wrap');
        var maxLength = $(this).attr('data-max_length');
        var files = Array.from(e.target.files);

        files.forEach(function (file) {
          // تأكد أنه صورة أو فيديو فقط
          if (!file.type.match('image.*') && !file.type.match('video.*')) return;

          if (mediaArray.length >= maxLength) return false;

          mediaArray.push(file);

          var reader = new FileReader();
          reader.onload = function (e) {
            let html = "";

            if (file.type.match('image.*')) {
              html = `
              <div class="col">
                <div class='upload__media-box'>
                  <div data-file='${file.name}' class='media-bg'>
                    <div class='upload__media-close'></div>
                    <img src='${e.target.result}' alt='image'>
                  </div>
                </div>
              </div>`;
            } else if (file.type.match('video.*')) {
              html = `
              <div class="col">
                <div class='upload__media-box'>
                  <div data-file='${file.name}' class='media-bg'>
                    <div class='upload__media-close'></div>
                    <video src='${e.target.result}' controls></video>
                  </div>
                </div>
              </div>`;
            }

            mediaWrap.append(html);
          };
          reader.readAsDataURL(file);
        });
      });
    });

    // حذف عنصر
    $(document).on('click', ".upload__media-close", function () {
      var inputElement = $('.upload__inputfile')[0];
      var fileName = $(this).parent().data("file");
      var dt = new DataTransfer();

      mediaArray = mediaArray.filter(file => file.name !== fileName);

      for (var i = 0; i < inputElement.files.length; i++) {
        if (inputElement.files[i].name !== fileName) {
          dt.items.add(inputElement.files[i]);
        }
      }

      inputElement.files = dt.files;
      $(this).closest('.col').remove();

      console.log("remaining files:", mediaArray);
    });
  }
  MediaUpload();

  // verification code OTP
  if ($('#verification-input').length > 0) {
    const inputs = Array.from(document.getElementById("verification-input").children);
    function getFirstEmptyIndex() {
      return inputs.findIndex((input) => input.value === "");
    }
    inputs.forEach((input, i) => {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace") {
          if (input.value === "" && i > 0) {
            inputs[i - 1].value = "";
            inputs[i - 1].focus();
          }

          for (let j = i; j < inputs.length; j++) {
            let value = inputs[j + 1] ? inputs[j + 1].value : "";
            inputs[j].setRangeText(value, 0, 1, "start");
          }
        }

        if (e.key === "ArrowLeft" && i > 0) {
          inputs[i - 1].focus();
        }

        if (e.key === "ArrowRight" && i < inputs.length - 1) {
          inputs[i + 1].focus();
        }
      });

      input.addEventListener("input", (e) => {
        input.value = "";

        const start = getFirstEmptyIndex();
        inputs[start].value = e.data;

        if (start + 1 < inputs.length) inputs[start + 1].focus();
      });

      input.addEventListener("paste", (e) => {
        e.preventDefault();

        const text = (event.clipboardData || window.clipboardData).getData("text");
        const firstEmpty = getFirstEmptyIndex();
        const start = firstEmpty !== -1 ? Math.min(i, firstEmpty) : i;

        for (let i = 0; start + i < inputs.length && i < text.length; i++) {
          inputs[start + i].value = text.charAt(i);
        }

        inputs[Math.min(start + text.length, inputs.length - 1)].focus();
      });

      input.addEventListener("focus", () => {
        const start = getFirstEmptyIndex();
        if (start !== -1 && i > start) inputs[start].focus();
      });
    });
  }

  // toggle password type
  $('.pass').click(function () {
    $(this).children('i').toggleClass("bi-eye-fill bi-eye-slash-fill");
    var pass = $(this).closest('.input-group').find('input')[0];
    console.log(pass);
    if (pass.type == "password") {
      pass.setAttribute("type", "text");
    } else {
      pass.setAttribute("type", "password");
    }
  })

  // toggle filter and profile in responsive
  $("#filter").click(function () {
    $(".filter").toggleClass("filter-toggle");
  });
  $(".filter-header .btn-close").click(function () {
    $(".filter").toggleClass("filter-toggle");
  });

  $("#profile_nav").click(function () {
    $(".profile-nav").toggleClass("Pnav-toggle");
  });
  $(".profile-header .btn-close").click(function () {
    $(".profile-nav").toggleClass("Pnav-toggle");
  });

  // carousels
    $('.adv-assets .owl-carousel').on('initialized.owl.carousel changed.owl.carousel', function (e) {
    if (!e.namespace) {
      return;
    }
    var carousel = e.relatedTarget;
    $('.slider-counter .len').html(`${carousel.items().length}`)
    $('.slider-counter .current').html(`${carousel.relative(carousel.current()) + 1}`)
  }).owlCarousel({
    loop: true,
    autoplay: true,
    items: 1,
    margin: 16,
    dots: true,
    rtl: dirAr,

  })

  $(".related-adv .owl-carousel").owlCarousel({
    loop: true,
    autoplay: true,
    margin: 16,
    nav: true,
    navText: ['<i class="bi bi-arrow-right"></i>', '<i class="bi bi-arrow-left"></i>'],
    rtl: dirAr,
    responsive: {
      0: {
        items: 1,
        margin: 8,
      },
      768: {
        items: 2
      },
      998: {
        items: 3
      }
    }
  })

  // upload profile pic 
  if ($(".profile-pic").length > 0) {
    const imgDiv = document.querySelector(".profile-pic");
    const img = document.querySelector("#photo");
    const file = document.querySelector("#file");
    const uploadBtn = document.querySelector("#uploadBtn");

    //when we choose a pic to upload

    file.addEventListener("change", function () {
      const choosedFile = this.files[0];
      if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          img.setAttribute("src", reader.result);
        });
        reader.readAsDataURL(choosedFile);
        $('.profile-pic .save_img').css("opacity", 1);
      }
    });
  }

});