

function check_empty() {
if (document.getElementById('name').value == "") {
  alert("Please fill in your name");
} else if (document.getElementById('email').value == "") {
  alert("Please enter your email address so we can get back to you!");
} else if (document.getElementById('msg').value == "") {
  alert("Please enter a message");
} else {

$.ajax({
  type: "POST",
  "url": "https://mandrillapp.com/api/1.0/messages/send.json",
  //"url": "http://54.191.105.221:8021/email",
  "data": {
    "key": "a50Zdr579Pu7R54pLmsypw",
    "message": {
      "from_email": $('#email').val(),
	  "from_name" : $('#name').val(),
      "to": [
          {
            "email": "cedric.lam@mtmtech.com.tw",
            "name": "Cedric Lam",
            "type": "to"
          },
          {
            "email": "yh.sun@mtmtech.com.tw",
            "name": "YH Sun",
            "type": "to"
          },
          {
            "email": "angus.su@mtmtech.com.tw",
            "name": "Angus Su",
            "type": "to"
          },
          {
            "email": "victor.yao@mtmtech.com.tw",
            "name": "Victor Yao",
            "type": "to"
          }		  
        ],
      "subject": "MtM web site enquiry",
      "html": $('#msg').val()
    }
  },

}).done(function(response) {

   //alert(response.status); // if you're into that sorta thing
 });;

  //data: JSON.stringify(jsondata) });
alert("Thank you for reaching out!  We'll be in touch!");
div_hide();
}
}

//Function To Display Popup
function div_show(subject) {
document.getElementById('query-form-wrapper').style.display = "block";
}
//Function to Hide Popup
function div_hide(){
document.getElementById('query-form-wrapper').style.display = "none";
}