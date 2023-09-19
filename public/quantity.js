$(document).ready(function () {
    var currPart = Cookies.get("currentPart")
    $.ajax({
        url: "/getQuantities",
        method: "POST",
        data:{
            partNumber: currPart
        },
        success: function(response){
            $("#globalEstimation").val(response[0].globalEstimation)
            $("#buyerEstimation").val(response[0].buyerEstimation)
            $("#quotedEstimation").val(response[0].quotedEstimation)
        }
    })
})

$(function () {  

    $('#selectQuantityBtn').on("click", function () {
        $("#quantitySelectModal").css("display", "grid")
        loadQuantityTable()
    })

    $("#closeQuantityModal").on("click", function (){
        $("#quantitySelectModal").css("display", "none")
    })

    $("#addQuantityBtn").on("click", function (){

        var date = new Date
       var dateTimestamp=  date.toISOString().slice(0, 19).replace('T', ' ')
        var currPart = Cookies.get("currentPart")

        $("#quantityForm").validate({
            rules:{
                globalEstimation: {
                    required: true,
                    number: true
                },
                buyerEstimation: {
                    required: true,
                    number: true
                },
                quotedEstimation: {
                    required: true,
                    number: true
                }
            },
            messages: {
                globalEstimation: {
                    required: "Please enter a value",
                    number: "Only numbers are allowed"
                },
                buyerEstimation: {
                    required: "Please enter a value",
                    number: "Only numbers are allowed"
                },
                quotedEstimation: {
                    required: "Please enter a value",
                    number: "Only numbers are allowed"
                }
            },
            submitHandler: function(){
                $.ajax({
                    url: "/addQuantity",
                    method: "POST",
                    data: {
                        globalEstimation: $("#globalEstimation").val(),
                        buyerEstimation: $("#buyerEstimation").val(),
                        quotedEstimation: $("#quotedEstimation").val(),
                        createDate: dateTimestamp,
                        partNumber: currPart
                    },
                    before: function (){
                        $(".loadingContainer").css("display", "grid")
                    },
                    success: function (response) {
                        if(response === 'ok'){
                            $(".loadingContainer").css("display", "none")
                            $(".addUserModal").css("display", "none");
                            $(".message-container-successAdmin .message").text("Quantity esimation added successfully");
                            $(".message-container-successAdmin").css("display", "grid");
                            setTimeout(function () { 
                                $(".message-container-successAdmin").css("display", "none");
                             },6000)
                        }else{
                        $(".loadingContainer").css("display", "none")
                        $(".addUserModal").css("display", "none");
                        $(".message-container-errorAdmin .message").text("An error has ocurred");
                        $(".message-container-errorAdmin").css("display", "grid");
                        setTimeout(function () { 
                            $(".message-container-error").css("display", "none");
                         },6000)
                        }
                    }
                })

                $("#saveToolingBtn").prop("disabled", false)
                $("#quantitiesStep").css("background-color", "#367c2b")
                $("#quantitiesStep").css("border", " 3px solid #367c2b")
            }
        })
    })
    


    $("table").on("click", "#deleteQuanBtn", function(){
        $('#deleteQuanModal').css("display", "grid");
        
        let row = $(this).closest('tr');
   
        let id= row.find('.tableQuanID').text();

        $("#confirmQuanDelete").on('click', function(){
            $.ajax({
                url: '/deleteQuan',
                method: 'POST',
                data:{
                    id: id
                },
                beforeSend: function(){
                    $(".loadingContainer").css("display", "grid")
                },
                success: function(response) {
                    if(response === 'ok'){
                        $(".loadingContainer").css("display", "none")
                        $(".deleteUserModal").css('display', 'none')
                        $(".message-container-successAdmin .message").text("Quantity estimation deleted successfully");
                        $(".message-container-successAdmin").css("display", "grid");
                        $('#quantitySelectModal').css("display", "none");
                        $('#deleteQuanModal').css("display", "none");
                        setTimeout(function () { 
                            $(".message-container-successAdmin").css("display", "none");
                         },6000)
                    }else{
                        $(".loadingContainer").css("display", "none")
                        $(".deleteUserModal").css('display', 'grid')
                        $(".message-container-errorAdmin .message").text("An error has occurred");
                        $(".message-container-errorAdmin").css("display", "grid");
                        $('#deleteQuanModal').css("display", "grid");
                        setTimeout(function () { 
                            $(".message-container-errorAdmin").css("display", "none");
                         },6000)
                     }
                    }
             })
         })

    })


    $("table").on("click", "#updateQuanBtn", function(){
        
        let row = $(this).closest('tr');
   
        let id= row.find('.tableQuanID').text();
        let ge= row.find('.tableGlobalEst').text();
        let be= row.find('.tableBuyerEst').text();
        let qe= row.find('.tableQuotedEst').text();


        $("#globalEstimation").val(ge)
        $("#buyerEstimation").val(be)
         $("#quotedEstimation").val(qe)

         $("#quantitySelectModal").css("display", "none")
         $(".message-container-successAdmin .message").text("Quantity estimation loaded successfully");
         $(".message-container-successAdmin").css("display", "grid");
         $('#quantitySelectModal').css("display", "none");
            setTimeout(function () { 
            $(".message-container-successAdmin").css("display", "none");
            },6000)

    })


    $("#closeDeleteQuanModal").on("click", function() {
        $('#deleteQuanModal').css("display", "none");
    })

    $("#cancelQuanDelete").on("click", function(e) {
        e.preventDefault();
        $('#deleteQuanModal').css("display", "none");
    })
    
})



function loadQuantityTable() {
    var quanTable = ''
    var currPart = Cookies.get("currentPart")
    $.ajax({
        url: "/getQuantities",
        method: "POST",
        data:{
            partNumber: currPart
        },
        success: function(response){
            $('#quantityTable tr').not(':first').remove();
            $.each(response, function (key, val) { 
                quanTable += '<tr><td class="tableQuanID">' + val.id + '</td><td class="tableGlobalEst">' + val.globalEstimation+ '</td><td class="tableBuyerEst">' + val.buyerEstimation+ '</td><td class="tableQuotedEst">' + val.quotedEstimation+ '</td><td class="tableCreateDate">' + val.createDate+ '</td><td class="rowActions" id="rowActions"><button type="click" class="actionBtn"  id="deleteQuanBtn">Delete</button><button type="click"  class="actionBtn" id="updateQuanBtn">Load</button></td></tr>';
             })
             $('#quantityTable tr').first().after(quanTable);
        }
    })
}