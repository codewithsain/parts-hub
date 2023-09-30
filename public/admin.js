$(document).ready(function (){
   
    $(".message-container-successAdmin").css("display", "none");
    $(".message-container-errorAdmin").css("display", "none");
    $(".addUserModal").css("display", "none");

     //USERS MODULE
    loadUserTable();

   

    //FF MODULE
    loadFlagTable();

  
  
})

$(function () {
    $("#addUserBtn").on("click", function(){
        $(".addUserModal").css("display", "grid");
    })

    $("#closeUserModal").on("click", function(){
        $(".addUserModal").css("display", "none");
    })

    $("#saveBtnUser").on("click", function(){
        $("#addUserForm").validate({
            rules:{
                newUser: {
                    required: true,
                    maxlength: 7,
                    minlength: 7
                },
                role: "required",
                confirmPassword: {
                    required: true,
                    equalTo: "#password",
                    maxlength: 25,
                    minlength: 12
                },
                name: {
                    required: true,
                    maxlength: 25,
                    minlength: 2
                },
                position: "required",
                lastName: {
                    required: true,
                    maxlength: 25,
                    minlength: 2
                },
                password: {
                    required: true,
                    maxlength: 25,
                    minlength: 12
                },
                email:{
                    required: true,
                    email: true,
                    maxlength: 100,
                }
            },
            messages:{
                newUser: {
                    required: "Please enter a valid user",
                    maxlength: "Please enter a 7 character user",
                    minlength: "Please enter a 7 character user"
                },
                role: "Please select a role",
                confirmPassword: {
                    required: "Confirm password",
                    equalTo: "Passwords don't match",
                    maxlength: "25 characters max",
                    minlength: "12 characters min"
                },
                name: {
                    required: "Please enter a name",
                    maxlength: "25 characters max",
                    minlength: "2 characters min"
                },
                position: "Please select a position",
                lastName: {
                    required: "Please enter a last name",
                    maxlength: "25 characters max",
                    minlength: "2 characters min"
                },
                password: {
                    required: "Please enter a password",
                    maxlength: "25 characters max",
                    minlength: "12 characters min"
                },
                email:{
                    required: "Please enter an email",
                    email: "Please enter a valid email",
                    maxlength: "100 characters max",
                }
            },
            submitHandler: function(){
                $.ajax({
                    url:"/addUser",
                    method: "POST",
                    data:{
                        user: $("#newUser").val(),
                        role: $("#role").val().trim(),
                        name: $("#name").val().trim(),
                        position: $("#position").val().trim(),
                        password: $("#confirmPassword").val().trim(),
                        lastName: $("#lastName").val().trim(),
                        email: $("#email").val().trim(),
                    },
                    beforeSend: function(){
                        $(".loadingContainer").css("display", "grid")
                    },
                    success: function (response) {                 
                        if(response === "userExist"){
                         
                            $("#newUser").after("<label class='error'>User ID exists</label>")
                            $(".loadingContainer").css("display", "none");
                        }else if (response === "emailExist"){
                            $("#email").after("<label class='error'>Email already registered</label>")
                            $(".loadingContainer").css("display", "none");
                        }else if(response === "undefined" || response != 'ok'){
                            $(".loadingContainer").css("display", "none")
                        $(".addPartModal").css("display", "none");
                        $(".message-container-errorAdmin .message").text("An error has ocurred");
                        $(".message-container-error").css("display", "grid");
                        setTimeout(function () { 
                            $(".message-container-errorAdmin").css("display", "none");
                         },4000)
                        }else if(response === 'ok'){
                            $(".loadingContainer").css("display", "none")
                            $(".addUserModal").css("display", "none");
                            $(".message-container-successAdmin .message").text("User added successfully");
                            $(".message-container-successAdmin").css("display", "grid");
                            setTimeout(function () { 
                                $(".message-container-successAdmin").css("display", "none");
                             },4000)
                             loadUserTable();
                        }
                     },
                     error: function(response){
                        if(response === undefined || response != 'ok'){
                        $(".loadingContainer").css("display", "none")
                        $(".addUserModal").css("display", "none");
                        $(".message-container-errorAdmin .message").text("An error has ocurred");
                        $(".message-container-errorAdmin").css("display", "grid");
                        setTimeout(function () { 
                            $(".message-container-error").css("display", "none");
                         },4000)
                        }
                        
                    }
                })
            }
        })
    })

    $("#cancelBtnUser").on("click", function(e){
        e.preventDefault();
        $(".addUserModal").css("display", "none")
    })  


    $("table").on("click", '#deleteUserBtn', function(){
        $(".deleteUserModal").css('display', 'grid')
   
           let row = $(this).closest('tr');
   
           let id= row.find('.tableUserID').text();
       
        $("#confirmUserDelete").on('click', function(){
           $.ajax({
               url: '/deleteUser',
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
                       $(".message-container-successAdmin .message").text("User deleted successfully");
                       $(".message-container-successAdmin").css("display", "grid");
                       setTimeout(function () { 
                           $(".message-container-successAdmin").css("display", "none");
                        },4000)
                        
                        loadUserTable();
                   }else{
                       $(".loadingContainer").css("display", "none")
                       $(".deleteUserModal").css('display', 'grid')
                       $(".message-container-errorAdmin .message").text("An error has occurred");
                       $(".message-container-errorAdmin").css("display", "grid");
                       setTimeout(function () { 
                           $(".message-container-errorAdmin").css("display", "none");
                        },4000)
                    }
                   }
            })
           })
   
       })

    $("#closeBtnUserDelete").on("click", function(){
        $(".deleteUserModal").css("display", "none")
    })

    $("#cancelBtnUserDelete").on("click", function(e){
        e.preventDefault();
        $(".deleteUserModal").css("display", "none")
    })

    $("table").on("click", '#updateUserBtn', function(){
        $(".updateUserModal").css('display', 'grid')

        let row = ""
        var id= ""
        let user= ""
        let name= ""
        let lastName= ""
        let role= ""
        let position = ""
        let email = ""

           
            row = $(this).closest('tr');
        
   
            id= row.find('.tableUserID').text();
           user= row.find('.tableUser').text();
            name= row.find('.tableName').text();
            lastName= row.find('.tableLastName').text();
           role= row.find('.tableRole').text();
            position = row.find('.tablePosition').text();
            email = row.find('.tableEmail').text();
         

            $("#idUserUpdate").val(id);
           $("#newUserU").val(user);
           $("#roleU").val(role);
           $("#nameU").val(name);
           $("#positionU").val(position);
           $("#lastNameU").val(lastName);
           $("#emailU").val(email);

        $("#updateUserConfirmBtn").on('click', function(){
            $("#updateUserForm").validate({
                rules:{
                    newUser: {
                        required: true,
                        maxlength: 7,
                        minlength: 7
                    },
                    role: "required",
                    confirmPassword: {
                        required: true,
                        equalTo: "#password",
                        maxlength: 25,
                        minlength: 12
                    },
                    name: {
                        required: true,
                        maxlength: 25,
                        minlength: 2
                    },
                    position: "required",
                    lastName: {
                        required: true,
                        maxlength: 25,
                        minlength: 2
                    },
                    password: {
                        required: true,
                        maxlength: 25,
                        minlength: 12
                    },
                    email:{
                        required: true,
                        email: true,
                        maxlength: 100,
                    }
                },
                messages:{
                    newUser: {
                        required: "Please enter a valid user",
                        maxlength: "Please enter a 7 character user",
                        minlength: "Please enter a 7 character user"
                    },
                    role: "Please select a role",
                    confirmPassword: {
                        required: "Confirm password",
                        equalTo: "Passwords don't match",
                        maxlength: "25 characters max",
                        minlength: "12 characters min"
                    },
                    name: {
                        required: "Please enter a name",
                        maxlength: "25 characters max",
                        minlength: "2 characters min"
                    },
                    position: "Please select a position",
                    lastName: {
                        required: "Please enter a last name",
                        maxlength: "25 characters max",
                        minlength: "2 characters min"
                    },
                    password: {
                        required: "Please enter a password",
                        maxlength: "25 characters max",
                        minlength: "12 characters min"
                    },
                    email:{
                        required: "Please enter an email",
                        email: "Please enter a valid email",
                        maxlength: "100 characters max",
                    }
                },
                submitHandler: function(){
                    $.ajax({
                        url:"/updateUser/" + $("#idUserUpdate").val(id),
                        method: "PUT",
                        data:{
                            user: $("#newUserU").val(),
                            role: $("#roleU").val().trim(),
                            name: $("#nameU").val().trim(),
                            position: $("#positionU").val().trim(),
                            lastName: $("#lastNameU").val().trim(),
                            email: $("#emailU").val().trim(),
                        },
                        beforeSend: function(){
                            $(".loadingContainer").css("display", "grid")
                            console.log(id);
                        },
                        success: function (response) {     
                            console.log(response)            
                            if(response === "userExist"){
                                $("#newUserU").after("<label class='error'>User ID exists</label>")
                                $(".loadingContainer").css("display", "none");
                            }else if (response === "emailExist"){
                                $("#emailU").after("<label class='error'>Email already registered</label>")
                                $(".loadingContainer").css("display", "none");
                            }else if(response === "undefined" || response != 'ok'){
                                $(".loadingContainer").css("display", "none")
                            $(".addPartModal").css("display", "none");
                            $(".message-container-errorAdmin .message").text("An error has ocurred");
                            $(".message-container-error").css("display", "grid");
                            setTimeout(function () { 
                                $(".message-container-errorAdmin").css("display", "none");
                             },4000)
                            }else if(response === 'ok'){
                                $(".loadingContainer").css("display", "none")
                                $(".updateUserModal").css("display", "none");
                                $(".message-container-successAdmin .message").text("User updated successfully");
                                $(".message-container-successAdmin").css("display", "grid");
                                setTimeout(function () { 
                                    $(".message-container-successAdmin").css("display", "none");
                                 },4000)
                                 loadUserTable();
                                
                            }
                         },
                         error: function(response){
                            if(response === undefined || response != 'ok'){
                            $(".loadingContainer").css("display", "none")
                            $(".updateUserModal").css("display", "none");
                            $(".message-container-errorAdmin .message").text("An error has ocurred");
                            $(".message-container-errorAdmin").css("display", "grid");
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

    $("#closeUpdateUserModal").on("click", function () {
        $(".updateUserModal").css("display", "none")
    })

    $("#cancelBtnUpdateUser").on("click", function (e) {
        e.preventDefault();
        $(".updateUserModal").css("display", "none")
    })

    $("#addFlagBtn").on("click", function(){
        $(".addFlagModal").css("display", "grid");
    })

    $("#closeFlagModal").on("click", function(){
        $(".addFlagModal").css("display", "none");
    })

    $("#saveFlagBtn").on("click", function(){
        $("#addFlagForm").validate({
            rules:{
                nameFF: {
                    required: true,
                    maxlength: 25,
                    minlength: 2
                },
                cookieFF: {
                    required: true,
                    maxlength: 25,
                    minlength: 2
                },
                valueFF:"required"
            },
            submitHandler: function(){
                $.ajax({
                    url:"/addFlag",
                    method: "POST",
                    data:{
                        name: $("#nameFF").val(),
                        cookie: $("#cookieFF").val(),
                        value: $("#valueFF").val(),
                    },
                    beforeSend: function(){
                        $(".loadingContainer").css("display", "grid")
                    },
                    success: function (response) {                 
                        if(response === "undefined" || response != 'ok'){
                        $(".loadingContainer").css("display", "none")
                        $(".addFlagModal").css("display", "none");
                        $(".message-container-errorAdmin .message").text("An error has ocurred");
                        $(".message-container-error").css("display", "grid");
                        setTimeout(function () { 
                            $(".message-container-errorAdmin").css("display", "none");
                         },4000)
                        }else if(response === 'ok'){
                            $(".loadingContainer").css("display", "none")
                            $(".addFlagModal").css("display", "none");
                            $(".message-container-successAdmin .message").text("Flag added successfully");
                            $(".message-container-successAdmin").css("display", "grid");
                            setTimeout(function () { 
                                $(".message-container-successAdmin").css("display", "none");
                             },4000)
                             loadFlagTable();
                        }
                     },
                     error: function(response){
                        if(response === undefined || response != 'ok'){
                        $(".loadingContainer").css("display", "none")
                        $(".addFlagModal").css("display", "none");
                        $(".message-container-errorAdmin .message").text("An error has ocurred");
                        $(".message-container-errorAdmin").css("display", "grid");
                        setTimeout(function () { 
                            $(".message-container-error").css("display", "none");
                         },4000)
                        }
                        
                    }
                })
            }
        })
    })
    
    $("#cancelFlagBtn").on("click", function(e){
        e.preventDefault();
        $(".addFlagModal").css("display", "none")
    }) 

    
    $("table").on("click", '#deleteFlagBtn', function(){
        $(".deleteFlagModal").css('display', 'grid')
   
           let row = $(this).closest('tr');
   
           let id= row.find('.tableFlagID').text();
       
        $("#confirmFlagDelete").on('click', function(){
           $.ajax({
               url: '/deleteFlag',
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
                       $(".deleteFlagModal").css('display', 'none')
                       $(".message-container-successAdmin .message").text("Flag deleted successfully");
                       $(".message-container-successAdmin").css("display", "grid");
                       setTimeout(function () { 
                           $(".message-container-successAdmin").css("display", "none");
                        },4000)
                        
                        loadFlagTable();
                   }else{
                       $(".loadingContainer").css("display", "none")
                       $(".deleteFlagModal").css('display', 'grid')
                       $(".message-container-errorAdmin .message").text("An error has occurred");
                       $(".message-container-errorAdmin").css("display", "grid");
                       setTimeout(function () { 
                           $(".message-container-errorAdmin").css("display", "none");
                        },4000)
                    }
                   }
            })
           })
   
       })
   
    $("#closeDeleteFlagModal").on("click", function(){
        $(".deleteFlagModal").css("display", "none")
    })

    $("#cancelBtnFlagDelete").on("click", function(e){
        e.preventDefault();
        $(".deleteFlagModal").css("display", "none")
    })

    $("table").on("click", '#updateFlagBtn', function(){
        $(".updateFlagModal").css('display', 'grid')
        
        let row = $(this).closest("tr");

        let id = row.find(".tableFlagID").text();
        let name = row.find(".tableName").text();
        let cookie = row.find(".tableCookie").text();
        let value = row.find(".tableValue").text();
      
    $("#idFFU").val(id)
    $("#nameFFU").val(name);
    $("#cookieFFU").val(cookie);
    $("#valueFFU").val(value);

    
            $("#updateFlagBtnConfirm").on("click", function (){
              
                $("#updateFlagForm").validate({
                    rules:{
                        nameFFU: {
                            required: true,
                            maxlength: 25,
                            minlength: 2
                        },
                        cookieFFU: {
                            required: true,
                            maxlength: 25,
                            minlength: 2
                        },
                        valueFFU:"required"
                    },
                    submitHandler: function(){
                        $.ajax({
                            url:"/updateFlag/" + $("#idFFU").val(),
                            method: "PUT",
                            data:{
                               name: $("#nameFFU").val(),
                               cookie: $("#cookieFFU").val(),
                               value: $("#valueFFU").val()
                            },
                            beforeSend: function(){
                                $(".loadingContainer").css("display", "grid")
                                
                            },
                            success: function (response) {        
                                if(response === "undefined" || response != 'ok'){
                                $(".loadingContainer").css("display", "none")
                                $(".updateFlagModal").css("display", "none");
                                $(".message-container-errorAdmin .message").text("An error has ocurred");
                                $(".message-container-error").css("display", "grid");
                                setTimeout(function () { 
                                    $(".message-container-errorAdmin").css("display", "none");
                                 },4000)
                                }else if(response === 'ok'){
                                    $(".loadingContainer").css("display", "none")
                                    $(".updateFlagModal").css("display", "none");
                                    $(".message-container-successAdmin .message").text("Flag updated successfully");
                                    $(".message-container-successAdmin").css("display", "grid");
                                    setTimeout(function () { 
                                        $(".message-container-successAdmin").css("display", "none");
                                     },4000)
                                     console.log("valor despues de mandarse pero antes de haber cargado la tabla", $("#idFlag").val(id))
                                    loadFlagTable();
                                    console.log("valor despues de mandar y haber cargado la tabla", $("#idFlag").val(id))
                                    
                                }
                             }
                            
                        })
                    }
                })
            })
            
        
   
    })

    $("#closeUpdateFlagModal").on("click", function () {
        $(".updateFlagModal").css("display", "none")
    })

    $("#cancelUpdateFlagBtn").on("click", function (e) {
        e.preventDefault();
        $(".updateFlagModal").css("display", "none")
    })
})

function loadUserTable(){
    var userTable = ''
    $.ajax({
        url: "/getUsers",
        method: "POST",
        success: function(response){
            $('#usersTable tr').not(':first').remove();
            $.each(response, function (key, val) { 
                userTable += '<tr><td class="tableUserID">' + val.id + '</td><td class="tableUser">' + val.user+ '</td><td class="tableName">' + val.name+ '</td><td class="tableLastName">' + val.lastName+ '</td><td class="tablePosition">' + val.position+ '</td><td class="tableRole">' + val.role+ '</td><td class="tableEmail">' + val.email+ '</td><td class="rowActions" id="rowActions"><button type="click" class="actionBtn"  id="deleteUserBtn">Delete</button><button type="click"  class="actionBtn" id="updateUserBtn">Update</button></td></tr>';
             })
             $('#usersTable tr').first().after(userTable);
        }
    })

}

function loadFlagTable(){
    var flagTable = ''
    $.ajax({
        url: "/getFlags",
        method: "POST",
        success: function(response){
            $('#ffTable tr').not(':first').remove();
            $.each(response, function (key, val) { 
                flagTable += '<tr><td class="tableFlagID">' + val.id + '</td><td class="tableName">' + val.name+ '</td><td class="tableCookie">' + val.cookie+ '</td><td class="tableValue">' + val.value+ '</td><td class="rowActions" id="rowActions"><button type="click" class="actionBtn"  id="deleteFlagBtn">Delete</button><button type="click"  class="actionBtn" id="updateFlagBtn">Update</button></td></tr>';
             })
             $('#ffTable tr').first().after(flagTable);
        }
    })
}