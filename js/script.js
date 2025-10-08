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


  const inputElements = [...document.querySelectorAll("input.code")];
  inputElements.forEach((ele, index) => {
    ele.addEventListener("keydown", (e) => {
      if (e.keyCode === 8 && e.target.value === "")
        inputElements[Math.max(0, index - 1)].focus();
    });
    ele.addEventListener("input", (e) => {
      inputElements[index].focus();
      const [first, ...rest] = e.target.value;
      e.target.value = first ?? ""; // first will be undefined when backspace was entered, so set the input to ""
      const lastInputBox = index === inputElements.length - 1;
      const didInsertContent = first !== undefined;
      if (didInsertContent && !lastInputBox) {
        inputElements[index + 1].focus();
        inputElements[index + 1].value = rest.join("");
        inputElements[index + 1].dispatchEvent(new Event("input"));
      }
    });
  });

  function onSubmit(e) {
    e.preventDefault();
    const code = inputElements.map(({ value }) => value).join("");
    console.log(code);
  }

  // toggle password type
  $('.pass').click(function () {
    $(this).children('i').toggleClass("bi-unlock bi-lock");
    var pass = $(this).closest('.input-group').find('input')[0];
    console.log(pass);
    if (pass.type == "password") {
      pass.setAttribute("type", "text");
    } else {
      pass.setAttribute("type", "password");
    }
  })

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
    margin: 16,
    dots: true,
    rtl: dirAr,
    responsive: {
      0: {
        items: 2,
        margin: 8,
      },
      768: {
        items: 2
      },
      998: {
        items: 1
      }
    }
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
        items: 2,
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

  $(".add-address").click(function () {
    if ($(".form-address").css("display") == "block") {
      $(".form-address").hide();
    } else {
      $(".form-address").show();
    }
  });

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

  /* -------------- upload profile pic ---------------- */
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
        $('#change_pic').css("display", 'inline-block');
      }
    });
  }

});