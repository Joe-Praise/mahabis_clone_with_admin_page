$(document).ready(function(){

    /* button type:submit using jquery validation */

/*    var $registerForm = $("#register_form");
    if($registerForm.length){
        $registerForm.validate({
            rules:{
                fname:{
                    required: true
                },
                phone_number:{
                    required: true
                },
                email:{
                    required: true,
                    email: true
                },
                password:{
                    required:true
                }
            },
            messages:{
                fname:{
                    required: 'First name is required'
                },
                phone_number:{
                    required: 'Phone number is required'
                },
                email:{
                    required: 'Enter email address!',
                    email:  'Please enter valid email!'
                },
                password:{
                    required: 'Enter password!'
                }
            },
            errorPlacement: function(error, element){
                if(element.is(":input")){
                    error.appendTo("#register_error_container");
                    $("#register_error_container").css({
                        display: "block"
                    });
                    error.css({
                        display: "block",
                        textAlign: "center",
                        color:"red",
                        margin: "3px 0"
                    })
                }
            }
        })
    }
*/ 
    
    

    const name = document.getElementById("name_register");
    const phone_number = document.getElementById("phone_number_register");
    const email = document.getElementById("email_register");
    const password = document.getElementById("password_register")
    const form = document.getElementById("register_form");
    const name_err_display = document.getElementById("register_firstname_error")
    const phone_err_display = document.getElementById('register_phone_error')
    const email_err_display = document.getElementById("register_email_error");
    const pass_err_display = document.getElementById("register_password_error");
    const err_container = document.getElementById("register_error_container");
    const email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const submit = document.getElementById("register_btn");



    submit.addEventListener('click', function(e){

        const name_err = []
        const phone_err = []
        const email_err= []
        const pass_err = []
        
        // name vlaidation
        if(name.value.trim() == '' || name.value == null){
            name_err.push("Name can't be blank")
        }else if(name.value.length >=22){
            name_err.push("max of 22 characters required");
        }

        // phone number validation
        if(phone_number.value.trim() == '' || phone_number.value == null){
            phone_err.push("Phone number can't be blank");
        }else if(phone_number.value.length >=11){
            phone_err.push("max of 11 characters required");
        }

        // email validation
        if(email_regex.test(email.value)){
            err_container.style.display = "none";
        }else if(email.value.trim == '' || email.value == null){
            email_err.push("Email can't be blank");
        }else{
            email_err.push("Enter valid email");
        }

        // password validation
        if(password.value.length == '' || password.value == null){
            pass_err.push("Password can't be blank")
        }


        // display err message section

        if(name_err.length > 0){
            e.preventDefault();
            err_container.style.display = "block";
            name_err_display.innerText = name_err;
        }else{
            name_err_display.innerText = '';
        }

        if(phone_err.length > 0){
            e.preventDefault();
            err_container.style.display = "block";
            phone_err_display.innerText = phone_err;
        }else{
            phone_err_display.innerText = '';
        }

        if(email_err.length > 0){
            e.preventDefault();
            err_container.style.display = "block";
            email_err_display.innerText = email_err;
        }else{
            email_err_display.innerText = '';
        }

        if(pass_err.length > 0){
            e.preventDefault();
            err_container.style.display = "block";
            pass_err_display.innerText = pass_err;
        }else{
            pass_err_display.innerText = '';
        }
        
        // if none of the error messages are displayed, the account should be created
        if(name_err.length == 0 && phone_err.length == 0 && email_err.length == 0 && pass_err.length == 0){
            err_container.style.display = "none";
            let newUser = {
                name: name.value,
                phone: parseInt(phone_number.value),
                email: email.value,
                password: password.value
            }
            console.log(newUser)
    
            $.ajax({
                method: "POST",
                url: "http://159.65.21.42:9000/register",
                headers: { "content-type": "application/json" },
                data: JSON.stringify(newUser),
                success: function(data){
                    alert("account created");
                    console.log(data);
                    window.location.reload()
                },
                error: function(err){
                    console.log(err);
                } 
            })
        }
   
    })


})