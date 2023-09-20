$(function (){
    var currPart = Cookies.get("currentPart")
    $("#signOffButton").on("click", function (){
        $.ajax({
            url: "/updatePartStatus",
            method: "POST",
            data: {
                partNumber: currPart
            },
            success: function (response){
                if(response === 'ok'){
                    $('.message-container-successAdmin').css('display', 'grid')
                    $(".message-container-successAdmin .message").text("Part signed off successfully");
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 2000);
                }
            }
        })
    })
})