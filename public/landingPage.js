
$(document).ready(function (){
    var isShowing = false;
    $(".dropdown-content").hide();
    $(".message-container-success").css("display", "none");
    $(".message-container-error").css("display", "none");
    $(".message-container-successDelete").css("display", "none");
    $(".deletePartModal").css('display', 'none')
    

    $(".dropdown").on('click', function (){
    
        if (isShowing === false){
            $(".dropdown-content").show();
            isShowing = true
        }else if( isShowing === true){
            $(".dropdown-content").hide();
            isShowing = false
        }
        
    })


    $(".addPartBtn").on('click', function(){
        $(".addPartModal").css("display", "grid")

    })

    $(".close").on('click', function(){
        $(".addPartModal").css("display", "none")
        $(".error").css('display', 'none');
    })

    $(".cancelBtn").on('click', function(){
        $(".addPartModal").css("display", "none");
    })

    $(".partNumberI").mask('A00000');
    $(".termCodeI").mask('000000');
    

    $(".addPartBtn").on("click", function (){
        var plants = "";
        var users = "";
        var revisions = "";
        var containers= "";
        var parts = "";
        $.ajax({
            url: '/getPlants',
            method: 'POST',
            success: function(response){
                $.each(response, function (key, val) { 
                    plants += "<option value='" + val.id + "'>" + val.plant + "</option>";
                 })

                 $("#plantS").html(plants + "<option value='' disabled selected hidden>Select a plant</option>");

            }
        })
        $.ajax({
            url: '/getUsers',
            method: 'POST',
            success: function(response){
                $.each(response, function (key, val) { 
                    users += "<option value='" + val.id + "'>" + val.user + "</option>";
                 })

                 $("#userS").html(users + "<option value='' disabled selected hidden>Select a user</option>");

            }
        })
        $.ajax({
            url: '/getRevisions',
            method: 'POST',
            success: function(response){
                $.each(response, function (key, val) { 
                    revisions += "<option value='" + val.id + "'>" + val.value + "</option>";
                 })

                 $("#revisionS").html(revisions + "<option value='' disabled selected hidden>Select a revision</option>");
            }
        })
        $.ajax({
            url: '/getContainers',
            method: 'POST',
            success: function(response){
                $.each(response, function (key, val) { 
                    containers += "<option value='" + val.id + "'>" + val.containerDesc + "</option>";
                 })

                 $("#containerS").html(containers + "<option value='' disabled selected hidden>Select a container</option>");

            }
        })
        $.ajax({
            url: '/getParts',
            method: 'POST',
            success: function(response){
                // console.log(response);
                $.each(response, function (key, val) { 
                    parts += "<option value='" + val.id + "'>" + val.partNumber + "</option>";
                 })

                 $("#similarPartS").html(parts + "<option value='' disabled selected hidden>Select a part</option>");

            }
        })
    });
    

    

    $(".saveBtn").on('click', function () {
      
       $("#addPartForm").validate({
        rules: {
            partNumberI: "required",
            descI: "required",
            similarPartS: "required",
            containerS: "required",
            netWeightI: {
                required: true,
                number: true
            },
            grossWeightI: {
                required: true,
                number: true
            },
            termCodeI: "required",
            termCodeDescI: "required",
            userS: "required",
            revisionS: "required",
            plantS: "required"
        },
        messages:{
            partNumberI: 'Please enter a part number',
            descI: "Please enter a description",
            similarPartS: "Please select a similar part",
            containerS: "Please select a container",
            netWeightI: {
                required: "Please enter a net weigth",
                number: "Only decimals numbers are allowed"
            },
            grossWeightI: {
                required: "Please enter a net weigth",
                number: "Only decimals numbers are allowed"
            },
            termCodeI: "Please enter a term code",
            termCodeDescI: "Plese enter a description",
            userS: "Please select a user",
            revisionS: "Please select a revision",
            plantS: "Please select a plant"
        },
        submitHandler: function(){
        $.ajax({
            url: "/addPart",
            method: 'POST',
            data: {
                partNumber: $("#partNumberI").val().trim(),
                description: $("#descI").val().trim(),
                similarPart: $("#similarPartS").val().trim(),
                container: $("#containerS").val().trim(),
                netWeight: $("#netWeightI").val().trim(),
                grossWeight: $("#grossWeightI").val().trim(),
                termCode: $("#termCodeI").val().trim(),
                termCodeDesc: $("#termCodeDescI").val().trim(),
                user: $("#userS").val().trim(),
                revision: $("#revisionS").val().trim(),
                plant: $("#plantS").val().trim(),

            }, 
            beforeSend: function () { 
                $(".loadingContainer").css("display", "grid")
            },
            success: function(response){
                // console.log(response)
                if(response === "partExist"){
                    $(".partNumberI").after("<label class='error'>Part already exists</label>")
                    $(".loadingContainer").css("display", "none");
                }else  if(response === undefined || response != 'ok'){
                    $(".loadingContainer").css("display", "none")
                $(".addPartModal").css("display", "none");
                $(".message-container-error").css("display", "grid");
                setTimeout(function () { 
                    $(".message-container-error").css("display", "none");
                 },2000)
                }else if(response === 'ok'){
                    $(".loadingContainer").css("display", "none")
                    $(".addPartModal").css("display", "none");
                    $(".message-container-success").css("display", "grid");
                    setTimeout(function () { 
                        $(".message-container-success").css("display", "none");
                     },2000)
                     loadTable();
                    countParts();
                }
            },
            error: function(response){
                if(response === undefined || response != 'ok'){
                    $(".loadingContainer").css("display", "none")
                $(".addPartModal").css("display", "none");
                $(".message-container-error").css("display", "grid");
                setTimeout(function () { 
                    $(".message-container-error").css("display", "none");
                 },2000)
                }
                
            }
           })
        }
       
        })
        
       
      
    })

    $("#closeBtnDelete").on('click', function(){
        $(".deletePartModal").css('display', 'none')
    })

    $("#cancelBtnDelete").on('click', function(){
        $(".deletePartModal").css('display', 'none')
    })

    
    loadTable();
    countParts();

   $("table").on("click", '#deleteBtn', function(){
     $(".deletePartModal").css('display', 'grid')

        let row = $(this).closest('tr');

        let id= row.find('.tableID').text();

    
     $(".confirmDelete").on('click', function(){
        $.ajax({
            url: '/deletePart',
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
                    $(".deletePartModal").css('display', 'none')
                    $(".message-container-successDelete").css("display", "grid");
                    setTimeout(function () { 
                        $(".message-container-successDelete").css("display", "none");
                     },2000)
                     
                     countParts();
                }else{
                    $(".loadingContainer").css("display", "none")
                    $(".deletePartModal").css('display', 'grid')
                    $(".message-container-error").css("display", "grid");
                    setTimeout(function () { 
                        $(".message-container-error").css("display", "none");
                     },2000)
                 }
                }
         })
        })

    })

    

    $("table").on("click", '#updateBtn', function(){
        var plants = "";
            var users = "";
            var revisions = "";
            var containers= "";
            var parts = "";
            $.ajax({
                url: '/getPlants',
                method: 'POST',
                success: function(response){
                    $.each(response, function (key, val) { 
                        plants += "<option value='" + val.id + "'>" + val.plant + "</option>";
                     })
    
                     $(".plantS").html(plants + "<option value='' disabled selected hidden>Select a plant</option>");
    
                }
            })
            $.ajax({
                url: '/getUsers',
                method: 'POST',
                success: function(response){
                    $.each(response, function (key, val) { 
                        users += "<option value='" + val.id + "'>" + val.user + "</option>";
                     })
    
                     $(".userS").html(users + "<option value='' disabled selected hidden>Select a user</option>");
    
                }
            })
            $.ajax({
                url: '/getRevisions',
                method: 'POST',
                success: function(response){
                    $.each(response, function (key, val) { 
                        revisions += "<option value='" + val.id + "'>" + val.value + "</option>";
                     })
    
                     $(".revisionS").html(revisions + "<option value='' disabled selected hidden>Select a revision</option>");
                }
            })
            $.ajax({
                url: '/getContainers',
                method: 'POST',
                success: function(response){
                    $.each(response, function (key, val) { 
                        containers += "<option value='" + val.id + "'>" + val.containerDesc + "</option>";
                     })
    
                     $(".containerS").html(containers + "<option value='' disabled selected hidden>Select a container</option>");
    
                }
            })
            $.ajax({
                url: '/getParts',
                method: 'POST',
                success: function(response){
                    // console.log(response);
                    $.each(response, function (key, val) { 
                        parts += "<option value='" + val.id + "'>" + val.partNumber + "</option>";
                     })
    
                     $(".similarPartS").html(parts + "<option value='' disabled selected hidden>Select a part</option>");
    
                }
            })

            $(".addPartModalUpdate").css("display", "grid");

            let row = $(this).closest('tr');

            let id= row.find('.tableID').text();

            $.ajax({
                url:"/getPartsForUpdate",
                method: "POST",
                data: {
                    id: id
                },
                success: function(response){
                    console.log(response[0].partNumber);
                    $("#partNumberU").val(response[0].partNumber)
                    $("#descU").val(response[0].description)
                    $("#similarPartU").val(response[0].similarPart)
                    $("#containerU").val(response[0].containerID)
                    $("#netWeightU").val(response[0].netWeight)
                    $("#grossWeightU").val(response[0].grossWeight)
                    $("#termCodeU").val(response[0].termCode)
                    $("#termCodeDescU").val(response[0].termCodeDesc)
                    $("#userU").val(response[0].userID)
                    $("#revisionU").val(response[0].revisionID)
                    $("#plantU").val(response[0].plantID)

                }
            })

            
       })
    

       $("#closeBtnUpdate"). on("click", function(){
        $(".addPartModalUpdate").css("display", "none");
       })
})

