$(document).ready(function (){
    var currPart = Cookies.get("currentPart")
    
    $.ajax({
        url: "/getPartOverview",
        method: "POST",
        data:{
            partNumber: currPart
        },
        success: function(response) {
  
            $("#partNumber").text(response[0].partNumber),
            $("#revision").text(response[0].value),
            $("#partDesc").text(response[0].description),
            $("#unit").text(response[0].plant),
            $("#termCode").text(response[0].termCode),
            $("#termCodeDescription").text(response[0].termCodeDesc),
            $("#netWeight").text(response[0].netWeight),
            $("#grossWeight").text(response[0].grossWeight),
            $("#globalEAU").text(response[0].globalEAU === null ? "0" : response[0].globalEAU)
            $("#imageContainer").append('<img src="/partImages/'+response[0].partNumber+'.jpg" width="284" height="177">')
        }
    })
})