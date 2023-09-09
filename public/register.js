

$(function () { 

    $(".registerBtn").on("click", function(){
        $("#formRegister").validate({
            rules:{
                user:{
                    required: true,
                    maxlength: 7,
                    minlength: 7
                },
                name:{
                    required: true,
                    maxlength: 25,
                    minlength: 2
                },
                lastName:{
                    required: true,
                    maxlength: 25,
                    minlength: 2
                },
                position:{
                    required: true
                },
                email:{
                    required: true,
                    maxlength: 50,
                    email: true
                },
                password:{
                    required: true,
                    maxlength: 50,
                    minlength: 12
                },
                passwordConfirm:{
                    required: true,
                    maxlength: 50,
                    minlength: 12,
                    equalTo: "#password"
                }
            },
            messages:{
                user:{
                    required: "Please type a user",
                    maxlength: "Enter a 7 character user",
                    minlength: "Enter a 7 character user"
                },
                name:{
                    required: "Please type a name",
                    maxlength: "Name should have 25 characters max",
                    minlength: "Name should have 2 characters min"
                },
                lastName:{
                    required: "Please type a last name name",
                    maxlength: "Last name should have 25 characters max",
                    minlength: "Last name should have 2 characters min"
                },
                position:{
                    required: "Please choose a position"
                },
                email:{
                    required: "An email is required",
                    maxlength: "Email can't be longer than 50 characters",
                    email: "Please type a valid email"
                },
                password:{
                    required: "Password is required",
                    maxlength: "Password can't be longer than 50 characters",
                    minlength: "Password can't be shorter than 12 characters"
                },
                passwordConfirm:{
                    required: "Confirm password is required",
                    maxlength: "Confirm  password can't be longer than 50 characters",
                    minlength: "Confirm password can't be shorter than 12 characters",
                    equalTo: "Passwords are not equals"
                }
            },
            submitHandler: function() {
                $.ajax({
                    url: "/registerUser",
                    method: "POST",
                    data: {
                        user: $("#user").val(),
                        name: $("#name").val(),
                        lastName: $("#lastName").val(),
                        position: $("#position").val(),
                        email: $("#email").val(),
                        password: $("#password").val(),
                    },
                    success: function(response){
                        if(response === "userExist"){
                         
                            $("#user").after("<label class='error'>User ID exists</label>")
                        }else if (response === "emailExist"){
                            $("#email").after("<label class='error'>Email already registered</label>")
                        }else if(response === "undefined" || response != 'ok'){
                            $(".loadingContainer").css("display", "none")

                        $(".message-container-error .message").text("An error has ocurred");
                        $(".message-container-error").css("display", "grid");
                        setTimeout(function () { 
                            $(".message-container-error").css("display", "none");
                         },4000)
                        }else if(response === 'ok'){
                            $(".message-container-success .message").text("User registered successfully");
                            $(".message-container-success").css("display", "grid");
                            setTimeout(function () { 
                                $(".message-container-success").css("display", "none");
                             },4000)
                        }
                     },
                     error: function(response){
                        if(response === undefined || response != 'ok'){
                        $(".message-container-error .message").text("An error has ocurred");
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