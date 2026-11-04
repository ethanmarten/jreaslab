$(document).ready(function () {
  var projectsOwl = $('.projects-carousel').owlCarousel({
    loop: true,
    margin: 20,
    nav: false,         // إلغاء الأسهم الافتراضية لاعتماد الأزرار المخصصة
    dots: false,        // إيقاف النقاط
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1        // عرض بطاقة واحدة في الشاشات الصغيرة
      },
      768: {
        items: 2        // عرض بطاقتين في التابلت
      },
      1200: {
        items: 3        // عرض 3 بطاقات في الشاشات الكبيرة
      }
    }
  });

  // تفعيل زر التالي (Next)
  $('.custom-next-btn').click(function () {
    projectsOwl.trigger('next.owl.carousel');
  });

  // تفعيل زر السابق (Prev)
  $('.custom-prev-btn').click(function () {
    projectsOwl.trigger('prev.owl.carousel');
  });
});

$(document).ready(function(){
    var scrollTop = 0;
    
    $(window).scroll(function(){
        scrollTop = $(window).scrollTop();
        
        // تأثير الهيدر العام عند التمرير أكثر من 30 بكسل
        $('.header').toggleClass('scrolled', scrollTop > 30);

        // إضافة أو إزالة كلاس scrollNavbar وزر العودة للأعلى عند التمرير أكثر من 100 بكسل
        if (scrollTop > 100) {
            $('.navbar').addClass('scrollNavbar');
            $('.backTop').addClass('visible');
        } else {
            $('.navbar').removeClass('scrollNavbar');
            $('.backTop').removeClass('visible');
        }
    });

    // حركة العودة للأعلى عند الضغط على الزر
    $('.backTop').click(function(){
        $('body, html').animate({
            scrollTop: 0
        }, 800);
    });
});