(function ($) {
  "use strict";

  var speechActive = false;
  var utterance;

  function speakText(text) {
      utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      window.speechSynthesis.speak(utterance);
      speechActive = true;
  }

  function stopSpeech() {
      window.speechSynthesis.cancel();
      speechActive = false;
  }

  function readAllVisibleContent() {
      var allVisibleContent = $("body").text();
      speakText(allVisibleContent);
  }

  function handleVisionButtonClick() {
      if (speechActive) {
          stopSpeech();
      } else {
          readAllVisibleContent();
      }
  }

  $('.button-section .btn:contains("Vision")').click(function() {
      handleVisionButtonClick();
  });

  $('.navbar-nav .nav-link').click(function(){
      $(".navbar-collapse").collapse('hide');
  });

  $('.reviews-carousel').owlCarousel({
      center: true,
      loop: true,
      nav: true,
      dots: false,
      autoplay: true,
      autoplaySpeed: 300,
      smartSpeed: 500,
      responsive:{
          0:{
              items:1,
          },
          768:{
              items:2,
              margin: 100,
          },
          1280:{
              items:2,
              margin: 100,
          }
      }
  });

  var myCarousel = document.querySelector('#myCarousel');
  var carousel = new bootstrap.Carousel(myCarousel, {
      interval: 1500,
  });

  function ReviewsNavResize(){
      $(".navbar").scrollspy({ offset: -94 });
      var ReviewsOwlItem = $('.reviews-carousel .owl-item').width();
      $('.reviews-carousel .owl-nav').css({'width' : (ReviewsOwlItem) + 'px'});
  }

  $(window).on("resize", ReviewsNavResize);
  $(document).on("ready", ReviewsNavResize);

  $('a[href*="#"]').click(function (event) {
      if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
              event.preventDefault();
              $('html, body').animate({
                  scrollTop: target.offset().top - 74
              }, 1000);
          }
      }
  });

  $('.navbar-nav .volunteer-link').click(function (event) {
      event.preventDefault();
      var target = $('#Volunteer');
      if (target.length) {
          $('html, body').animate({
              scrollTop: target.offset().top - 74
          }, 1000);
      }
  });

  $('#volunteer form').submit(function(event) {
     
       event.preventDefault();
      
      $.ajax({
          type: "POST",
          url: $(this).attr('action'),
          data: $(this).serialize(),
          success: function(response) {
              alert('Thank you for your registration!');
          },
          error: function(xhr, status, error) {
              alert('Error: ' + error);
          }
      });
  });
  document.getElementById("user-login-form").addEventListener("submit", function(event){
    event.preventDefault();
    var form = event.target;
    var formData = new FormData(form);
    // Simulate form submission process
    setTimeout(function() {
        form.reset();
        alert("Form submitted successfully!");
    }, 1000);
});

 
  
  // SMTPJS Email Sending
  function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("date").value = "";
    document.getElementById("service").selectedIndex = 0;
    document.getElementById("doctor").selectedIndex = 0;
}

// Function to send email using SMTPJS
function sendEmail() {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "afrafathima.m2023ai-ds@sece.ac.in",
        Password: "A13CA9D25ADE157508C136EF89376B716F65",
        To: "mailafra2005@gmail.com",
        From: document.getElementById("email").value,
        Subject: "Appointment Booking",
        Body: "Name: " + document.getElementById("name").value +
            "\nEmail: " + document.getElementById("email").value +
            "\nPhone: " + document.getElementById("phone").value +
            "\nDate: " + document.getElementById("date").value +
            "\nService: " + document.getElementById("service").value +
            "\nDoctor: " + document.getElementById("doctor").value
    }).then(
        message => alert("Appointment booked successfully!")
    );
}
  // Call sendEmail() function when needed
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#blood-donation form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response
            console.log(data);
            alert("Thank you for your blood donation! Your form has been submitted successfully.");
            form.reset(); // Reset the form after submission
        })
        .catch(error => {
            // Handle errors
            console.error("Error:", error);
            alert("There was an error while submitting your form. Please try again later.");
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const bloodDonationLink = document.querySelector("#blood-donation-link");
    const bloodDonationSection = document.querySelector("#blood-donation");

    bloodDonationLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior

        // Scroll to the blood donation section
        bloodDonationSection.scrollIntoView({
            behavior: "smooth"
        });
    });
});


})(window.jQuery);
