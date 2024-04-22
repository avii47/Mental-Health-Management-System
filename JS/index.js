//tooltip script
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl, {
    customClass: "custom-tooltip",
  });
});

/*--------------------------------services script--------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".navbar-nav .nav-item");

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top <= windowHeight &&
      rect.bottom >= 200 &&
      rect.left <= windowWidth &&
      rect.right >= 0
    );
  }

  function activateNavItem(id) {
    navItems.forEach((navItem) => {
      const link = navItem.querySelector(".nav-link");
      if (link.getAttribute("href") === `#${id}`) {
        navItem.classList.add("active");
      } else {
        navItem.classList.remove("active");
      }
    });
  }

  function handleScroll() {
    let found = false;

    sections.forEach((section) => {
      if (!found && isElementInViewport(section)) {
        activateNavItem(section.id);
        found = true;
      }
    });
  }
  // Initial activation based on the current scroll position
  handleScroll();
  // Listen for the scroll event
  window.addEventListener("scroll", handleScroll);
});

// ============= SCROLLING ANIMATIONS =================
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", revealOnScroll);
});

function revealOnScroll() {
  var sections = document.querySelectorAll(".block");

  sections.forEach(function (section) {
    var sectionTop = section.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;

    if (sectionTop < windowHeight / 1.3) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }
  });
}

$(document).on("click", "#learnMore-S1", function () {
  const service = document.querySelector(".service-p1");
  service.textContent =
    "Welcome to our Brainstorm platform, where your well-being is our priority. Our platform employs cutting-edge AI-based algorithms to provide you with valuable insights into your mental health. By analyzing various aspects of your digital interactions, such as social media engagement and communication patterns, our algorithms can help identify potential indicators of mental health concerns. It's important to remember that our assessments are designed to complement professional advice and not replace it. Consider this tool as a supportive companion on your journey to self-awareness and emotional wellness. The integration of AI technology into our application reflects our commitment to offering you a proactive and personalized approach to mental health monitoring. Your mental well-being matters, and our AI algorithms are here to empower you on your path to a healthier and happier you.";
});

$(document).on("click", "#learnMore-S2", function () {
  const service = document.querySelector(".service-p2");
  service.textContent =
    "In our Brainstorm platform, the power to initiate a transformative journey towards mental well-being is in your hands. Anytime, anywhere, you can seamlessly begin a therapy session series with a carefully selected and qualified therapist of your choice. Our platform prioritizes accessibility, allowing you to connect with a diverse range of experienced professionals who specialize in various therapeutic approaches. Whether you're seeking support for stress, anxiety, depression, or any other mental health concern, our user-friendly interface facilitates a smooth and confidential experience.";
});

$(document).on("click", "#learnMore-S3", function () {
  const service = document.querySelector(".service-p3");
  service.textContent =
    "Brainstorm is at the forefront of mental health care, providing an unparalleled experience through comprehensive progress tracking. We recognize that the road to mental well-being is a dynamic journey, and our innovative system allows us to assess your progress on a daily, weekly, monthly, and yearly basis. By harnessing advanced analytics, we gain valuable insights into your evolving needs and milestones achieved. This detailed tracking doesn't just serve as a retrospective evaluation; it acts as a compass, guiding our experienced therapists to tailor their interventions precisely to your current state.";
});

$(document).on("click", "#learnMore-S4", function () {
  const service = document.querySelector(".service-p4");
  service.textContent =
    "In addition to our human therapists, Brainstorm boasts an intelligent AI companion designed to engage with patients in real-time. This innovative feature allows users to ask questions, seek information, and receive personalized suggestions, creating a dynamic and responsive support system available 24/7. Our AI is equipped with a vast knowledge base, ensuring it can address a wide array of concerns related to mental health, therapy techniques, and general well-being. By integrating this AI-driven chat functionality, we aim to enhance accessibility and offer an immediate, insightful response to users' queries, providing continuous support even between scheduled therapy sessions. This collaborative approach, combining human expertise with artificial intelligence, exemplifies our commitment to leveraging cutting-edge technology for the holistic well-being of our users.";
});

$(document).on("click", "#learnMore-S5", function () {
  const service = document.querySelector(".service-p5");
  service.textContent =
    "Brainstorm is designed as a comprehensive suite to cater to the diverse needs of every human category. Whether you're seeking support for stress management, anxiety, depression, or specific life challenges, our tailored services ensure that individuals from all walks of life find relevant and effective assistance. Our expansive network of therapists, coupled with an AI-driven chat interface, accommodates various preferences for seeking help. We recognize the unique experiences and requirements of different demographics, ensuring inclusivity in our approach.";
});

$(document).on("click", "#learnMore-S6", function () {
  const service = document.querySelector(".service-p6");
  service.textContent =
    "Brainstorm empowers users with a comprehensive mental health report detailing the disorders they may be experiencing. Through advanced assessments and thoughtful analysis, our system generates a detailed description of identified disorders. This report serves as a valuable resource, offering users a clear understanding of their mental health landscape. To ensure accuracy and reliability, the generated report can be submitted for review and approval by qualified mental health professionals. Our platform values the expertise of licensed doctors, and their approval further enhances the credibility of the diagnostic information.";
});

/*--------------------------------------login window popup start----------------------------------------*/
$(document).ready(function () {
  var popupButton1 = $("#popup-button-login");
  var popupContainer1 = $("#popup-container-login");
  var opoupContent1 = $("#popup-content-login");
  var closeButton1 = $("#login-close-button");

  popupButton1.on("click", openPopup);
  closeButton1.on("click", closePopup);
  popupContainer1.on("click", outsideClick);

  function openPopup() {
    popupContainer1.css("display", "block");

    const patient = document.getElementById("radio-patient");
    const doctor = document.getElementById("radio-doctor");

    $("#login-form").submit(function (event) {
      event.preventDefault();
      var formData = $(this).serialize();

      $.ajax({
        type: "POST",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/login.php",
        data: formData,
        success: function (response) {
          var response = JSON.parse(response);
          if (response == "Invalid") {
            alert("Invalid username or password");
          } else {
            data = JSON.parse(response);
            if (patient.checked === true) {
              localStorage.setItem("myData", data);
              window.location.href = "patient.html";
            } else if (doctor.checked === true) {
              localStorage.setItem("docId", data);
              window.location.href = "doctor.html";
            }
          }
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    });

    /*----------------------------------sign-in window popup start--------------------------------------*/
    var popupButton2 = $("#popup-button-sign");
    var popupContainer2 = $("#popup-container-sign");
    var backButton = $("#back-button");
    var closeButton2 = $("#signin-close-button");

    popupButton2.on("click", openPopup);
    backButton.on("click", backToLogin);
    popupContainer2.on("click", outsideClick);
    closeButton2.on("click", closePopup);

    function openPopup() {
      popupContainer1.css("display", "none");
      popupContainer2.css("display", "block");

      $(function () {
        $(".datepicker").datepicker();
      });

      var uname = document.getElementById("un");
      var pword = document.getElementById("pw");
      var con1 = document.getElementById("contactno1");
      var email = document.getElementById("email");
      var name1 = document.getElementById("name1");
      var name2 = document.getElementById("name2");
      var dob = document.getElementById("dob");
      var age = document.getElementById("age");
      var gender = document.getElementById("cmbgender");
      var checkbox = document.getElementById("gridCheck");

      const nextForm2 = document.getElementById("next-form2");
      const backForm1 = document.getElementById("back-form1");
      const backForm2 = document.getElementById("back-form2");
      const form1 = document.getElementById("form-1");
      const form2 = document.getElementById("form-2");
      const form3 = document.getElementById("form-3");
      const sendCodeBtn = document.getElementById("sendCode-btn");
      const nextForm3 = document.getElementById("next-form3");
      const finalSubmit = document.getElementById("final-submit");
      const successForm = document.getElementById("form-success");
      const loginBtn2 = document.getElementById("login-btn2");

      const email2 = document.getElementById("RSemail");
      const pword2 = document.getElementById("pw2");

      //form1 to form2
      nextForm2.addEventListener("click", function (event) {
        var invalidFeedback = document.getElementsByClassName("invalid-feedback-form1");
        var f1Input = document.getElementsByClassName("f1-inp");
        var validateCount = 0;
        var emptyCount = 0;

        for (var i = 0; i < invalidFeedback.length; i++) {
          var element = invalidFeedback[i];

          var computedStyle = window.getComputedStyle(element);

          if (computedStyle.display === "none") {
            validateCount++;
          }
        }

        for (var i = 0; i < f1Input.length; i++) {
          var element = f1Input[i];

          if (element.value == "") {
            emptyCount++;
          }
        }

        if (validateCount == 6 && emptyCount == 0) {
          $("#form-2").addClass("next-form-anime");
          form2.style.display = "block";
          form1.style.display = "none";
        }
      });

      //form2 to form1
      backForm1.addEventListener("click", function (event) {
        $("#form-2").addClass("back-form-anime");
        setTimeout(() => {
          form1.style.display = "block";
          form2.style.display = "none";
          $("#form-2").removeClass("back-form-anime");
        }, 450);
      });

      //form2 to form3
      nextForm3.addEventListener("click", function (event) {
        const otp = document.getElementById("otp");

        verifyOTP(function (data) {
          if (data == "Valid") {
            otp.classList.remove("is-invalid");
            $("#form-3").addClass("next-form-anime");
            form2.style.display = "none";
            form3.style.display = "block";
          } else if (data == "Invalid") {
            otp.classList.add("is-invalid");
          }
        });
      });

      //form3 to form2
      backForm2.addEventListener("click", function (event) {
        $("#form-2").removeClass("next-form-anime");
        $("#form-3").addClass("back-form-anime");
        setTimeout(() => {
          form2.style.display = "block";
          form3.style.display = "none";
          $("#form-3").removeClass("back-form-anime");
        }, 450);
      });

      //final submition
      finalSubmit.addEventListener("click", function (event) {
        var elements = document.getElementsByClassName("invalid-feedback-form-f");
        var fInput = document.getElementsByClassName("f-inp");
        var check = document.getElementById("gridCheck");
        var validateCount = 0;
        var emptyCount = 0;

        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];

          var computedStyle = window.getComputedStyle(element);

          if (computedStyle.display === "none") {
            validateCount++;
          }
        }

        for (var i = 0; i < fInput.length; i++) {
          var element = fInput[i];

          if (element.value == "") {
            emptyCount++;
          }
        }

        if (emptyCount == 0 && check.checked) { 
          postSignupData();
          form3.style.display = "none";
          successForm.style.display = "block";
        }
      });

      //--------------------------------send the OTP through email--------------------------------
      sendCodeBtn.addEventListener("click", function (event) { 
        var postData = {
          name: document.getElementById("name1").value,
          email: document.getElementById("email").value,
          type: "verifyEmail"
        };

        $.ajax({
          type: "POST",
          url: "http://localhost/login/Mental%20Health%20Management%20System/php/emailVerify.php",
          data: postData,
          success: function (response) { 
            if (response == "success") {
              timer(120);
              document.getElementById("inUse").style.display = "none";
              document.getElementById("otp-code").style.display = "block";
            } else if (response == "used") {
              document.getElementById("inUse").style.display = "block";
            }
          },
          error: function (xhr, status, error) {
            console.error(xhr.responseText);
          },
        });

        let timerOn = true;

        function timer(remaining) {
          var m = Math.floor(remaining / 60);
          var s = remaining % 60;

          m = m < 10 ? "0" + m : m;
          s = s < 10 ? "0" + s : s;
          document.getElementById("timer").innerHTML = m + ":" + s;
          remaining -= 1;

          if (remaining >= 0 && timerOn) {
            setTimeout(function () {
              //start countion 2 minutes
              timer(remaining);
            }, 1000);
            return;
          }

          if (!timerOn) {
            return;
          }

          //kill the verification after 2 minutes
          fetch(
            "http://localhost/login/Mental%20Health%20Management%20System/php/verificationKiller.php"
          )
            .then((response) => response.text())
            .then((data) => {
              alert("your times up");
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });

      //-------------------------------Verify the OTP code---------------------------------
      function verifyOTP(callback) {
        var postData = {
          otp: document.getElementById("otp").value,
          email: document.getElementById("email").value,
          type: "verifyOTP"
        };

        $.ajax({
          type: "GET",
          url: "http://localhost/login/Mental%20Health%20Management%20System/php/emailVerify.php",
          data: postData,
          success: function (response) {
            var data = JSON.parse(response);
            callback(data);
          },
          error: function (xhr, status, error) {
            console.error(xhr.responseText);
          },
        });
      }

      //function to post signup data to php
      function postSignupData() { alert("postSignupData"); 

        const patient = document.getElementById("radio-patient");
        const doctor = document.getElementById("radio-doctor");
        var userRole = null;

        if (patient.checked === true) {
          userRole = "patient";
        } else if (doctor.checked === true) {
          userRole = "doctor"
        }

        var formData = {
          first_name: document.getElementById("name1").value,
          last_name: document.getElementById("name2").value,
          dob: document.getElementById("dob").value,
          gender: document.getElementById("cmbgender").value,
          age: document.getElementById("age").value,
          contact1: document.getElementById("contactno1").value,
          email: document.getElementById("email").value,
          username: document.getElementById("un").value,
          password: document.getElementById("pw").value,
          userRole: userRole,
        };

        

        $.ajax({
          type: "POST",
          url: "http://localhost/login/Mental%20Health%20Management%20System/php/singup.php",
          data: formData,
          success: function (response) { alert(response)
            var data = JSON.parse(response);

            if (data == "success") {
              document.getElementById("form-3").style.display = "none";
              document.getElementById("form-success").style.display = "block";
            } else if (data == "used") {
              document.getElementById("inUse-unpw").style.display = "block";
            }
          },
          error: function (xhr, status, error) {
            console.error(xhr.responseText);
          },
        });
      }

      //popup login window
      loginBtn2.addEventListener("click", function (event) { 
        popupContainer2.css("display", "none");
        popupContainer1.css("display", "block");
      });

      /*--------------------------------------form validation start----------------------------------------*/
      uname.addEventListener("input", function (event) {
        var text1 = event.target.value;
        validateUN(text1);
      });

      pword.addEventListener("input", function (event) {
        var text2 = event.target.value;
        validatePW(text2);
      });

      pword2.addEventListener("input", function (event) {
        var text2 = event.target.value;
        validatePW2(text2);
      });

      con1.addEventListener("input", function (event) {
        var text3 = event.target.value;
        validateCON1(text3);
      });

      email.addEventListener("input", function (event) {
        var text4 = event.target.value;
        validateEM(text4);
      });

      email2.addEventListener("input", function (event) {
        var text4 = event.target.value;
        validateEM2(text4);
      });

      name1.addEventListener("input", function (event) {
        var text5 = event.target.value;
        validateNM1(text5);
      });

      name2.addEventListener("input", function (event) {
        var text6 = event.target.value;
        validateNM2(text6);
      });

      dob.addEventListener("input", function (event) {
        var text7 = event.target.value;
        validatedob(text7);
      });

      age.addEventListener("input", function (event) {
        var text8 = event.target.value;
        validateage(text8);
      });

      gender.addEventListener("change", function () {
        var text9 = gender.value;
        validategender(text9);
      });

      function validateUN(text1) {
        if (text1.length > 20 || text1.length < 2) {
          uname.classList.add("is-invalid");
          uname.classList.remove("is-valid");
        } else {
          uname.classList.remove("is-invalid");
          uname.classList.add("is-valid");
        }
      }

      function validatePW(text2) {
        var containsNumber = /\d/.test(text2);
        if (text2.length < 5 || !containsNumber) {
          pword.classList.add("is-invalid");
          pword.classList.remove("is-valid");
        } else {
          pword.classList.remove("is-invalid");
          pword.classList.add("is-valid");
        }
      }

      function validatePW2(text2) {
        var containsNumber = /\d/.test(text2);
        if (text2.length < 5 || !containsNumber) {
          pword2.classList.add("is-invalid");
          pword2.classList.remove("is-valid");
        } else {
          pword2.classList.remove("is-invalid");
          pword2.classList.add("is-valid");
        }
      }

      function validateCON1(text3) {
        var pattern = /^\d{10}$/;
        if (!pattern.test(text3)) {
          con1.classList.add("is-invalid");
          con1.classList.remove("is-valid");
        } else {
          con1.classList.remove("is-invalid");
          con1.classList.add("is-valid");
        }
      }

      function validateEM(text4) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(text4)) {
          email.classList.add("is-invalid");
          email.classList.remove("is-valid");
        } else {
          email.classList.remove("is-invalid");
          email.classList.add("is-valid");
        }
      }

      function validateEM2(text4) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(text4)) {
          email2.classList.add("is-invalid");
          email2.classList.remove("is-valid");
        } else {
          email2.classList.remove("is-invalid");
          email2.classList.add("is-valid");
        }
      }

      function validateNM1(text5) {
        var pattern = /^[a-zA-Z]+$/;
        if (pattern.test(text5)) {
          name1.classList.remove("is-invalid");
          name1.classList.add("is-valid");
        } else {
          name1.classList.add("is-invalid");
          name1.classList.remove("is-valid");
        }
      }

      function validateNM2(text6) {
        var pattern = /^[a-zA-Z]+$/;
        if (pattern.test(text6)) {
          name2.classList.remove("is-invalid");
          name2.classList.add("is-valid");
        } else {
          name2.classList.add("is-invalid");
          name2.classList.remove("is-valid");
        }
      }

      function validatedob(text7) {
        var pattern = /^(0[1-9]|1[0-2])\/([0-2][0-9]|3[01])\/\d{4}$/;
        if (pattern.test(text7)) {
          dob.classList.remove("is-invalid");
          dob.classList.add("is-valid");
        } else {
          dob.classList.add("is-invalid");
          dob.classList.remove("is-valid");
        }
      }

      function validateage(text8) {
        var age1 = parseInt(text8);
        if (age1 >= 16 && age1 < 120) {
          age.classList.remove("is-invalid");
          age.classList.add("is-valid");
        } else {
          age.classList.add("is-invalid");
          age.classList.remove("is-valid");
        }
      }

      function validategender(text9) {
        if (text9 != "Gender") {
          gender.classList.remove("is-invalid");
          gender.classList.add("is-valid");
        } else {
          gender.classList.add("is-invalid");
          gender.classList.remove("is-valid");
        }
      }

      checkbox.addEventListener("change", function (event) {
        if (event.target.checked) {
          checkbox.classList.add("is-valid");
          checkbox.classList.remove("is-invalid");
        } else {
          checkbox.classList.add("is-invalid");
        }
      });
      /*--------------------------------------form validation end----------------------------------------*/
    }

    function backToLogin() {
      popupContainer2.css("display", "none");
      popupContainer1.css("display", "block");
    }

    function closePopup() {
      $("#popup-content-sign").addClass("fadeOutAnimation");

      setTimeout(() => {
        popupContainer2.css("display", "none");
        $("#popup-content-sign").removeClass("fadeOutAnimation");
      }, 450);
    }

    function outsideClick(event) {
      if ($(event.target).is(popupContainer2)) {
        popupContainer2.css("display", "none");
      }
    }
    /*----------------------------------sign-in window popup end--------------------------------------*/
  }

  //function to forget password
  document.getElementById("forget-PW").onclick = function () {   
    const patient = document.getElementById("radio-patient");
    const doctor = document.getElementById("radio-doctor");
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass");

    if (patient.checked === true) {
      var userRole = 'patient';
    } else if (doctor.checked === true) {
      var userRole = 'doctor';
    }

    var postData = {
      userRole: userRole,
      username: username,
      type: 'checkUN'
    };

    $.ajax({
      type: "POST",
      url: "http://localhost/login/Mental%20Health%20Management%20System/php/forgetPassword.php",
      data: postData,
      success: function (response) {  

        if(response == 'Invalid'){ 
          alert("Enter valid username");
        }
        else{
          const login = document.getElementById("popup-container-login");
          login.style.display = 'none';

          var resetPwContainer = $("#popup-container-resetPW");
          resetPwContainer.css("display", "block");
          localStorage.setItem("useremail", response);
          
          //alert(localStorage.getItem("useremail"));
          endIndex = response.length -9;
          displayHiddenText(response, 2, endIndex);
        }
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      },
    });

    // Function to display text with some characters replaced by asterisks
    function displayHiddenText(text, startIndex, endIndex) {
      // Check if the startIndex and endIndex are valid
      if (startIndex < 0 || endIndex > text.length || startIndex >= endIndex) {
          console.error("Invalid start or end index.");
          return;
      }
      // Replace characters with asterisks
      var hiddenPart = text.substring(startIndex, endIndex).replace(/./g, "*");
      var visiblePart = text.substring(0, startIndex) + hiddenPart + text.substring(endIndex);
      document.getElementById("sysemail").textContent = visiblePart;
    }

    //--------------------------------send the OTP through email--------------------------------
    var sendCodeBtn2 = document.getElementById("sendCode-btn2");
    sendCodeBtn2.addEventListener("click", function (event) {  

      var RSemail = document.getElementById("RSemail").value;
      if(RSemail == localStorage.getItem("useremail")){
        var postData = {
          email: RSemail,
          type: "resetEmail",
          userRole: userRole,
          type: "resetEmail"
        };
  
        $.ajax({
          type: "POST",
          url: "http://localhost/login/Mental%20Health%20Management%20System/php/forgetPassword.php",
          data: postData,
          success: function (response) { 
            if (response == "success") { 
              timer2(120); 
              document.getElementById("otp-code2").style.display = "block";
            } else {
              alert("request failed")
            }
          },
          error: function (xhr, status, error) {
            console.error(xhr.responseText);
          },
        });
  
        let timerOn = true;
  
        function timer2(remaining) {
          var m = Math.floor(remaining / 60);
          var s = remaining % 60;
  
          m = m < 10 ? "0" + m : m;
          s = s < 10 ? "0" + s : s;
          document.getElementById("timer2").innerHTML = m + ":" + s;
          remaining -= 1;
  
          if (remaining >= 0 && timerOn) {
            setTimeout(function () {
              //start countion 2 minutes
              timer2(remaining);
            }, 1000);
            return;
          }
  
          if (!timerOn) {
            return;
          }
  
          //kill the verification after 2 minutes
          fetch(
            "http://localhost/login/Mental%20Health%20Management%20System/php/verificationKiller2.php"
          )
            .then((response) => response.text())
            .then((data) => {
              alert("your times up");
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      }
    });

    //-------------------------------Verify the OTP code---------------------------------
    var verifyOTPBtn = document.getElementById("verifyOTP");
    verifyOTPBtn.addEventListener("click", function (event) {  
      var postData2 = {
        otp: document.getElementById("otp2").value,
        email: document.getElementById("RSemail").value,
        type: "verifyOTP"
      };

      $.ajax({
        type: "GET",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/forgetPassword.php",
        data: postData2,
        success: function (response) {
          if(response == "Valid") {
            document.getElementById("otp-code2").style.display = "none";
            document.getElementById("new-pw").style.display = "block";
          }
          else if(response == "Invalid") {
            document.getElementById("otp2").classList.add("is-invalid");
          }
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    });
    
    //-------------------------------add new password---------------------------------
    var createNewPw = document.getElementById("createNewPw");
    createNewPw.addEventListener("click", function (event) {  
      var postData = {
        password: document.getElementById("pw2").value,
        type: "resetPassword"
      };

      $.ajax({
        type: "POST",
        url: "http://localhost/login/Mental%20Health%20Management%20System/php/forgetPassword.php",
        data: postData,
        success: function (response) { 
          if (response == "success") { 
            alert("Password reset successfully")
            document.getElementById("popup-container-resetPW").style.display = "none";
            openPopup();
          } else {
            alert("request failed")
          }
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
        },
      });
    });
  }

  var popupResetPWContainer = $("#popup-container-resetPW");
  var closeResetPWBtn = $("#close-add-calender-button");

  closeResetPWBtn.on("click", closePopupResetPW);
  popupResetPWContainer.on("click", outsideClickResetPW);

  function closePopupResetPW() {
    popupResetPWContainer.css("display", "none");
  }
  
  function outsideClickResetPW(event) {
    if ($(event.target).is(popupResetPWContainer)) {
      popupResetPWContainer.css("display", "none");
    }
  }

  function closePopup() {
    $("#popup-content-login").addClass("fadeOutAnimation");

    setTimeout(() => {
      popupContainer1.css("display", "none");
      $("#popup-content-login").removeClass("fadeOutAnimation");
    }, 450);
  }

  function outsideClick(event) {
    if ($(event.target).is(popupContainer1)) {
      popupContainer1.css("display", "none");
    }
  }
  /*----------------------------------login window popup end----------------------------------------*/
});
