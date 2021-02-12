$(".search-button").click(function(e){
  e.preventDefault();
  $(".search-button").addClass("active");
  $("header .header-search").slideDown(250);
  setTimeout(function(){
    $("header .header-search input[type=text]").focus();
  }, 300);
  $(".main-back").addClass("active");
});

$(".main-back, .main-back-dark").click(function(e){
  e.preventDefault();
  $(".main-back").removeClass("active");
  $(".main-back-dark").removeClass("active");
  $(".reminder").removeClass("active");

  $("header .header-search").slideUp(250);
  $(".search-button").removeClass("active");
  $(".header-menu").removeClass("active");
  $(".burger-button").removeClass("active");
  $("body").removeClass("static");
  $(".input-select").removeClass("show");
});

$(".system-tabs .tabs-links a").click(function(e){
  e.preventDefault();
  var li = $(this).closest("li");
  var parent = $(this).closest(".tabs-links");
  var system = $(this).closest(".system-tabs");
  if (!li.hasClass("active")) {
    $("li", parent).removeClass("active");
    li.addClass("active");
    var width = parseInt($(this).width()) + 16;
    var left = parent[0].scrollLeft + $(this).offset().left - parent.offset().left;
    var top = ($(this).offset().top - parent.offset().top) + 22;
    $(".design-element", parent).css({"width": width+"px", "left": left+"px", "top": top+"px"});

    var tab = li.attr("data-tab");
    $("> .tabs > .tab", system).removeClass("active");
    $("> .tabs > .tab[data-tab=\""+tab+"\"]", system).addClass("active");
    var height = $("> .tabs > .tab[data-tab=\""+tab+"\"]", system).height();
    $("> .tabs", system).css("height", height+"px");

    var activeHeight = height-$("> .tabs", system).height();
    var p = $(system).parents();
    for (var i=0; i<p.length; i++) {
      if (p[i].className == "tab active") {
        var h = $(p[i]).closest(".tabs").height();
        $(p[i]).closest(".tabs").css("height", (h+activeHeight)+"px");
      }
    }

    if (window.onTabChange) window.onTabChange(tab);
  }
});

$(window).ready(function(){
  var loading = setInterval(function(){
    if (document.readyState == "complete") {
      setTimeout(function(){
        $.each($(".system-tabs .tabs-links li.active a"), function(){
          var parent = $(this).closest(".tabs-links");
          var width = parseInt($(this).width()) + 16;
          var left = parent[0].scrollLeft + $(this).offset().left - parent.offset().left;
          var top = ($(this).offset().top - parent.offset().top) + 22;
          $(".design-element", parent).css({"width": width+"px", "left": left+"px", "top": top+"px"});
        });
        $.each($(".tab.active"), function(){
          var height = $(this).height();
          $(this).closest(".tabs").css("height", height+"px");
        });
        $("body").removeClass("loading");
        setTimeout(function(){
          $("body").removeClass("transforming");
        }, 1000);
      }, 20);
      clearInterval(loading);
    }
  }, 50);
});

function openLogin (partner = false) {
  $(".header-login").addClass("active");
}

$(".header-login .wrap-login > .close, .header-login .login-bg").click(function(e){
  $(".header-login").removeClass("active");
});

$(".burger-button").click(function(e){
  e.preventDefault();
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $("header .header-menu").removeClass("active");
    $(".main-back-dark").removeClass("active");
    $("body").removeClass("static");
  } else {
    $(this).addClass("active");
    $("header .header-menu").addClass("active");
    $(".main-back-dark").addClass("active");
    $("body").addClass("static");
  }
});

$(".header-menu li.dropdown > div").click(function(e){
  e.preventDefault();
  var li = $(this).closest("li");
  if (li.hasClass("show")) {
    li.removeClass("show");
    $("> ul", li).slideUp(200);
  } else {
    li.addClass("show");
    $("> ul", li).slideDown(200);
  }
});

$(".header-menu .login-link").click(function(e){
  if ($(this).hasClass("show")) {
    $(this).removeClass("show");
    $(".header-menu .login-link ul").slideUp(200);
  } else {
    $(this).addClass("show");
    $(".header-menu .login-link ul").slideDown(200);
  }
});

