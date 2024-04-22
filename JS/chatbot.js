
function generateBotResponse(userMessage) {

  var responseText = null;
  var postData = {
    userMsg: userMessage
  };
    
  $.ajax({
    type: "POST",
    url: "http://localhost/login/Mental%20Health%20Management%20System/php/chatbot.php",
    data: postData,
    async: false,
    success: function(response) { 
      var responseText1 = JSON.parse(response);  
      responseText = '1. '+responseText1[0] + '\n';

      if (Array.isArray(responseText1)) {
        // It's an array, handle it accordingly
        for (var i = 1; i < responseText1.length; i++) {
          responseText += i+1 +'. '+responseText1[i] + '\n';
        }
      } else {
        responseText = JSON.parse(response);
      }
    },
    error: function(xhr, status, error) {
      console.error(xhr.responseText);
    }
  }); 

  var botResponse = responseText;
  return botResponse;
  
}

