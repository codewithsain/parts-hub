$(document).ready(function (){


    var suppliers = ""
    $.ajax({
        type: "POST",
        url: "/getSuppliers",
        success: function (response) {
            $.each(response, function (key, val) { 
                suppliers += "<option value='" + val.id + "'>" + val.supplierName + "</option>";
             })

             $("#supplier").html(suppliers + "<option value='' disabled selected hidden>Select a supplier</option>");
        }
    })
    
    var currPart = Cookies.get("currentPart")
    $.ajax({
        type: "POST",
        url: "/getCurrentSupplier",
        data: {
            partNumber: currPart
        },
        beforeSend: function (){
            $("#supplier").text("Loading...")
        },
        success: function (response) {
                $("#supplier").val(response[0].id),
                $("#supplierNumber").text(response[0].supplierNumber),
               $("#country").text(response[0].country),
               $("#category").text(response[0].supplierCat),
               $("#subcontracting").text(response[0].subCont)
        }
    });

   

})

$(function () {
    
    $("#supplier").on("change", function (){
        $.ajax({
            type: "POST",
            url: "/getInfo",
            data: {
                id: $("#supplier").val()
            },
            success: function (response) {
               $("#supplierNumber").text(response[0].supplierNumber),
               $("#country").text(response[0].country),
               $("#category").text(response[0].supplierCat),
               $("#subcontracting").text(response[0].subCont)
            }
        })
    })
   
})

$(function () {

    $("#supplierForm").validate({
        rules: {
            supplier: {
                required: true
            }
        },
        messages: {
            supplier: {
                required: "Please select a supplier"
            }
        },
        submitHandler: function(){
            var currPart = Cookies.get("currentPart")
            $("#saveSupplier").on("click", function() {
                $.ajax({
                    url: "/saveSupplier",
                    method: "POST",
                    data:{
                        partNumber: currPart,
                        suppID: $("#supplier").val()
                    },
                    success: function (response) { 
                        if(response === 'ok'){
                            $(".message-container-successAdmin .message").text("Supplier updated successfully");
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
            })
        }
        
    })
   
})