function openLogin() {
    document.getElementById("login-page-main").style.display = 'block';
    closeSignup()
    document.getElementById("overlay").style.display = "block";
    
}

function closeLogin(){
    document.getElementById("login-page-main").style.display = 'none';
    document.getElementById("overlay").style.display = "none";
}
function openSignup() {
    document.getElementById("signup-page-main").style.display = 'block';
    closeLogin()
    document.getElementById("overlay").style.display = "block";
    
}

function closeSignup(){
    document.getElementById("signup-page-main").style.display = 'none';
    document.getElementById("overlay").style.display = "none";
}

// changing text
    var i=1;
    var msg1="Hungry?";
    var msg2="Unexpected guests?";
    var msg3="Cooking gone wrong?";
    var msg4="Movie marathon?";
    var msg5="Game night?";
    var msg6="Late night at office?";
   
    function showText(){
        var msgNo="msg"+i;
        msgNo=eval(msgNo);
        var tgtLabel=document.getElementById("word");
        tgtLabel.innerHTML=msgNo;
        i=i+1;
        if(i==7){
        i=1;
        }
    }
   
    // validation
    window.onload=function(){
                    window.setInterval(showText,3000);
                };


function validateForm(textbox) {

    if (textbox.value === '') {
        textbox.setCustomValidity
                ('Enter your delivery location');
    } else if (textbox.validity.typeMismatch) {
        textbox.setCustomValidity
                ('Please enter an email address which is valid!');
    } else {
        textbox.setCustomValidity('');
    }

    return true;
}

function openHome() {
    

}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})()
