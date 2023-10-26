$(document).ready(function () {
    var currPart = Cookies.get("currentPart")
    $.ajax({
        url: "/getNotes",
        method: "POST",
        data:{
            partNumber: currPart
        },
        success: function(response){
            $("#notes").val(response[0].note)
        }
    })
})

$(function () {  

    $('#selectNotesBtn').on("click", function () {
        $("#notesSelectModal").css("display", "grid")
        loadNotesTable()
    })

    $("#closeNotesModal").on("click", function (){
        $("#notesSelectModal").css("display", "none")
    })

    $("#saveNotesBtn").on("click", function (){

        var date = new Date
       var dateTimestamp=  date.toISOString().slice(0, 19).replace('T', ' ')
        var currPart = Cookies.get("currentPart")

        $("#notesForm").validate({
            rules:{
                notes: {
                    maxlength: 200
                }
            },
            messages: {
                notes: {
                    maxlength: "Note is limited to 200 characters",
                }
            },
            submitHandler: function(){
                $.ajax({
                    url: "/addNotes",
                    method: "POST",
                    data: {
                        notes: $("#notes").val(),
                        createDate: dateTimestamp,
                        partNumber: currPart
                    },
                    before: function (){
                        
                    },
                    success: function (response) {
                        if(response === 'ok'){
                            
                            $(".message-container-successAdmin .message").text("Note added successfully");
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

                $("#saveService").prop("disabled", false)
                $("#notesStep").css("background-color", "#367c2b")
                $("#notesStep").css("border", " 3px solid #367c2b")
            }
        })
    })
    


    $("table").on("click", "#deleteNotesBtn", function(){
        $('#deleteNotesModal').css("display", "grid");
        
        let row = $(this).closest('tr');
   
        let id= row.find('.tableNotesID').text();

        $("#confirmNoteDelete").on('click', function(){
            $.ajax({
                url: '/deleteNotes',
                method: 'POST',
                data:{
                    id: id
                },
                beforeSend: function(){
                    
                },
                success: function(response) {
                    if(response === 'ok'){
                        
                        $(".message-container-successAdmin .message").text("Note deleted successfully");
                        $(".message-container-successAdmin").css("display", "grid");
                        $('#notesSelectModal').css("display", "none");
                        $('#deleteNotesModal').css("display", "none");
                        setTimeout(function () { 
                            $(".message-container-successAdmin").css("display", "none");
                         },6000)
                    }else{
                        
                        $(".deleteUserModal").css('display', 'grid')
                        $(".message-container-errorAdmin .message").text("An error has occurred");
                        $(".message-container-errorAdmin").css("display", "grid");
                        $('#deleteNotesModal').css("display", "grid");
                        $('#notesSelectModal').css("display", "none");
                        setTimeout(function () { 
                            $(".message-container-errorAdmin").css("display", "none");
                         },6000)
                     }
                    }
             })
         })

    })


    $("table").on("click", "#updateNotesBtn", function(){
        
        let row = $(this).closest('tr');
   
        let id= row.find('.tableQuanID').text();
        let notes= row.find('.notes').text();
    


        $("#notes").val(notes)
  

         $("#notesSelectModal").css("display", "none")
         $(".message-container-successAdmin .message").text("Note loaded successfully");
         $(".message-container-successAdmin").css("display", "grid");
            setTimeout(function () { 
            $(".message-container-successAdmin").css("display", "none");
            },6000)

    })


    $("#closeDeleteNotesModal").on("click", function() {
        $('#deleteNotesModal').css("display", "none");
    })

    $("#cancelNotesDelete").on("click", function(e) {
        e.preventDefault();
        $('#deleteNotesModal').css("display", "none");
    })
    
})



function loadNotesTable() {
    var notesTable = ''
    var currPart = Cookies.get("currentPart")
    $.ajax({
        url: "/getNotes",
        method: "POST",
        data:{
            partNumber: currPart
        },
        success: function(response){
            $('#notesTable tr').not(':first').remove();
            $.each(response, function (key, val) { 
                notesTable += '<tr><td class="tableNotesID">' + val.id + '</td><td class="notes">' + val.note+ '</td><td class="createDate">' + val.createDate+ '</td><td class="rowActions" id="rowActions"><button type="click" class="actionBtn"  id="deleteNotesBtn">Delete</button><button type="click"  class="actionBtn" id="updateNotesBtn">Load</button></td></tr>';
             })
             $('#notesTable tr').first().after(notesTable);
        }
    })
}