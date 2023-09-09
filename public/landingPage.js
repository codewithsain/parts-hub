
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
    
                     $(".plantS").html(plants);
    
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
                    // console.log(response);
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
            
            let similarPart= ""
            let container = ""
            let user = ""
            let revision = ""
            let plant = ""

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
                     similarPart = response[0].similarPart;
                    container = response[0].containerID;
                    $("#netWeightU").val(response[0].netWeight)
                    $("#grossWeightU").val(response[0].grossWeight)
                    $("#termCodeU").val(response[0].termCode)
                    $("#termCodeDescU").val(response[0].termCodeDesc)
                     user = response[0].userID
                    revision = response[0].revisionID;
                    plant = response[0].plantID

                }
            })

            $("#similarPartU").val(similarPart)
            $("#containerU").val(container)
            $("#userU").val(user)
            $("#revisionU").val(revision)
            $("#plantU").val(plant)

            $(".updateBtn").on("click", function(){
                $("#updatePartForm").validate({
                    rules: {
                        partNumberU: "required",
                        descU: "required",
                        similarPartU: "required",
                        containerU: "required",
                        netWeightU: {
                            required: true,
                            number: true
                        },
                        grossWeightU: {
                            required: true,
                            number: true
                        },
                        termCodeU: "required",
                        termCodeDescU: "required",
                        userU: "required",
                        revisionU: "required",
                        plantU: "required"
                    },
                    messages:{
                        partNumberU: 'Please enter a part number',
                        descU: "Please enter a description",
                        similarPartU: "Please select a similar part",
                        containerU: "Please select a container",
                        netWeightU: {
                            required: "Please enter a net weigth",
                            number: "Only decimals numbers are allowed"
                        },
                        grossWeightU: {
                            required: "Please enter a net weigth",
                            number: "Only decimals numbers are allowed"
                        },
                        termCodeU: "Please enter a term code",
                        termCodeDescU: "Plese enter a description",
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
                            partNumber: $("#partNumberU").val().trim(),
                            description: $("#descU").val().trim(),
                            similarPart: $("#similarPartU").val().trim(),
                            container: $("#containerU").val().trim(),
                            netWeight: $("#netWeightU").val().trim(),
                            grossWeight: $("#grossWeightU").val().trim(),
                            termCode: $("#termCodeU").val().trim(),
                            termCodeDesc: $("#termCodeDescU").val().trim(),
                            user: $("#userU").val().trim(),
                            revision: $("#revisionU").val().trim(),
                            plant: $("#plantU").val().trim(),
                        }, 
                        beforeSend: function () { 
                            $(".loadingContainer").css("display", "grid")
                        },
                        success: function(response){
                            // console.log(response)
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
            console.log("sin parte")
        }else{
            console.log("con parte")
            $.ajax({
                url: "/getSpecificPart",
                method: 'POST',
                data:{
                    partNumber: $("#searchedPart").val()
                },
                success: function(response){
                    console.log(response.length)
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
           console.log(response)
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
            console.log(response)
            if(response.status === 'ok'){
                var numberOfParts = response.numberOfParts[0].numberOfParts;
                var partQuant = $("#numberOfParts").text(numberOfParts)
            }
         }
    })

 }