function loadTable() { 
    var tableResults = '';
    var userID = '';

    $.ajax({
        url: "/getUserID",
        method: "POST",
        success: function (response) { 
            Cookies.set('currentUser', response);
            console.log(response)
         }
    })

    $.ajax({
        url: '/getPartsTable',
        method: 'POST',
        data:{
            userID: Cookies.get('currentUser')
        },
        success: function (response){
            $('#partsTable tr').not(':first').not(':last').remove();
            $.each(response, function (key, val) { 
                tableResults += '<tr><td class="tableID">' + val.id + '</td><td>' + val.partNumber+ '</td><td>' + val.description+ '</td><td>' + val.termCode+ '</td><td>' + val.netWeight+ '</td><td>' + val.grossWeight+ '</td><td><button type="click" class="actionBtn"  id="deleteBtn">Delete</button><button type="click"  class="actionBtn" id="updateBtn">Update</button></td></tr>';
             })

             console.log(tableResults)
             $('#partsTable tr').first().after(tableResults);
        }

    })
 }

 function countParts (){
    $.ajax({
        url: "/getNumberOfParts",
        method: 'POST',
        beforeSend: function(){
            $("#numberOfParts").text("Loading...")
        },
        success: function (response) { 
            console.log(response)
            if(response.status === 'ok'){
                var numberOfParts = response.numberOfParts[0].numberOfParts;
                var partQuant = $("#numberOfParts").text(numberOfParts)
            }
         }
    })

 }