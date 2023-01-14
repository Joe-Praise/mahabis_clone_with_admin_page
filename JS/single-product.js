$(document).ready(function(){

    let location = window.location.search;
    let url = new URLSearchParams(location);
    let id = url.get("id");


    $.ajax({
        method: "GET",
        url: `http://159.65.21.42:9000/product/${id}`,
        success: function(data){
            let  single_product =`
                <div><img src="http://159.65.21.42:9000${data.image}" alt=""></div>
                <div><img src="http://159.65.21.42:9000${data.image}" alt=""></div>
                `
            $(".img-flex2").append(single_product);

            let single_product_info = `
                <h1 id="single_product_description">${data.description}</h1>
                <h3 id="single_product_price">₦${data.price}</h3>
                <p>choose your upper colour | <span id="color_description">${data.name}</span></p>
            `
            $(".description_container").prepend(single_product_info);
            
            $("#add_to_cart").click(function(){
                let name = `${data.name}`;
                let price = `${data.price}`;
                let quantity = `${data.quantity}`
                let description = `${data.description}`
                let image = `${data.image}`
                let id = `${data._id}`
                
                let logged_cart = [];
                let storedData = JSON.parse(localStorage.getItem("logged_cart"));
    
                let data_stored = {
                    name: name,
                    price: price,
                    quantity: quantity,
                    description: description,
                    image: image,  
                    id: id
                }

                
                if(storedData){
                    logged_cart = storedData;
                }
                
                logged_cart.push(data_stored);
                localStorage.setItem("logged_cart", JSON.stringify(logged_cart));
                
            })

            let addToCart = `
                <a href="cart.html?id=${data._id}" class="addToCart">
                    ADD TO CART
                </a>
            `
            $("#add_to_cart").append(addToCart);

        },
        error: function(err){
            console.log(err)
        }
    })

    
    // accordion section
    let acc = $(".accordion");
    let i;
    for(i= 0; i <acc.length; i++){
        acc[i].addEventListener("click", function(){
            this.classList.toggle('active');

            var dropdown = this.nextElementSibling;
            if(dropdown.style.maxHeight){
                dropdown.style.maxHeight = null;
            }else {
                dropdown.style.maxHeight = dropdown.scrollHeight + 'px'
            }
        });
    }




    // swiper Js api
    var swiper_2= new Swiper(".single_product_slider_container", {
        slidesPerView: 1,
        slidesPerView: 1,
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
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints:{
            0: {
                slidesPerView: 1,
            },
            520:{
                slidesPerView: 2,
            },
            950:{
                slidesPerView: 3,
            },
        }
    });

    // to get the scroll position of the document page 
    $(document).scroll(function(){
        let scroll = scrollY;
        // console.log(scroll);
    })

    // shoe animation for large screens
    $(document).scroll(function(){

        if(document.documentElement.scrollTop >2100){
            $("#animation-2").css({
                paddingTop: "30px"
            })
            $("#animation-3").css({
                paddingTop: "30px"
            })
            $("#animation-4").css({
                paddingTop: "30px"
            })
        }else{
            $("#animation-2").css({
                paddingTop: "0px"
            })
            $("#animation-3").css({
                paddingTop: "0px"
            })
            $("#animation-4").css({
                paddingTop: "0px"
            })
        }

        if(document.documentElement.scrollTop > 2200){
            $("#animation-2").css({
                paddingTop: "170px"
            })
            $("#animation-3").css({
                paddingTop: "100px"
            })
            $("#animation-4").css({
                paddingTop: "80px"
            })
            $(".left_split_text, .right_split_text").css({
                visibility:'visible'
            })
        }else{
            $(".left_split_text, .right_split_text").css({
                visibility:'hidden'
            })
        }
        
    })


    

    var swiper_review_3= new Swiper(".review_slider_container", {
        slidesPerView: 1,
        slidesPerView: 1,
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
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints:{
            0: {
                slidesPerView: 1,
            },
            520:{
                slidesPerView: 2,
            },
            950:{
                slidesPerView: 3,
            },
        }
    });
})