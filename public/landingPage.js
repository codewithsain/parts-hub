
$(document).ready(function (){
    var isShowing = false;
    $(".dropdown-content").hide();
    $(".message-container-success").css("display", "none");
    $(".message-container-error").css("display", "none");
    $(".message-container-successDelete").css("display", "none");
    $(".message-container-successUpdate").css("display", "none");
    $(".message-container-noParts").css("display", "none");
    $(".deletePartModal").css('display', 'none')
    $(".addPartBtn").css("display", "none")
    $("#adminLink").css("display", "none")
    $(".headActions").css("display", "none")


    $.ajax({
    url: "/renderAdmin",
    method: 'POST',
    success: function (response) {
        if(response === true){           
            $(".addPartBtn").css("display", "block")
            $("#adminLink").css("display", "block")
            $(".headActions").css("display", "table-cell")
            Cookies.set("isAdmin", true);  
        }else{
            Cookies.set("isAdmin", false); 
            }
        }
    })
    
    loadTable();
    countParts();

 
    $(".dropdownName").text(Cookies.get("name") + " "+ Cookies.get("lastName") );
    $(".dropdownPos").text(Cookies.get("position"));
    $("#userName").text(Cookies.get("name"));


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

    $(".cancelBtn").on('click', function(e){
        e.preventDefault();
        $(".addPartModal").css("display", "none");
    })

    $(".partNumberI").mask('A00000');
    $(".termCodeI").mask('000000');
    $(".partSearch").mask('A00000');
    

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
            url: '/getUsersDropdown',
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
                $.each(response, function (key, val) { 
                    parts += "<option value='" + val.id + "'>" + val.partNumber + "</option>";
                 })

                 $("#similarPartS").html(parts + "<option value='' disabled selected hidden>Select a part</option>");

            }
        })
    });
    

    

    $("#savePartBtn").on('click', function () {
      
       $("#addPartForm").validate({
        rules: {
            partNumberI: {
                required: true,
                maxlength: 6,
                minlength: 6
            },
            descI: {
                required: true,
                maxlength: 25,
                minlength: 4
            },
            containerS: "required",
            netWeightI: {
                required: true,
                number: true,
                maxlength: 10,
                minlength: 1
            },
            grossWeightI: {
                required: true,
                number: true,
                maxlength: 10,
                minlength: 1
            },
            termCodeI: {
                required: true,
                maxlength: 6,
                minlength: 6
            },
            termCodeDescI: {
                required: true,
                maxlength: 25,
                minlength: 4
            },
            userS: "required",
            plantS: "required"
        },
        messages:{
            partNumberI: {
                required: "Please enter a valid part number",
                maxlength: "Please enter 6 characters",
                minlength: "Please enter 6 characters"
            },
            descI: {
                required: "Please enter a description",
                maxlength: "25 characters max",
                minlength: "Please enter at least 4 characters"
            },
            containerS: "Please select a container",
            netWeightI: {
                required: "Please enter a net weight",
                number: "Only decimals numbers are allowed",
                maxlength: "10 numbers max",
                minlength: "Please enter at least 1 number"
            },
            grossWeightI: {
                required: "Please enter a gross weight",
                number: "Only decimals numbers are allowed",
                maxlength: "10 numbers max",
                minlength: "Please enter at least 1 number"
            },
            termCodeI: {
                required: "Please enter a valid term code number",
                maxlength: "Please enter 6 numbers",
                minlength: "Please enter 6 numbers"
            },
            termCodeDescI: {
                required: "Please enter a term code description",
                maxlength: "25 characters max",
                minlength: "Please enter at least 4 characters"
            },
            userS: "Please select a user",
            plantS: "Please select a plant"
        },
        submitHandler: function(){
        
        $.ajax({
            url: "/addPart",
            method: 'POST',
            data: {
                partNumber: $("#partNumberI").val(),
                description: $("#descI").val(),
                similarPart: $("#similarPartS").val(),
                container: $("#containerS").val(),
                netWeight: $("#netWeightI").val(),
                grossWeight: $("#grossWeightI").val(),
                termCode: $("#termCodeI").val(),
                termCodeDesc: $("#termCodeDescI").val(),
                user: $("#userS").val(),
                revision: $("#revisionS").val(),
                plant: $("#plantS").val(),
            }, 
            beforeSend: function () { 
                $(".loadingContainer").css("display", "grid")
            },
            success: function(response){
                
                if(response === "partExist"){
                    $(".partNumberI").after("<label class='error'>Part already exists</label>")
                    $(".loadingContainer").css("display", "none");
                }else  if(response === undefined || response != 'ok'){
                    $(".loadingContainer").css("display", "none")
                $(".addPartModal").css("display", "none");
                $(".message-container-error").css("display", "grid");
                setTimeout(function () { 
                    $(".message-container-error").css("display", "none");
                 },4000)
                }else if(response === 'ok'){
                    $(".loadingContainer").css("display", "none")
                    $(".addPartModal").css("display", "none");
                    $(".message-container-success").css("display", "grid");
                    setTimeout(function () { 
                        $(".message-container-success").css("display", "none");
                     },4000)
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
                 },4000)
                }
                
            }
           })
        }
       
        })
        
       
      
    })

    $("#closeBtnDelete").on('click', function(){
        $(".deletePartModal").css('display', 'none')
    })

    $("#cancelBtnDelete").on('click', function(e){
        e.preventDefault();
        $(".deletePartModal").css('display', 'none')
    })

    
    

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
                     },4000)
                     
                     loadTable();
                    countParts();
                    $(".rowActions").css("display", "table-cell")
                }else{
                    $(".loadingContainer").css("display", "none")
                    $(".deletePartModal").css('display', 'grid')
                    $(".message-container-error").css("display", "grid");
                    setTimeout(function () { 
                        $(".message-container-error").css("display", "none");
                     },4000)
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

                 $("#plantU").html(plants +  
                    "<option value='' disabled selected hidden>Select a plant</option>");

            }
        })
        $.ajax({
            url: '/getUsers',
            method: 'POST',
            success: function(response){
                $.each(response, function (key, val) { 
                    users += "<option value='" + val.id + "'>" + val.user + "</option>";
                 })

                 $(".userS").html(users);

            }
        })
        $.ajax({
            url: '/getRevisions',
            method: 'POST',
            success: function(response){
                $.each(response, function (key, val) { 
                    revisions += "<option value='" + val.id + "'>" + val.value + "</option>";
                 })

                 $(".revisionS").html(revisions);
            }
        })
        $.ajax({
            url: '/getContainers',
            method: 'POST',
            success: function(response){
                $.each(response, function (key, val) { 
                    containers += "<option value='" + val.id + "'>" + val.containerDesc + "</option>";
                 })

                 $(".containerS").html(containers);

            }
        })
        $.ajax({
            url: '/getParts',
            method: 'POST',
            success: function(response){
         
                $.each(response, function (key, val) { 
                    parts += "<option value='" + val.id + "'>" + val.partNumber + "</option>";
                 })

                 $(".similarPartS").html(parts);

            }
        })
       
            $(".addPartModalUpdate").css("display", "grid");

            let row = $(this).closest('tr');

            let id= row.find('.tableID').text();

            $("#idPart").val(id);

            

            $.ajax({
                url:"/getPartsForUpdate",
                method: "POST",
                data: {
                    id: id
                },
                success: function(response){
                    
                    $("#partNumberU").val(response[0].partNumber)
                    
                    $("#descU").val(response[0].description)
                     
                     $("#similarPartU").val(response[0].similarPart)
                 
                     $("#containerU").val(response[0].container)
                    
                    $("#netWeightU").val(response[0].netWeight)
                    $("#grossWeightU").val(response[0].grossWeight)
                    $("#termCodeU").val(response[0].termCode)
                    $("#termCodeDescU").val(response[0].termCodeDesc)
                
                    $("#userU").val( response[0].userID)
                    $("#revisionU").val(response[0].revisionID)
                    $("#plantU").val( response[0].plantID)
                   
                }
            })


           

         

            $(".updateBtn").on("click", function(){
                $("#updatePartForm").validate({
                    rules: {
                        partNumberU: {
                            required: true,
                            maxlength: 6,
                            minlength: 6
                        },
                        descU: {
                            required: true,
                            maxlength: 25,
                            minlength: 4
                        },
                        
                        containerU: "required",
                        netWeightU: {
                            required: true,
                            number: true,
                            maxlength: 10,
                            minlength: 1
                        },
                        grossWeightU: {
                            required: true,
                            number: true,
                            maxlength: 10,
                            minlength: 1
                        },
                        termCodeU: {
                            required: true,
                            maxlength: 6,
                            minlength: 6
                        },
                        termCodeDescU: {
                            required: true,
                            maxlength: 25,
                            minlength: 4
                        },
                        userU: "required",
                        revisionU: "required",
                        plantU: "required"
                    },
                    messages:{
                        partNumberU: {
                            required: "Please enter a valid part number",
                            maxlength: "Please enter 6 characters",
                            minlength: "Please enter 6 characters"
                        },
                        descU: {
                            required: "Please enter a description",
                            maxlength: "25 characters max",
                            minlength: "Please enter at least 4 characters"
                        },
                       
                        containerU: "Please select a container",
                        netWeightU: {
                            required: "Please enter a net weight",
                            number: "Only decimals numbers are allowed",
                            maxlength: "10 numbers max",
                            minlength: "Please enter at least 1 number"
                        },
                        grossWeightU: {
                            required: "Please enter a gross weight",
                            number: "Only decimals numbers are allowed",
                            maxlength: "10 numbers max",
                            minlength: "Please enter at least 1 number"
                        },
                        termCodeU: {
                            required: "Please enter a valid term code number",
                            maxlength: "Please enter 6 numbers",
                            minlength: "Please enter 6 numbers"
                        },
                        termCodeDescU: {
                            required: "Please enter a term code description",
                            maxlength: "25 characters max",
                            minlength: "Please enter at least 4 characters"
                        },
                        userU: "Please select a user",
                        revisionU: "Please select a revision",
                        plantU: "Please select a plant"
                    },
                    submitHandler: function(){
                    $.ajax({
                        url: "/updatePart",
                        method: 'POST',
                        data: {
                            id: $("#idPart").val(),
                            partNumber: $("#partNumberU").val(),
                            description: $("#descU").val(),
                            similarPart: $("#similarPartU").val(),
                            container: $("#containerU").val(),
                            netWeight: $("#netWeightU").val(),
                            grossWeight: $("#grossWeightU").val(),
                            termCode: $("#termCodeU").val(),
                            termCodeDesc: $("#termCodeDescU").val(),
                            user: $("#userU").val(),
                            revision: $("#revisionU").val(),
                            plant: $("#plantU").val(),
                        }, 
                        beforeSend: function () { 
                            
                            $(".loadingContainer").css("display", "grid")
                        },
                        success: function(response){
                     
                             if(response === undefined || response != 'ok'){
                                $(".loadingContainer").css("display", "none")
                            $(".addPartModal").css("display", "none");
                            $(".message-container-error").css("display", "grid");
                            setTimeout(function () { 
                                $(".message-container-error").css("display", "none");
                             },4000)
                            }else if(response === 'ok'){
                                $(".loadingContainer").css("display", "none")
                                $(".addPartModalUpdate").css("display", "none");
                                $(".message-container-successUpdate").css("display", "grid");
                                setTimeout(function () { 
                                    $(".message-container-successUpdate").css("display", "none");
                                 },4000)
                                 $(".rowActions").css("display", "table-cell")
                                loadTable();
                                countParts();
                               
                            }
                        },
                        error: function(response){
                            if(response === undefined || response != 'ok'){
                                $(".loadingContainer").css("display", "none")
                            $(".addPartModalUpdate").css("display", "none");
                            $(".message-container-error").css("display", "grid");
                            setTimeout(function () { 
                                $(".message-container-error").css("display", "none");
                             },4000)
                            }
                            
                        }
                       })
                    }
                   
                    })
            })

            
       })
    

       $("#closeBtnUpdate").on("click", function(){
        $(".addPartModalUpdate").css("display", "none");
       })


     $(".searchBtn").on("click", function(){
       
        if($("#searchedPart").val() === ""){
            loadTable();
    
        }else{
         
            $.ajax({
                url: "/getSpecificPart",
                method: 'POST',
                data:{
                    partNumber: $("#searchedPart").val()
                },
                success: function(response){
                
                    var tableResults = "";
                    if(response.length <= 0){
                        $(".message-container-noParts").css("display", "grid");
                        setTimeout(function () { 
                            $(".message-container-noParts").css("display", "none");
                         },4000)
                    }else if(Cookies.get("isAdmin") === "true"){
                        $('#partsTable tr').not(':first').remove();
                        $.each(response, function (key, val) { 
                            tableResults += '<tr><td class="tableID">' + val.id + '</td><td id="partNumber"><a href="/partDetails/'+val.partNumber+'" id="linkPartDetails">'+val.partNumber+'</a></td><td id="description">' + val.description+ '</td><td id="termCode">' + val.termCode+ '</td><td id="netWeight">' + val.netWeight+ '</td><td id="grossWeight">' + val.grossWeight+ '</td><td class="rowActions" id="rowActions"><button type="click" class="actionBtn"  id="deleteBtn">Delete</button><button type="click"  class="actionBtn" id="updateBtn">Update</button></td></tr>';
                         })
            
                         $('#partsTable tr').first().after(tableResults);
                    }else if(Cookies.get("isAdmin") === "false"){
                        $('#partsTable tr').not(':first').remove();
                        $.each(response, function (key, val) { 
                            tableResults += '<tr><td class="tableID">' + val.id + '</td><td id="partNumber"><a href="/partDetails/'+val.partNumber+'" id="linkPartDetails">'+val.partNumber+'</a></td><td id="description">' + val.description+ '</td><td id="termCode">' + val.termCode+ '</td><td id="netWeight">' + val.netWeight+ '</td><td id="grossWeight">' + val.grossWeight+ '</td>';
                         })
            
                         $('#partsTable tr').first().after(tableResults);
                    }
                }
            })
        }
     })
    

     $('#updateModalClose').on("click", function(e){
        e.preventDefault();
        $(".addPartModalUpdate").css("display", "none")
     })
   

     
})




