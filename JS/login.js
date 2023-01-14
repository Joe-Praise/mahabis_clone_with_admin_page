$(document).ready(function(){
    
    function login(){
        let email = $("#email_login").val();
        let password = $("#password_login").val();
        
        let login_details = {
            email: email,
            password: password
        }

        $.ajax({
            method: "POST",
            url: "http://159.65.21.42:9000/login",
            headers: {"content-type": "application/json"},
            data: JSON.stringify(login_details),
            success: function(data){
                alert(JSON.stringify(data));
                console.log(data)
                window.location.reload();
            },
            error: function(err){
                console.log(err)
            }
        })   
    }
    
    $('#login_btn').click(function(){
        login()
    })
    
    
})





















//    looping through registered users to find a match
// $(data).each((i,ele)=>{
    //     if(email == ele.email && password == ele.password){
        //         // window.location.href = '/'
        //         alert(ele._id, ele.name, ele.phone)
        //     }else if(email.trim() == "" && password.trim() == ""){
            //         err_message.text('Complete login fields');
//     }else if(email.trim() == ""){
//         err_message.text('Complete email field');
//     }else if(password.trim() == ""){
//         err_message.text('Input password');
//     }else{
//         err_message.text('Invalid account');
//     }
// })
