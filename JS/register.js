$(document).ready(function(){

    // let $registerForm = $("#register_form");

    // if($registerForm.length){
    //     $registerForm.validate({
    //         rules:{
    //             fname:{
    //                 required: true
    //             },
    //             lname:{
    //                 required: true
    //             },
    //             email:{
    //                 required: true,
    //                 email: true
    //             },
    //             password:{
    //                 required:true
    //             }
    //         },
    //         messages:{
    //             fname:{
    //                 required: 'First Name is required'
    //             },
    //             lname:{
    //                 required: 'Last Name is required'
    //             },
    //             email:{
    //                 required: 'Enter email address!',
    //                 email:  'Please enter valid email!'
    //             },
    //             password:{
    //                 required: 'Enter password!'
    //             }
    //         },
    //         errorPlacement: function(error, element){
    //             if(element.is(":input")){
    //                 error.appendTo("#register_error_container");
    //                 $("#register_error_container").css({
    //                     display: "block"
    //                 });
    //                 error.css({
    //                     display: "block",
    //                     textAlign: "center",
    //                     color:"red",
    //                     margin: "3px 0"
    //                 })
    //             }
    //         }
    //     })
    // }
    // let newUser = {
    //     first_name: $('#first_name_register').val(),
    //     last_name: $('#last_name_register').val(),
    //     email: $('#email_register').val(),
    //     password: $('#password_register').val()
    // }
  


    let fname_register = $("#first_name_register");
    let phone_register = $("#phone_register");
    let email_register = $("#email_register");
    let password_register = $("#password_register");
    let email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


    function registerFormValidation(){
        // verification for registration first name
    
        if(fname_register.val().trim() == '' || fname_register.val() == null){
            $('#register_error_container').css({
                display: 'block'
            })
            $('#fname_err').text('First name is required');
        }else{
            $('#register_error_container').css({
                display: 'none'
            })
            $('#fname_err').text('');
        }
    
        // verification for registration phone number
        if(phone_register.val().trim() == '' || phone_register.val() == null){
            $('#register_error_container').css({
                display: 'block'
            })
            $('#phone_err').text('phone number is required');
        }else if(phone_register.val().trim().length < 5 || phone_register.val().trim().length > 11){
            $('#register_error_container').css({
                display:'block'
            })
            $('#phone_err').text('min of 5 and max 0f 11 characters required')
        }else{
            $('#register_error_container').css({
                display: 'none'
            })
            $('#phone_err').text('');
        }
    
        // verification for registration email
        if(email_regex.test(email_register.val())){
            $('#register_error_container').css({
                display: 'none'
            })
            $('#email_err').text('');
        }else{
            $('#register_error_container').css({
                display: 'block'
            })
            $('#email_err').text("Invalid email"); 
        }
        
        // verification for registration password
        if(password_register.val().trim() == '' || password_register.val() == null){
            $('#register_error_container').css({
                display:'block'
            })
            $('#password_err').text('Password can\'t be blank.');
            return false;
        }else if(password_register.val().trim().length < 8){
            $('#register_error_container').css({
                display:'block'
            })
            $('#password_err').text('min of 8 characters required');
            return false;
        }else{
            $('#register_error_container').css({
                display:'none'
            })
            $('#password_err').text('');
        }    
        if(!fname_register.val().trim() == "" && !phone_register.val().trim() == "" && !email_register.val().trim() == "" && !password_register.val().trim() == ""){

            let newUser = {
                name: $('#first_name_register').val(),
                phone: parseInt($('#phone_register').val()),
                email: $('#email_register').val(),
                password: $('#password_register').val()
            }
        
            $.ajax({
                method: "POST",
                url: "http://159.65.21.42:9000/register",
                headers: { "content-type": "application/json"},
                data: JSON.stringify(newUser),
                success: function (data){
                    alert("account created");
                    console.log(data);
                    window.location.reload()
                },
                error: function(err){
                    console.log(err);
                }
            })
        }

    }
    
    $(register_btn).click(function(){
        registerFormValidation();
    })


})










































// }