function loadTable() { 

    var tableResults = "";


    $.ajax({
        url: '/getPartsTable',
        method: 'POST',
        data:{
            userID: Cookies.get('userID')
        },
        success: function (response){
         
         if(Cookies.get("isAdmin") === "true"){
                $('#partsTable tr').not(':first').remove();
                $.each(response, function (key, val) { 
                    tableResults += '<tr><td class="tableID">' + val.id + '</td><td id="partNumber"><a href="/partDetails/'+val.partNumber+'" id="linkPartDetails">'+val.partNumber+'</a></td><td id="description">' + val.description+ '</td><td id="termCode">' + val.termCode+ '</td><td id="netWeight">' + val.netWeight+ '</td><td id="grossWeight">' + val.grossWeight+ '</td><td class="rowActions" id="rowActions"><button type="click" class="actionBtn"  id="deleteBtn">Delete</button><button type="click"  class="actionBtn" id="updateBtn">Update</button></td></tr>';
                 })
    
                 $('#partsTable tr').first().after(tableResults);
            }else if(Cookies.get("isAdmin") === "false"){
                $('#partsTable tr').not(':first').remove();
                $.each(response, function (key, val) { 
                    tableResults += '<tr><td class="tableID">' + val.id + '</td><td id="partNumber"><a href="/partDetails/'+val.partNumber+'" id="linkPartDetails">'+val.partNumber+'</a></td><td id="description">' + val.description+ '</td><td id="termCode">' + val.termCode+ '</td><td id="netWeight">' + val.netWeight+ '</td><td id="grossWeight">' + val.grossWeight+ '</td>';
                 })
    
                 $('#partsTable tr').first().after(tableResults);
            }
           
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
     
            if(response.status === 'ok'){
                var numberOfParts = response.numberOfParts[0].numberOfParts;
                var partQuant = $("#numberOfParts").text(numberOfParts)
            }
         }
    })

 }