if ($(".main-slider").length > 0) {
  $(".main-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    dots: false,
    infinite: false,
    speed: 1000,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          variableWidth: false
        }
      }
    ]
  });

  if ($(".main-slider .slide:nth-child("+(1)+")").hasClass("light")) {
    $(".main-slider").addClass("light");
  } else {
    $(".main-slider").removeClass("light");
  }

  // $(".main-slider-dots .design-line div").css("width", (100/$(".main-slider .slide").length)+"%");
  let shift = (100/($(".main-slider .slide").length));

  $(".main-slider").on("beforeChange", function(e, s, d, n) {
    if ($(".main-slider .slide:nth-child("+(n+1)+")").hasClass("light")) {
      $(".main-slider").addClass("light");
    } else {
      $(".main-slider").removeClass("light");
    }
    $(".wrap-main-slider .bgs div").removeClass("active");
    $(".wrap-main-slider .bgs div:nth-child("+(n+1)+")").addClass("active");
    $(".main-slider-dots .dot").removeClass("active");
    $(".main-slider-dots .dot:nth-child("+(n+1)+")").addClass("active");
    // $(".main-slider-dots .design-line div").css("left", (n*shift)+"%");
  });
}

$(".button-control").click(function(){
  var slide = $(this).closest(".slide");
  if (slide.hasClass("slick-active")) {
    $(".main-slider").slick('slickNext');
  } else {
    $(".main-slider").slick('slickPrev');
  }
});

$(".main-slider-dots .dot").click(function(){
  var index = $(this).index();
  $(".main-slider").slick('slickGoTo', index);
});

$.datepicker.regional.ru = {
  closeText: "",
  prevText: "",
  nextText: "",
  currentText: "",
  monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь",
  "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
  monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн",
  "Июл","Авг","Сен","Окт","Ноя","Дек" ],
  dayNames: [ "","","","","","","" ],
  dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
  dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
  weekHeader: "Нед",
  dateFormat: "dd.mm.yy",
  firstDay: 1,
  isRTL: false,
  showMonthAfterYear: false,
  yearSuffix: "" };
$.datepicker.setDefaults( $.datepicker.regional.ru );

$.each($(".input-date"), function(){
  $(this).datepicker({onClose: function(){
    $(this).closest(".input-date-wrap").removeClass("show");
    $("#ui-datepicker-div").removeClass("opened"); 
    setTimeout(function(){$("#ui-datepicker-div").removeClass("pos");},1);
  }, beforeShow: function () { 
    $(this).closest(".input-date-wrap").addClass("show");
    $("#ui-datepicker-div").addClass("opened"); 
    setTimeout(function(){$("#ui-datepicker-div").addClass("pos");}, 1); }
  });
  $(this).mask("99.99.9999",{autoclear: false});
});

if ($(".tickets").length > 0) {
  $(".tickets").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1020,
        settings: "unslick"
      }
    ]
  });
}

$(".link_item").click(function(e){
  var parent = $(this).closest(".system-tabs");
  e.preventDefault();
  if ($("+ .tab", $(this)).css("display") == "block") {
     var el = $("+ .tab", this);
    var activeHeight = -el.height();
    var p = $(parent).parents();
    for (var i=0; i<p.length; i++) {
      if (p[i].className == "tab active") {
        var h = $(p[i]).closest(".tabs").height();
        $(p[i]).closest(".tabs").css("height", (h+activeHeight)+"px");
      }
    }
    $(".tab", parent).slideUp(250);
  } else {
    var activeHeight = 0;
    $.each($(".tab", parent), function(){
      if ($(this).css("display") == "block") {
        activeHeight -= $(this).height();
        return;
      }
    });

    var el = $("+ .tab", this);
    el.css({
      position:   'absolute',
      visibility: 'hidden',
      display:    'block'
    });

    activeHeight += el.height();

    var p = $(parent).parents();
    for (var i=0; i<p.length; i++) {
      if (p[i].className == "tab active") {
        var h = $(p[i]).closest(".tabs").height();
        $(p[i]).closest(".tabs").css("height", (h+activeHeight)+"px");
      }
    }

    el.attr("style", "");

    $(".tab", parent).slideUp(250);
    $("+ .tab", $(this)).slideDown(250);
  }
});

$.each($("input[type=\"tel\"]") , function(){
  $(this).mask("+7 999 999 99 99",{autoclear: false});
});

var emainPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

