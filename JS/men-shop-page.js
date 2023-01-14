$(document).ready(function(){
    
    // using Ajax Get method to retrieve products info from the serve and driectly infusing them into the product page
    $.ajax({
        method: "GET",
        url: "http://159.65.21.42:9000/products",
        success: function(data){
            let products;
            $(data).each(function(i,ele){
                if(ele.category === "Joe"){
                    products =`
                    <a class="men_shop_page_card" href="single-product.html?id=${ele._id}">
                        <div class="card_content">
                            <div class="card-img">
                                <div class="card-press">
                                <img src="http://159.65.21.42:9000${ele.image}" alt="">
                                </div>
                            </div>
                            <div class="card-info">
                                <h3>${ele.name}</h3>
                                <p class="card-description">${ele.description}</p>
                                <p>₦${ele.price}</p>
                            </div>
                        </div>
                    </a>
                    `
                    $("#product_container").append(products);
                }
            })
        },
        error: function (err) {
            console.log(err);
        },
    })








    // creating variables for the dropdown buttons
    let gender_btn =$("#product_gender");
    let size_btn = $("#product_size");
    let collection_btn = $("#product_collection");
    let upper_color_btn = $("#product_upper-color");
    let sole_color_btn = $("#product_sole-color");

    $(gender_btn).click(function(){
        $(".dropdown_container.gender").toggle()
        $(".dropdown_container.size").hide()
        $(".dropdown_container.collection").hide()
        $(".dropdown_container.upper_color").hide()
        $(".dropdown_container.sole-color").hide()
    })
    $(size_btn).click(function(){
        $(".dropdown_container.size").toggle()
        $(".dropdown_container.gender").hide()
        $(".dropdown_container.collection").hide()
        $(".dropdown_container.upper_color").hide()
        $(".dropdown_container.sole-color").hide()

    })
    $(collection_btn).click(function(){
        $(".dropdown_container.collection").toggle()
        $(".dropdown_container.size").hide()
        $(".dropdown_container.gender").hide()
        $(".dropdown_container.upper_color").hide()
        $(".dropdown_container.sole-color").hide()

    })
    $(upper_color_btn).click(function(){
        $(".dropdown_container.upper_color").toggle()
        $(".dropdown_container.collection").hide()
        $(".dropdown_container.size").hide()
        $(".dropdown_container.gender").hide()
        $(".dropdown_container.sole-color").hide()

    })
    $(sole_color_btn).click(function(){
        $(".dropdown_container.sole-color").toggle()
        $(".dropdown_container.upper_color").hide()
        $(".dropdown_container.collection").hide()
        $(".dropdown_container.size").hide()
        $(".dropdown_container.gender").hide()
    })
})