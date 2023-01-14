$(document).ready(function(){
    $.ajax({
        metnod: "GET",
        url: "http://159.65.21.42:9000/users",
        success: function(data){
            let users;
            $(data).each(function(i, ele){
                users=`
                <div id="${ele._id}" class="users_card_container">
                    <div class="user_card">
                        <h4>Name: ${ele.name}</h4>
                        <h4>Number: ${ele.phone}</h4>
                        <h4>Email: ${ele.email}</h4>
                        <h4>password: ${ele.password}</h4>
                    </div>
                    <div class="btn_container">
                        <button class="delete_user">Delete</button>
                        <button class="edit_user">Edit</button>
                    </div>
                </div>
                `
                $(".users_body").append(users);

            })

            // pushing the total no. of users to the local storage in order to pass it to the dashboard

            let total_users = data.length;
            // console.log(total_users)

            localStorage.setItem("total_users", JSON.stringify(total_users));

            // delete user section
            const delete_user = $(".delete_user");
            $(delete_user).click(function(event){
                if(event.target.className === "delete_user"){
                    const del_id = event.target.closest(".users_card_container").id;
                    $.ajax({
                        method: "DELETE",
                        url: `http://159.65.21.42:9000/user/${del_id}`,
                        success: function(data){
                            alert("user deleted");
                            console.log(data);
                            window.location.reload();
                        },
                        error: function(err){
                            console.log(err);
                        }
                    })
                }
            })

            // edit user section
            const edit_user = $(".edit_user");
            $(edit_user).click(function(event){
                if(event.target.className === "edit_user"){
                    const edit_id = event.target.closest(".users_card_container").id;

                    $(".modal").fadeIn(1000);
                    $(".modal-content").slideDown(1000);
                    $(".close").click(function(){
                        $(".modal").css({
                            display : "none"
                        })
                        $("body").css({
                            overflow: "hidden"
                        })
                        window.location.reload();
                    })

                    $.ajax({
                        method: "GET",
                        url: `http://159.65.21.42:9000/user/${edit_id}`,
                        success: function(data){

                            let modal_form = `
                            <form id="register_form">
                                <div class="form_group">
                                    <label for="name_update">name</label>
                                    <input type="text" id="name_update" name="name" value="${data.name}">
                                </div>
                                <div class="form_group">
                                    <label for="phone_number_update">phone number</label>
                                    <input type="text" id="phone_number_update" name="phone" value="${data.phone}">
                                </div>
                                <div class="form_group">
                                    <label for="email_uupdate">email</label>
                                    <input type="email" id="email_update" placeholder="your@email.com" name="email" value="${data.email}">
                                </div>
                                <div class="form_group">
                                    <label for="password_update">password</label>
                                    <input type="text" id="password_update" name="password">
                                    <p class="test"></p>
                                </div>
                                <div>
                                    <button type="button" id="update_btn">Update details</button>
                                </div>
                            </form>
                            `

                            console.log(data);
                            $(".modal-content").append(modal_form);
                            $("body").css({
                                overflow: "hidden"
                            })

                            $("#update_btn").click(function (){

                                let update_info = {
                                    name: $("#name_update").val(),
                                    phone: parseInt($("#phone_number_update").val()),
                                    email: $("#email_update").val(),
                                    password: $("#password_update").val()
                                }

                                $.ajax({
                                    method:"PUT",
                                    url: `http://159.65.21.42:9000/user/${edit_id}`,
                                    headers: { "content-type": "application/json" },
                                    data: JSON.stringify(update_info),
                                    processData: false,
                                    contentType: false,
                                    success: function (update){
                                        alert("User info Updated");
                                        console.log(update);
                                        $(".modal").css({
                                            display: "none"
                                        })
                                        $("body").css({
                                            overflow: "visible"
                                        })
                                        window.location.reload();
                                    },
                                    error: function(err){
                                        console.log(err);
                                    }
                                })
                            })
                        }
                    })
                }
            })
        },
        error: function(err){
            console.log(err)
        }
    })
})