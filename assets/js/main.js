$(document).ready(function(){
    var scrollTop =0;
    $(window).scroll(function(){
        scrollTop = $(window).scrollTop();
        $('.header').toggleClass('scrolled', scrollTop > 30);
        if (scrollTop > 100){
            $('.navbar').addClass ('scrollNavbar');
			$('.backTop').addClass ('visible');
			
        }else if (scrollTop < 100){
            $('.navbar').removeClass('scrollNavbar');
			$('.backTop').removeClass ('visible');
        };
    });
	$('.backTop').click (function(){
		$('body , html').animate({
			scrollTop:0
		},800);
	});
});
document.addEventListener("DOMContentLoaded", function () {
  const togglerBtn = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.getElementById("navbarsExampleXxl");

  if (togglerBtn && navbarCollapse) {
    // التحكم الكامل بالفتح والإغلاق عند الضغط على زر الهمبرغر
    togglerBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      navbarCollapse.classList.toggle("show");
    });

    // إغلاق القائمة فوراً عند النقر على أي رابط بداخلها
    const navLinks = navbarCollapse.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navbarCollapse.classList.remove("show");
      });
    });

    // إغلاق القائمة عند النقر في أي مكان خارجها بالصفحة
    document.addEventListener("click", function (e) {
      if (!navbarCollapse.contains(e.target) && !togglerBtn.contains(e.target)) {
        navbarCollapse.classList.remove("show");
      }
    });
  }
});
const searchBtn = document.getElementById('searchTriggerBtn');
const searchInput = document.getElementById('searchInputField');

searchBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  searchInput.classList.toggle('active');
  if (searchInput.classList.contains('active')) {
    searchInput.focus();
  }
});

document.addEventListener('click', function(e) {
  if (!e.target.closest('.search-container')) {
    searchInput.classList.remove('active');
  }
});


$('.owl-carousel').owlCarousel({
    loop: true,
        margin: 15,
        nav: false,       /* Hides next/prev arrows */
        dots: true,      /* Enables pagination dots */
        dotsEach: true,  /* Ensures a dot is generated for every slide/page */
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 2
          },
          1024: {
            items: 3
          }
        }
      });
    

  const dropdown = document.getElementById('myDropdown');
  
  dropdown.addEventListener('change', function(event) {
    const selectedValue = event.target.value;
    console.log('User selected:', selectedValue);
  });
$(document).ready(function(){
    var scrollTop =0;
    $(window).scroll(function(){
        scrollTop = $(window).scrollTop();
        if (scrollTop > 100){
            $('.navbar').addClass ('scrollNavbar');
			$('.backTop').addClass ('visible');
			
        }else if (scrollTop < 100){
            $('.navbar').removeClass('scrollNavbar');
			$('.backTop').removeClass ('visible');
        };
    });
	$('.backTop').click (function(){
		$('body , html').animate({
			scrollTop:0
		},800);
	});
});