$("form").submit(function(e){
  var ok = true;
  var form = $(this);
  $("input").removeClass("failed");
  $.each($("input[data-req], textarea[data-req]", $(this)), function(){
    if (($(this).attr("type") == "tel" && ($(this).val().split("")[15] == undefined || $(this).val().split("")[15] == "_")) || ($(this).attr("type") == "email" && !emainPattern.test($(this).val())) || ($(this).attr("type") == "checkbox" && !$(this).prop( "checked" )) || ($.trim($(this).val()) == "")) {
      $(this).addClass("failed");
      if (ok) {
        $('html, body').animate({
          scrollTop: $(this).offset().top-100
        }, 250);
      }
      ok = false;
    }
    if ($(this).attr("data-req") == "password") {
      if ($(this).val() != $("input[type=\"password\"].main", form).val()) {
        $(this).addClass("failed");
        if (ok) {
          $('html, body').animate({
            scrollTop: $(this).offset().top-100
          }, 250);
        }
        ok = false;
      }
    }
  });
  if (!ok) {e.preventDefault();}
});

$("input[data-req], textarea[data-req]").click(function(){
  if ($(this).hasClass("failed")) {
    $(this).removeClass("failed");
  }
});

$("form").on("reset",function(){
  $.each($(".input-select:not(.checkboxes):not(.links)", $(this)), function(){
    $("li", $(this)).removeClass("show");
    var text = $("li[data-clear]", $(this)).attr("data-text");
    var value = $("li[data-clear]", $(this)).attr("data-value");
    $("li[data-clear]", $(this)).addClass("show");
    $("input", $(this)).val(value);
    $(".item-active", $(this)).text(text);
  });
  $.each($(".input-select.checkboxes", $(this)), function(){
    $(".item-active", $(this)).text($(this).attr("data-default"));
  });
});


if (typeof ymaps != "undefined" && ymaps != null) {
  ymaps.ready(init);
  function init(){
    myMap = new ymaps.Map("map", {
      center: [mapData.x+0.0015, mapData.y],
      zoom: 16,
      controls: []
    });
    var zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: "small"
      }
    });
    myMap.controls.add(zoomControl);

    var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="map-ballon">' +
      '$[[options.contentLayout]]' +
      '</div>', {

      build: function () {
        this.constructor.superclass.build.call(this);
        this._$element = $('.map-ballon', this.getParentElement());
        this.applyElementOffset();
        this._$element.find('.close').on('click', $.proxy(this.onCloseClick, this));
        setTimeout(function(){
          $('.map-ballon.animate').removeClass("animate");
        },1);
      },

      clear: function () {
        this._$element.find('.close').off('click');
        this.constructor.superclass.clear.call(this);
      },

      onSublayoutSizeChange: function () {
        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
        if(!this._isElement(this._$element)) {
          return;
        }
        this.applyElementOffset();
        this.events.fire('shapechange');
      },
      applyElementOffset: function () {
        this._$element.css({
          left: -52,
          top: -this._$element[0].offsetHeight - 50
        });
      },
      onCloseClick: function (e) {
        e.preventDefault();
        $('.map-ballon:not(.animate)').addClass("animate");
        var te = this.events;
        setTimeout(function(){
          te.fire('userclose');
        },340);
      },
      getShape: function () {
        if(!this._isElement(this._$element)) {
          return MyBalloonLayout.superclass.getShape.call(this);
        }

        var position = this._$element.position();

        return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
          [position.left, position.top], [
            position.left + this._$element[0].offsetWidth,
            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
          ]
        ]));
      },
      _isElement: function (element) {
        return element && element[0] && element.find('.arrow')[0];
      }
    });

    var MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
      '<h2>$[properties.title]</h2>' +
      '<table><td><div><b>Время работы кассы:</b></div>$[properties.time]</td><td><div><b>Телефон:</b></div>$[properties.phone]</td></table>'
    );

    var placemark = new ymaps.Placemark([mapData.x, mapData.y], {
        title: mapData.title,
        phone: mapData.phone,
        time: mapData.time
    }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: '/includes/img/icons/30.svg',
        iconImageSize: [10, 10],
        iconImageOffset: [0, 0],
        iconContentOffset: [0, 0],
        balloonShadow: false,
        balloonLayout: MyBalloonLayout,
        balloonContentLayout: MyBalloonContentLayout,
        balloonPanelMaxMapArea: 0,
        hideIconOnBalloonOpen: false,
        balloonOffset: [-63, 12]
    });
    myMap.geoObjects.add(placemark);
    placemark.balloon.open();
    myMap.behaviors.disable('scrollZoom');
  }
}

if ($(".media-item").length > 0) {
  $('[data-fancybox]', $(this)).fancybox({
      // Options will go here
    });
}

