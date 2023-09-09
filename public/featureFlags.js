$(document).ready(function () {

    $.ajax({
        url: "/getFlags",
        method: "POST",
        beforeSend: function(){
            $(".loadingContainer").css("display", "grid")
        },
        success: function (response) { 
            $(".loadingContainer").css("display", "none");
            $.each(response, function (key, val) {
                if(val.value === "false"){
                    let id = "#" + val.cookie.toString();
                    $(id).css("display", "none")
                }else{
                    let id = "#" + val.cookie.toString();
                    $(id).css("display", "grid")
                }
                
             })
         }
    })
    
})