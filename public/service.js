$(document).ready(function (){
    var currPart = Cookies.get("currentPart")
    $.ajax({
        url: "/getService",
        method: "POST",
        data: {
            partNumber: currPart
        },
        success: function(response){
            $("#lsi").val(response[0].lsi),
            $("#gsi").val(response[0].gsi)
        }
    })
})

$(function () {
    var currPart = Cookies.get("currentPart")
    var date = new Date
    var dateTimestamp=  date.toISOString().slice(0, 19).replace('T', ' ')
    $("#saveService").on("click", function() {

        $("#serviceForm").validate({
            rules: {
                lsi: {
                    required: true
                },
                gsi: {
                    required: true
                }
            },
            messages: {
                lsi: {
                    required: "Please select a local service"
                },
                gsi: {
                    required: "Please select a global service"
                }
            },
            submitHandler: function(){
           
               
                    $.ajax({
                        url: "/saveService",
                        method: "POST",
                        data:{
                            partNumber: currPart,
                            lsi:  $("#lsi").val(),
                            gsi:  $("#gsi").val(),
                            createDate: dateTimestamp
                        },
                        success: function (response) { 
                           
                            if(response === 'ok'){
                                $(".message-container-successAdmin .message").text("Service updated successfully");
                                $(".message-container-successAdmin").css("display", "grid");
                                setTimeout(function () { 
                                    $(".message-container-successAdmin").css("display", "none");
                                 },6000)
                            }else{
                            $(".message-container-errorAdmin .message").text("An error has ocurred");
                            $(".message-container-errorAdmin").css("display", "grid");
                            setTimeout(function () { 
                                $(".message-container-error").css("display", "none");
                             },6000)
                            }
                         }
                    })
    
                    $("#signOffButton").prop("disabled", false)
                    $("#serviceStep").css("background-color", "#367c2b")
                    $("#serviceStep").css("border", " 3px solid #367c2b")
               
            }
            
        })
    })
    
   
})
   