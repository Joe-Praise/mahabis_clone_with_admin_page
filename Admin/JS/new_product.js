$(document).ready(function(){
    
    $(".form_group").append("<span class='span'>Field is Required!</span>");
    $("#product_btn").click(function(){


        $('.inputs').each((i, ele)=>{
            if($(ele).val() == "" || $(ele).val() == null){
                $('.span').addClass("err");
                $(".span").removeClass('success');
            }else{
                $('.span').addClass("success");
                $(".span").removeClass('err');
                ele.nextElementSibling.innerHTML = '';
            }
        })

        var form = $("form")[0];
        var form_data = new FormData(form)

        $.ajax({
            method: "POST",
            url: "http://159.65.21.42:9000/create/product",
            enctype: "multipart/form-data",
            data: form_data,
            processData: false,
            contentType: false,
            success: function (data) {
                alert("Product Created");
                console.log(data);
            },
            error: function (err) {
                console.log(err);
            },
        });
    })
});