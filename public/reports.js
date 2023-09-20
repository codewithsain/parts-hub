$(document).ready(function (){
    var parts = ""
    $.ajax({
        url: "/getPartsCompleted",
        method: "POST",
        success: function(response){
            console.log(response)
            if(response){
                $.each(response, function (key, val) { 
                    parts += "<option value='" + val.partNumber + "'>" + val.partNumber + "</option>";
                 })
    
                 $("#completedParts").html(parts + "<option value='' disabled selected hidden>Please select a part</option>");
            }
        }
    })
})

$(function (){

    $("#generateReport").on("click", function(){
        $.ajax({
            url: "/getReport",
            method: "POST",
            success: function() {
                
            }
        })
    })
})
