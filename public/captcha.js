$(function(){

    
        $.ajax({ url: "/",
            success: function(){
                chars = "1234567890ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz";
                captcha = chars[Math.floor(Math.random() * chars.length)];
                    for (var i = 0; i < 6; i++) {
                captcha = captcha + chars[Math.floor(Math.random() * chars.length)];
                     }
             $('#captchaText').val(captcha);
            console.log(captcha);
            }
        });
    
    
})
