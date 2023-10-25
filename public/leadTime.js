$(document).ready(function (){

    var calculateTotal = function(){
        var total = (parseInt($('#prodProcurementLT').val()) || 0 ) +
                    (parseInt($('#toolingLT').val()) || 0 ) +
                    (parseInt($("#adminLT").val()) || 0 );
             
        $('#materialRelLT').text(total);
    };
    
    $('#prodProcurementLT' ).keyup(function(){
        calculateTotal();
    });

    $('#toolingLT' ).keyup(function(){
        calculateTotal();
    });

    $('#adminLT' ).keyup(function(){
        calculateTotal();
    });

    var currPart = Cookies.get("currentPart")
    $.ajax({
        url: "/getLeadTimes",
        method: "POST",
        data:{
            partNumber: currPart
        },
        success: function(response){
   
             $('#selectPPBB').val(response[0].prodProcBB),
           $('#selectTNBB').val(response[0].toolNBB),
             $('#location').val(response[0].location),
           $('#experimentalLT').val(response[0].expLT),
             $('#prodProcurementLT').val(response[0].ppLT),
             $('#toolingLT').val(response[0].toolLT),
            $('#adminLT').val(response[0].adminLT),
             $('#materialRelLT').text(response[0].mRLT)
        }
    })
})

$(function () {

    $("#selectLeadTimeBtn").on("click", function () { 
        $("#leadTimeSelectModal").css("display", "grid")
        loadLeadTimeTable();

     })

     $("#closeLeadTimeModal").on("click", function () { 
        $("#leadTimeSelectModal").css("display", "none")
     })


     $("#addLeadTimeBtn").on("click", function () { 
        var date = new Date
       var dateTimestamp=  date.toISOString().slice(0, 19).replace('T', ' ')
        var currPart = Cookies.get("currentPart")

        $("#leadTimeForm").validate({
            rules:{
                selectPPBB: {
                    required: true,
                },
                selectTNBB: {
                    required: true,
                },
                location: {
                    required: true,
                },
                experimentalLT: {
                    required: true,
                    number: true,
                    maxlength: 12
                },
                prodProcurementLT: {
                    required: true,
                    number: true,
                    maxlength: 12
                },
                toolingLT: {
                    required: true,
                    number: true,
                    maxlength: 12
                }
                ,
                adminLT: {
                    required: true,
                    number: true,
                    maxlength: 12
                }
            },
            messages: {
                selectPPBB: {
                    required: "Please select a value",
                },
                selectTNBB: {
                    required: "Please select a value",
                },
                location: {
                    required: "Please select a value",
                },
                experimentalLT: {
                    required: "Please enter a value",
                    number: "Only digits are allowed",
                    maxlength: "Max length 10 number"
                },
                prodProcurementLT: {
                    required: "Please enter a value",
                    number: "Only digits are allowed",
                    maxlength: "Max length 10 number"
                },
                toolingLT: {
                    required: "Please enter a value",
                    number: "Only digits are allowed",
                    maxlength: "Max length 10 number"
                }
                ,
                adminLT: {
                    required: "Please enter a value",
                    number: "Only digits are allowed",
                    maxlength: "Max length 10 number"
                }
            },
            submitHandler: function(){
                $.ajax({
                    url: "/addLeadTime",
                    method: "POST",
                    data: {
                        prodProcBB: $('#selectPPBB').val(),
                        toolNBB: $('#selectTNBB').val(),
                        location: $('#location').val(),
                        expLT: $('#experimentalLT').val(),
                        ppLT: $('#prodProcurementLT').val(),
                        toolLT: $('#toolingLT').val(),
                        adminLT:$('#adminLT').val(),
                        mRLT: $('#materialRelLT').text(),
                        createDate: dateTimestamp,
                        partID: currPart
                    },
                    before: function (){
                        $(".loadingContainer").css("display", "grid")
                    },
                    success: function (response) {
               
                        if(response === 'ok'){
                            $(".loadingContainer").css("display", "none")
                            $(".message-container-successAdmin .message").text("Lead Time esimation added successfully");
                            $(".message-container-successAdmin").css("display", "grid");
                            setTimeout(function () { 
                                $(".message-container-successAdmin").css("display", "none");
                             },6000)
                        }else{
                        $(".loadingContainer").css("display", "none")
                        $(".message-container-errorAdmin .message").text("An error has ocurred");
                        $(".message-container-errorAdmin").css("display", "grid");
                        setTimeout(function () { 
                            $(".message-container-error").css("display", "none");
                         },6000)
                        }
                    }
                })

                $("#addQuantityBtn").prop("disabled", false)
                $("#leadTimeStep").css("background-color", "#367c2b")
                $("#leadTimeStep").css("border", " 3px solid #367c2b")
            }
        })

      })
    
      $("table").on("click", "#deleteLeadTimeBtn", function(){
        $('#deleteLeadtimeModal').css("display", "grid");
        
        let row = $(this).closest('tr');
   
        let id= row.find('.tableLeadTimeID').text();

        $("#confirmLeadTimeDelete").on('click', function(){
            $.ajax({
                url: '/deleteLeadTime',
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
                        $(".message-container-successAdmin .message").text("Lead time estimation deleted successfully");
                        $(".message-container-successAdmin").css("display", "grid");
                        $('#leadTimeSelectModal').css("display", "none");
                        $('#deleteLeadtimeModal').css("display", "none");
                        setTimeout(function () { 
                            $(".message-container-successAdmin").css("display", "none");
                         },6000)
                    }else{
                        $(".loadingContainer").css("display", "none")
                        $(".message-container-errorAdmin .message").text("An error has occurred");
                        $(".message-container-errorAdmin").css("display", "grid");
                        $('#leadTimeSelectModal').css("display", "none");
                        $('#deleteLeadtimeModal').css("display", "none");
                        setTimeout(function () { 
                            $(".message-container-errorAdmin").css("display", "none");
                         },6000)
                     }
                }
             })
         })

    })

    $("#closeDeleteLeadTimeModal").on("click", function() {
        $('#deleteLeadtimeModal').css("display", "none");
    })

    $("#cancelLeadTimeDelete").on("click", function(e){
        e.preventDefault();
        $("#deleteLeadtimeModal").css("display", "none")
    })

    $("table").on("click", "#updateLeadTimeBtn", function(){
        
        let row = $(this).closest('tr');
   
        let id= row.find('.tableLeadTimeID').text();
        let prodProcBB = row.find('.prodProcBB').text();
        let toolNBB = row.find('.toolNBB').text();
        let location = row.find('.location').text();
        let expLT = row.find('.expLT').text();
        let ppLT = row.find('.ppLT').text();
        let toolLT = row.find('.toolLT').text();
        let adminLT = row.find('.adminLT').text();
        let mRLT = row.find('.mRLT').text();        

        $('#selectPPBB').val(prodProcBB)
        $('#selectTNBB').val(toolNBB)
         $('#location').val(location)
         $('#experimentalLT').val(expLT)
        $('#prodProcurementLT').val(ppLT)
        $('#toolingLT').val(toolLT)
        $('#adminLT').val(adminLT)
        $('#materialRelLT').text(mRLT)

         $("#leadTimeSelectModal").css("display", "none")
         $(".message-container-successAdmin .message").text("Lead Time estimation loaded successfully");
         $(".message-container-successAdmin").css("display", "grid");
            setTimeout(function () { 
            $(".message-container-successAdmin").css("display", "none");
            },6000)

    })

})

function loadLeadTimeTable() {
    var leadTimes = ''
    var currPart = Cookies.get("currentPart")
    $.ajax({
        url: "/getLeadTimes",
        method: "POST",
        data:{
            partNumber: currPart
        },
        success: function(response){
            $('#leadTimeTable tr').not(':first').remove();
            $.each(response, function (key, val) { 
                leadTimes += '<tr><td class="tableLeadTimeID">' + val.id + '</td><td class="prodProcBB">' + val.prodProcBB+ '</td><td class="toolNBB">' + val.toolNBB+ '</td><td class="location">' + val.location+ '</td><td class="expLT">' + val.expLT+ '</td><td class="ppLT">' + val.ppLT+ '</td><td class="adminLT">' + val.adminLT+ '</td><td class="toolLT">' + val.toolLT+ '</td><td class="mRLT">' + val.mRLT+ '</td><td class="createDate">' + val.createDate+ '</td><td class="rowActions" id="rowActions"><button type="click" class="actionBtn"  id="deleteLeadTimeBtn">Delete</button><button type="click"  class="actionBtn" id="updateLeadTimeBtn">Load</button></td></tr>';
             })
             $('#leadTimeTable tr').first().after(leadTimes);
        }
    })
}