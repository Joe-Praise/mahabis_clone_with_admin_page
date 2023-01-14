$(document).ready(function(){
    let men_mega_menu = $("#men_mega_menu");
    let women_mega_menu = $('#women_mega_menu');
    let about_us_mega_menu = $("#about_us_mega_menu");
    let help_mega_menu = $("#help_mega_menu");

    $("#men_menu").click(function(){
        // make the men mega menu visible and closing any other mega menu opened
        $(men_mega_menu).toggle();
        $(women_mega_menu).hide();
        $(about_us_mega_menu).hide();
        $(help_mega_menu).hide();

        // button to remove this mega menu
        let men_del_btn = $(".men_del_btn");
        $(men_del_btn).click(function(){
            $(men_mega_menu).css({
                display:"none",
                transition: "all 0.3s ease-in-out"
            })
            
        })
    })
    
    $("#women_menu").click(function(){
        // make the women mega menu visible and closing any other mega menu opened
        $(women_mega_menu).toggle()
        $(men_mega_menu).hide()
        $(about_us_mega_menu).hide()
        $(help_mega_menu).hide();

        // button to remove this mega menu
        let women_del_btn = $(".women_del_btn");
        $(women_del_btn).click(function(){
            $(women_mega_menu).css({
                display:"none"
            })
        
        })
    })

    $('#about_us_menu').click(function(){
        // make the about us mega menu visible and closing any other mega menu opened
        $(about_us_mega_menu).toggle()
        $(women_mega_menu).hide()
        $(men_mega_menu).hide()
        $(help_mega_menu).hide()

        // button to remove this mega menu
        let about_us_del_btn = $(".about_us_del_btn");
        $(about_us_del_btn).click(function(){
            $(about_us_mega_menu).css({
                display: "none",
            })
        })
    })

    $("#help_menu").click(function(){
        // make the help mega menu visible and closing any other mega menu opened
        $(help_mega_menu).toggle();
        $(men_mega_menu).hide();
        $(women_mega_menu).hide();
        $(about_us_mega_menu).hide();

        // button to remove this mega menu
        let help_del_btn = $(".help_del_btn");
        $(help_del_btn).click(function(){
            $(help_mega_menu).css({
                display:"none"
            })
        })
    })
    


    
    // TAB SECTION
    // show the second div contents
    $(".display_container:nth-child(3)").show();
    // add .active to the second div button
    $(".tabs li:nth-child(2)").addClass('active')

    $(".tabs li").click(function(event){
        // act on the event
        index = $(this).index();
        $(".tabs li").removeClass('active');
        $(this).addClass('active');
        $(".display_container").hide();
        $(".display_container").eq(index).show();
    })



    // this is for the plug in
    $(".comparison-container[data-orientation!='vertical']").twentytwenty({default_offset_pct:0.5});

    // logic for the article section
    let slider = $(".article_contents");
    let independent_btn = $("#independent_btn");
    let gq_btn = $("#gq_btn");
    let times_btn = $("#times_btn");

    $(independent_btn).click(function(){
        
        $(".article_btns li:first").addClass("active_article");
        $(".article_btns li:nth(1)").removeClass("active_article");
        $(".article_btns li:nth(2)").removeClass("active_article");
        
        $(slider).css({
            transform:"translateX(0)"
        });

    })
    $(gq_btn).click(function(){
        
        $(".article_btns li:first").removeClass("active_article");
        $(".article_btns li:nth(2)").removeClass("active_article");
        $(".article_btns li:nth(1)").addClass("active_article");

        $(slider).css({
            transform:"translateX(-33.3%)"
        });
    })
    $(times_btn).click(function(){

        $(".article_btns li:first").removeClass("active_article");
        $(".article_btns li:nth(1)").removeClass("active_article");
        $(".article_btns li:nth(2)").addClass("active_article");

        $(slider).css({
            transform:"translateX(-66.65%)"
        });
    })

    let loggedIn = JSON.parse(localStorage.getItem('loggedIn_user'))
    if(loggedIn){
        // hiding the login link
        $("#login").hide();

        //creating a new element to display the logged in user name 
        $(".display").text(`Welcome, ${loggedIn.first_name}`).slideDown(6000).fadeOut(4000).css({
            color: "#282828",
            textAlign: "center",
            backgroundColor:"#eeeeee"
        })

        // creating a new element to logout the current user
        $(".nav-profile").append("<button type='button' id='btn_logOut'>Log out</button>");
        
        $("#btn_logOut").css({
            border:"none",
            padding: '5px 0',
            fontSize: "18px",
            backgroundColor: 'white'
        })
    }

    // logOut btn
    $('#btn_logOut').click(function(){
        localStorage.removeItem('loggedIn_user');
        window.location.href = "/login.html"
    })

})