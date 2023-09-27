$(function (){
    var currPart = Cookies.get("currentPart")
    var date = new Date
    var dateTimestamp=  date.toISOString().slice(0, 19).replace('T', ' ')
    $("#signOffButton").on("click", function (){
        $.ajax({
            url: "/updatePartStatus",
            method: "POST",
            data: {
                partNumber: currPart,
                updateDate: dateTimestamp
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