$(document).ready(function(){
 
    let data = JSON.parse(localStorage.getItem("logged_cart"))
    $(data).each((i,ele)=>{

        $(".price_checkout").css({
            display:"block"
        })
        if(ele.id === null){
            $(".product_card").css({
                display:"none"
            })
        }else{
            let cart_product =`
            <div class="product_card" id="${ele.id}">
                <i class="fa-solid fa-x"></i>
                <div class="product-img">
                    <img src="http://159.65.21.42:9000${ele.image}" alt="">
                </div>
                <div class="product_description">
                    <h5>${ele.description}</h5>
                    <p>${ele.name}</p>
                    <p>SIZE EU 44</p>
                    <div class="quantity">
                        <div class="product_quantity">
                            <span class="sub">-</span>
                            <span class="quantity_display">1</span>
                            <span class="add">+</span>
                        </div>
                        <div class="quantity-price"><h5>₦${ele.price}</h5></div>
                    </div>
                </div>
            </div>
            `
            $(".products").append(cart_product);  
        }

    })
    removeCartItem();
    subBtn();
    addBtn()
    updateCartTotal()
    hidePriceCheckout()
    checkout()
    totalProductInCart()
    
    function removeCartItem(){
        $(".fa-solid.fa-x").click(function(event){
            if(event.target.className === "fa-solid fa-x"){

                // getting the price of the product and detting it to 0 in order to subtract the cost of the product from the total
                event.currentTarget.nextElementSibling.nextElementSibling.lastElementChild.lastElementChild.innerText = 0
                updateCartTotal()

                // getting the product display and removing it from the cart
                const item = event.target.closest(".product_card").remove();

                let count_btns = $(".fa-solid.fa-x")

        
                if(count_btns.length <= 0){
                    $(".price_checkout").css({
                        display: "none"
                    })
                    localStorage.removeItem("logged_cart");
                } 
            }
        })
    }

    
    function hidePriceCheckout(){

        let count_btns = $(".fa-solid.fa-x")

        for(let i = 0; i < count_btns.length; i++ ){
            let button = count_btns[i];

            if(button = 0){
                $(".price_checkout").css({
                    display: "none"
                })
            }
        }
    }

    function subBtn(){
        // let qty_display = document.getElementsByClassName("quantity_display");
        let sub = document.getElementsByClassName("sub");
        // loop through the button
        for(var i = 0; i < sub.length; i++){

            // each button
            let sub_button = sub[i]

            // setting an event for every click on each button
            sub_button.addEventListener('click', function(event){
                if(event.currentTarget.nextElementSibling.innerText <= 1){
                    event.currentTarget.nextElementSibling.innerText = 1
                }else{
                    let clicked_button = event.currentTarget.nextElementSibling;
                    let sub_qty = parseInt(clicked_button.innerText) - 1;
                    clicked_button.innerText = sub_qty;

                    // getting the current price of the cart and converting it to an integer
                    let get_current_price = event.currentTarget.parentElement.nextElementSibling.innerText.replace("₦", "");
                    let current_price = parseInt(get_current_price);

                     // get the initial price and replace the ₦ symbol and parse it to make it an integer capable of doing maths
                    let getId = event.currentTarget.closest(".product_card").id;
                    let ele = JSON.parse(localStorage.getItem("logged_cart"))

                        // looping through the loca storage
                    $(ele).each((i, ele)=>{

                    // getting the product details with its id from local staorage
                    if(ele.id === getId){
                        // convert the string into an integer
                        let price = parseInt(ele.price);

                        // take away the initial price from the current alternating price
                        let sub_price = (current_price - price);

                        // display the sub price
                        display_total = clicked_button.parentElement.nextElementSibling.innerText = "₦" + sub_price;
                        updateCartTotal()
                    }
                })
                
            }
        })
        
    }
}

    function addBtn(){
       let add = document.getElementsByClassName("add");
       // loop through the buttons
        for(var i = 0; i < add.length; i++){
            // each button
            let add_button = add[i]

            // setting an event for every click on each button
            add_button.addEventListener('click', function(event){
                // get the clicked button
                let clicked_button = event.currentTarget.previousElementSibling;

                // convert the string to and integer and increment everytime the button is clicked
                let add_qty = parseInt(clicked_button.innerText) + 1;

                // display the increased quantity
                let quantity = clicked_button.innerText = add_qty;

                // get the initial price and replace the ₦ symbol and parse it to make it an integer capable of doing maths
                let getId = event.currentTarget.closest(".product_card").id;
                let ele = JSON.parse(localStorage.getItem("logged_cart"))
                
                // looping through the loca storage
                $(ele).each((i, ele)=>{

                    // getting the product details with its id from local staorage
                    if(ele.id === getId){
                        
                        // convert the string into an integer
                        let price = parseInt(ele.price);

                        // multiply the fixed price by the alternating quantity
                        let add_price = (price * quantity);

                        // display the add price
                        display_total = clicked_button.parentElement.nextElementSibling.innerText = "₦" + add_price;
                        updateCartTotal()
                    }
                })
                
            })

        }

    }


    function updateCartTotal(){
        let cartItemContainer = document.getElementsByClassName("products")[0];
        let cartRows = cartItemContainer.getElementsByClassName('product_card');
        let total = 0
        for(var i = 0; i < cartRows.length; i++){
            let cartRow = cartRows[i]
            let itemPrice = cartRow.getElementsByClassName('quantity-price')[0]
            let price = parseInt(itemPrice.innerText.replace('₦', ''))
            // let quantity = parseInt(itemQty.innerText)
            // console.log(price)
            total= total + price
           let display_total= $(".TOTAL").text(`₦${total}`)
        //    console.log(total)
        }
    }



    /*=============================checkout_btn=============================== */

    function checkout(){
        $("#checkout_btn").click(function(){
            alert("Thank you for the Purchase!")
            $(".product_card").remove();
            $(".price_checkout").css({
                display: "none"
            })
            localStorage.removeItem("logged_cart");
        })
    }

    function totalProductInCart(){
        let total_cart_products = $(".product_card").length;
        console.log(total_cart_products)
        localStorage.setItem("no_of_cart_product", total_cart_products)
    }


    // swiper Js api
    var swiper = new Swiper(".product_slider_container", {
        slidesPerView: 5,
        spaceBetween: 10,
        centerSlide: "true",
        fade: "true",
        dragCursor: "true",
        loop: true,
        loopFillGroupWithBlank: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".fa-angle-right",
          prevEl: ".fa-angle-left",
        },
        breakpoints:{
            0: {
                slidesPerView: 1,
            },
            520:{
                slidesPerView: 3,
            },
            950:{
                slidesPerView: 4,
            },
        }
    });

    
})