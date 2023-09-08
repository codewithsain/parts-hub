$(document).ready(function () {

    $.ajax({
        url: "/getFlags",
        method: "POST",
        success: function (response) { 
            
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