$(".media-item").click(function(e){
  e.preventDefault();
  $("+ .gallery a", $(this))[0].click();
});

if ($(".simple-slider").length > 0) {
  $.each($(".simple-slider"), function(){
    $(this).slick({
      infinite: false,
      focusOnSelect: true,
      swipe: false,
      responsive: [
        {
          breakpoint: 1325,
          settings: {
            swipe: true
          }
        }
      ]
    });
  });
}

if ($(".main-slider-dots > .wrap-dots").length > 0) {
  $.each($(".main-slider-dots > .wrap-dots"), function(){
    $(this).slick({
      infinite: false,
      focusOnSelect: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      speed: 1010,
      waitForAnimate: true
    });
  });
}

$(".item-gallery .prevs .img").click(function(){
  var src = $(this).attr("data-src");
  var image = $(".big img", $(this).closest(".item-gallery"));
    if (image.attr("src") != src) {
    image.fadeOut(150, function(){
      image.attr("src", src);
      image.fadeIn(150);
    }); 
  }
  $(".img", $(this).closest(".item-gallery")).removeClass("active");
  $(this).addClass("active");
});

$(".counter .plus").click(function(){
  var c = $(this).closest(".counter");
  var val = parseInt(c.attr("data-value"))+1;
  c.attr("data-value", val);
  $(".value", c).text(val);
});

$(".counter .minus").click(function(){
  var c = $(this).closest(".counter");
  var val = parseInt(c.attr("data-value"))-1;
  if (val < 1) {val = 1;}
  c.attr("data-value", val);
  $(".value", c).text(val);
});




$(".code .arrow").click(function(){
  console.log("CHECK");
});

$(".code .clear").click(function(){
  var p = $(this).closest(".code");
  p.removeClass("true");
  p.removeClass("false");
  $("input", p).val("");
});

$.each($("*[data-reminder]"), function(){
  var countDownDate = new Date($(this).attr("data-reminder")).getTime();
  var el = $(this);

  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    if (days < 10) { days = "0"+days; }
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours < 10) { hours = "0"+hours; }
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes < 10) { minutes = "0"+minutes; }
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (seconds < 10) { seconds = "0"+seconds; }
    $(".countdown span[data-timer=\"0\"] > div", el).text(days);
    $(".countdown span[data-timer=\"1\"] > div", el).text(hours);
    $(".countdown span[data-timer=\"2\"] > div", el).text(minutes);
    $(".countdown span[data-timer=\"3\"] > div", el).text(seconds);
    if (distance < 0) {
      clearInterval(x);
      $(el).remove();
    }
  }, 1000);
})

$(".reminder .wrap").click(function(){
  if (!$(".reminder").hasClass("active")) {
    $(".reminder").addClass("active");
    $(".main-back").addClass("active");
  }
})
$(".reminder .close").click(function(){
  if (!$(".reminder").hasClass("active")) {
    $(".reminder").addClass("active");
    $(".main-back").addClass("active");
  } else if ($(".reminder").hasClass("active")) {
    $(".main-back").click();
  }
})

function inputSelect () {
  $.each($(".input-select:not(.checkboxes):not(.links)"), function(){
    $("li", $(this)).removeClass("show");
    var text = $("li[data-clear]", $(this)).attr("data-text");
    var value = $("li[data-clear]", $(this)).attr("data-value");
    $("li[data-clear]", $(this)).addClass("show");
    $("input", $(this)).val(value);
    $(".item-active", $(this)).text(text);
  });

  $(".input-select .item-active").click(function(){
    var parent = $(this).closest(".input-select");
    parent.addClass("show");
    $(".main-back").addClass("active");
  });

  $(".input-select ul li").click(function(){
    var value = $(this).attr("data-value");
    var text = $(this).attr("data-text");
    var parent = $(this).closest(".input-select");
    if (!parent.hasClass("checkboxes")) {
      $(".main-back").removeClass("active");
      $(".input-select").removeClass("show");
      $("li", parent).removeClass("show");
      $(this).addClass("show");
      $("input", parent).val(value);
      $("input", parent).change();
      $(".item-active", parent).text(text);
    } else {
      var count = 0;
      $.each($("input[type=\"checkbox\"]", parent), function(){
        if ($(this).prop("checked")) {
          count += 1;
        }
      });
      if (count == 0) {
        $(".item-active", parent).text(parent.attr("data-default"));
      } else {
        $(".item-active", parent).text(parent.attr("data-checked")+count);
      }
    }
  });
}

inputSelect();