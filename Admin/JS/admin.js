$(document).ready(function(){

    $.ajax({
        method: "GET",
        url: "http://159.65.21.42:9000/products",
        success: function (data){
            $(data).each(function(i, ele){
                if(ele.category === "Joe"){
                    
                    let table = `
                    <tr>
                        <td><img src="http://159.65.21.42:9000${ele.image}"></td>
                        <td>${ele.description}</td>
                        <td>${ele.price}</td>
                    </tr>
                    `
                    
                    $("th, td").css({
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        borderCollapse: "collapse",
                        fontSize: "14px",
                        padding: "2px"
                    })
                    
                    $("th").css({
                        padding: "20px 0",
                        fontSize: "18px"
                    })

                    $(".products_table").css({
                        width:"100%"
                    })
                    
                    // console.log(ele);
                    $(".tbody").append(table);
                    $(".products_table").DataTable();
                }
            })
        },
        error: function (err){
            console.log(err)
        }
    })
    let date = new Date
    console.log(date);
    $(".date p").text(date);

    // displaying the total number of products
    let total_product_display = JSON.parse(localStorage.getItem("total_product"))
    $(".no_of_products").text(total_product_display);

    // displaying the total number of users
    let total_users_display = JSON.parse(localStorage.getItem("total_users"))
    $('.no_of_users').text(total_users_display);

    // displaying the total number of products in cart
    let total_cart_products = JSON.parse(localStorage.getItem("no_of_cart_product"));
    $(".products_in_cart").text(total_cart_products);
})
