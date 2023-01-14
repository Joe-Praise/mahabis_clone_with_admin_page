$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: "http://159.65.21.42:9000/products",
        success: function(items){
            let output;
            $(items).each(function(i,res) {
                if(res.category === "Joe"){
                    
                    output = `
                    <div id=${res._id} class="product">
                        <div class="pro_card">
                            <div class="img">
                            <img src="http://159.65.21.42:9000${res.image}">
                            </div>
                            <div class="info" id=${res._id}>
                                <h3>${res.name}</h3>
                                <h3>₦${res.price}</h3>
                                <h4>Quantity:${res.quantity}</h4>
                                <h5>${res.description}</h5>
                            </div>
                            <div class="btn_container">
                                <button class="delete">Delete</button>
                                <button class="edit">Edit</button>
                            </div>
                        </div>
                    </div>
                    `;
                    $(".container").append(output);  

                    // getting the total number of products and displaying it.
                    let total = $(".product").length;
                    $("#total_products").text(total);
                    console.log(total)
                    localStorage.setItem("total_product", JSON.stringify(total));
                }
                
            })

            // this on click function is used to delete the product from the endpoint
            const item_del = $('.delete');
            $(item_del).click(function(event){
                if(event.target.className === "delete"){
                    const del_id = event.target.closest(".product").id;
                    $.ajax({
                        url: `http://159.65.21.42:9000/product/${del_id}`,
                        method: "DELETE",
                        success:function(data){
                            alert("Product Deleted");
                            console.log(data);
                            window.location.reload();
                        },
                        error:function(err){
                            console.log(err);
                        }
                    })
                }
            })


            // this on click is used to access and edit data on the end point
            const item_edit = $(".edit");
            $(item_edit).click(function(event){
                if(event.target.className === "edit"){
                    const edit_id = event.target.closest(".product").id;

                    $(".modal").fadeIn(1000);
                    $(".modal-content").slideDown(1000);
                    $(".close").click(function(){
                        $(".modal").css({
                            display : "none"
                        })
                        $("body").css({
                            overflow: "visible"
                        })
                        window.location.reload();
                    })

                    $.ajax({
                        method: "GET",
                        url: `http://159.65.21.42:9000/product/${edit_id}`,
                        success: function(data) {
                            
                            let modal_form = `
                            <form enctype="multipart/form-data" id="put_form">
                            <div class="form_group">
                                <label for="product_name">Name</label>
                                <input name="name" type="text" value="${data.name}" id="name">
                            </div>
                            <div class="form_group">
                                <label for="category">Category</label>
                                <select name="category">
                                    <option value="${data.category}" id="category">Joe</option>
                                </select>
                            </div>
                            <div class="form_group">
                                <label for="product_price">Price</label>
                                <input type="text" name="price" value="${data.price}" id="price">
                            </div>
                            <div class="form_group">
                                <label for="product_quantity">Quantity</label>
                                <input type="text" name="quantity" value="${data.quantity}" id="quantity">
                            </div>
                            <div class="form_group">
                                <label for="file"></label>
                                <input type="file" accept="images/*" name="image" id="file">
                            </div>
                            <div class="form_group">
                                <label for="product_description">Description</label>
                                <textarea cols="30" rows="10" name="description" id="description" ></textarea>
                            </div>
                            <div class="form_group">
                                <button id="put_btn" type="button">Create Product</button>
                            </div>
                            </form>
                            `
                            
                            $(".modal-content").append(modal_form);
                            $("body").css({
                                overflow: "hidden"
                            })

                            $("#put_btn").click(function(){

                                const name = $("#name").val();
                                const category = $("#category").val();
                                const price = $("#price").val();
                                const quantity = $("#quantity").val();
                                const file = $("#file")[0].files[0];
                                const description = $("#description").val();

                                // var form = $("#put_form")[0];
                                var form_data = new FormData();
                                form_data.append('name', name);
                                form_data.append('category', category);
                                form_data.append('price', price);
                                form_data.append('quantity', quantity);
                                form_data.append('image', file);
                                form_data.append('description', description);


                                $("body").css({
                                    overflow: "hidden"
                                })

                                $.ajax({
                                    url:`http://159.65.21.42:9000/update/product/${edit_id}`,
                                    type: "PUT",
                                    data: form_data,
                                    processData: false,
                                    contentType: false,
                                    success: function (update) {
                                        alert("Product updated");
                                        console.log(update);
                                        $(".modal").css({
                                            display: "none"
                                        })
                                        $("body").css({
                                            overflow: "visible"
                                        })
                                    },
                                    error: function (err) {
                                        console.log(err);
                                        console.log("no boss")
                                    },
                                })
        
                            })
                        },
                        error: function(err){
                            console.log(err);
                        }

                    })

                }
            })

        },
        error: function(err){
            console.log(err);
        }
    });
    
})