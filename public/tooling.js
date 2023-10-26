$(document).ready(function (){
    var currPart = Cookies.get("currentPart")
    $.ajax({
        url: "/getTooling",
        method: "POST",
        data:{
            partNumber: currPart
        },
        success: function(response){
       
            $('#invQual').val(response[0].invQual),
            $('#supTool').val(response[0].supTool),
             $('#supToolExp').val(response[0].supToolExp),
             $('#invRep').val(response[0].invRep),
            $('#deereToolExp').val(response[0].deereToolExp),
            $('#returnCont').val(response[0].returnCont),
            $('#expTool').val(response[0].expTool),
            $('#deereTool').val(response[0].deereTool)
        }
    })

})

$(function () { 
    $("#selectToolingBtn").on("click", function () { 
        $("#toolingSelectModal").css("display", "grid")
        loadToolingTable();
     })

     $("#closeToolingModal").on("click", function () { 
        $("#toolingSelectModal").css("display", "none")
     })

     $("#saveToolingBtn").on("click", function () { 
        var date = new Date
       var dateTimestamp=  date.toISOString().slice(0, 19).replace('T', ' ')
        var currPart = Cookies.get("currentPart")
     

        $("#toolingForm").validate({
            rules:{
                invQual: {
                    required: true,
                },
                supTool: {
                    required: true,
                    number: true,
                    maxlength: 12
                },
                deereToolExp: {
                     required: true,
                    number: true,
                    maxlength: 12
                },
                invRep: {
                    required: true,
                },
                supToolExp: {
                     required: true,
                    number: true,
                    maxlength: 12
                },
                returnCont: {
                     required: true,
                    number: true,
                    maxlength: 12
                },
                expTool: {
                     required: true,
                    number: true,
                    maxlength: 12
                },
                deereTool: {
                    required: true,
                    number: true,
                    maxlength: 12
                }
            },
            messages: {
                invQual: {
                    required: "Please select a investment quality",
                },
                supTool: {
                    required: "Please enter a value",
                    number: "Only numbers are allowed",
                    maxlength: "Max length 12 numbers"
                },
                deereToolExp: {
                    required: "Please enter a value",
                    number: "Only numbers are allowed",
                    maxlength: "Max length 12 numbers"
                },
                invRep: {
                    required: "Please select a investment report",
                },
                supToolExp: {
                    required: "Please enter a value",
                    number: "Only numbers are allowed",
                    maxlength: "Max length 12 numbers"
                },
                returnCont: {
                    required: "Please enter a value",
                    number: "Only numbers are allowed",
                    maxlength: "Max length 12 numbers"
                },
                expTool: {
                    required: "Please enter a value",
                    number: "Only numbers are allowed",
                    maxlength: "Max length 12 numbers"
                },
                deereTool: {
                    required: "Please enter a value",
                    number: "Only numbers are allowed",
                    maxlength: "Max length 12 numbers"
                }
            },
            submitHandler: function(){
                $.ajax({
                    url: "/addTooling",
                    method: "POST",
                    data: {
                        invQual: $('#invQual').val(),
                        supTool: $('#supTool').val(),
                        supToolExp: $('#supToolExp').val(),
                        invRep: $('#invRep').val(),
                        deereToolExp: $('#deereToolExp').val(),
                        returnCont: $('#returnCont').val(),
                        expTool:$('#expTool').val(),
                        deereTool: $('#deereTool').val(),
                        createDate: dateTimestamp,
                        partNumber: currPart
                    },
                    before: function (){
                       
                    
                    },
                    success: function (response) {
                       
                        if(response === 'ok'){
                            
                            $(".message-container-successAdmin .message").text("Tooling estimation added successfully");
                            $(".message-container-successAdmin").css("display", "grid");
                            setTimeout(function () { 
                                $(".message-container-successAdmin").css("display", "none");
                             },6000)
                        }else{
                        
                        $(".addUserModal").css("display", "none");
                        $(".message-container-errorAdmin .message").text("An error has ocurred");
                        $(".message-container-errorAdmin").css("display", "grid");
                        setTimeout(function () { 
                            $(".message-container-error").css("display", "none");
                         },6000)
                        }
                    }
                })

                $("#saveNotesBtn").prop("disabled", false)
                $("#toolingStep").css("background-color", "#367c2b")
                $("#toolingStep").css("border", " 3px solid #367c2b")
            }
        })

      })

      $("table").on("click", "#deleteToolingBtn", function(){
        $('#deleteToolingModal').css("display", "grid");
        
        let row = $(this).closest('tr');
   
        let id= row.find('.toolingID').text();

        $("#confirmToolingDelete").on('click', function(){
            $.ajax({
                url: '/deleteTooling',
                method: 'POST',
                data:{
                    id: id
                },
                beforeSend: function(){
                   
                },
                success: function(response) {
                    if(response === 'ok'){
                        
                        $(".message-container-successAdmin .message").text("Tooling estimation deleted successfully");
                        $(".message-container-successAdmin").css("display", "grid");
                        $('#toolingSelectModal').css("display", "none");
                        $('#deleteToolingModal').css("display", "none");
                        setTimeout(function () { 
                            $(".message-container-successAdmin").css("display", "none");
                         },6000)
                    }else{
                        
                        $(".message-container-errorAdmin .message").text("An error has occurred");
                        $(".message-container-errorAdmin").css("display", "grid");
                        $('#deleteToolingModal').css("display", "grid");
                        setTimeout(function () { 
                            $(".message-container-errorAdmin").css("display", "none");
                         },6000)
                     }
                    }
             })
         })

    })


    $("#closeDeleteToolingModal").on("click", function() {
        $('#deleteToolingModal').css("display", "none");
    })

    $("#cancelToolingDelete").on("click", function(e){
        e.preventDefault();
        $("#deleteToolingModal").css("display", "none")
    })

    $("table").on("click", "#updateToolingBtn", function(){
        
        let row = $(this).closest('tr');
   
        let id= row.find('.tableQuanID').text();
        let invQual = row.find('.invQual').text();
        let invRep = row.find('.invRep').text();
        let expTool = row.find('.expTool').text();
        let supTool = row.find('.supTool').text();
        let supToolExp = row.find('.supToolExp').text();
        let deereTool = row.find('.deereTool').text();
        let deereToolExp = row.find('.deereToolExp').text();
        let returnCont = row.find('.returnCont').text();
       


        $('#invQual').val(invQual),
        $('#invRep').val(invRep),
         $('#expTool').val(expTool),
        $('#supTool').val(supTool),
        $('#supToolExp').val(supToolExp),
        $('#deereTool').val(deereTool),
        $('#deereToolExp').val(deereToolExp),
        $('#returnCont').val(returnCont),
     

         $("#toolingSelectModal").css("display", "none")
         $(".message-container-successAdmin .message").text("Tooling estimation loaded successfully");
         $(".message-container-successAdmin").css("display", "grid");
         $('#toolingSelectModal').css("display", "none");
            setTimeout(function () { 
            $(".message-container-successAdmin").css("display", "none");
            },6000)

    })
 })


 function loadToolingTable() {
    var toolingTable = ''
    var currPart = Cookies.get("currentPart")
    $.ajax({
        url: "/getTooling",
        method: "POST",
        data:{
            partNumber: currPart
        },
        success: function(response){
            $('#toolingTable tr').not(':first').remove();
            $.each(response, function (key, val) { 
                toolingTable += '<tr><td class="toolingID">' + val.id + '</td><td class="invQual">' + val.invQual+ '</td><td class="invRep">' + val.invRep+ '</td><td class="expTool">' + val.expTool+ '</td><td class="supTool">' + val.supTool+ '</td><td class="supToolExp">' + val.supToolExp+ '</td><td class="deereTool">' + val.deereTool+ '</td><td class="deereToolExp">' + val.deereToolExp+ '</td><td class="returnCont">' + val.returnCont+ '</td><td class="createDate">' + val.createDate+ '</td><td class="rowActions" id="rowActions"><button type="click" class="actionBtn"  id="deleteToolingBtn">Delete</button><button type="click"  class="actionBtn" id="updateToolingBtn">Load</button></td></tr>';
             })
             $('#toolingTable tr').first().after(toolingTable);
        }
    })
}