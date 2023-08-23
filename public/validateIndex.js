
$(document).ready(function(){
	let emailIsCorrect = false;
	let passwordIsCorrect = false;
	let captchaIsCorrect = false;
	$('.errorEmail').hide()
	$('.errorPassword').hide()
	$('.errorCaptcha').hide()

	$('#email').on({
		focus: function(){
			if (!isEmail($("#email").val().trim())){
				$('.errorEmail').show()
				return false;
		}else if(isEmail($("#email").val().trim())){
				$('.errorEmail').hide()
				emailIsCorrect = true;
				return false;
			}
		},
		blur: function(){
			if (!isEmail($("#email").val().trim())){
				$('.errorEmail').show()
				return false;
		}else if(isEmail($("#email").val().trim())){
				$('.errorEmail').hide()
				emailIsCorrect = true;
				return false;
			}
		}	
	})

	$('#password').on({
		focus: function(){
			if ($('#password').val().trim().length < 4){
				$('.errorPassword').show()
				return false;
		}else if($('#password').val().trim().length >= 4){
				$('.errorPassword').hide()
				passwordIsCorrect= true;
				return false;
			}
		},
		blur: function(){
			if ($('#password').val().trim().length < 4){
				$('.errorPassword').show()
				return false;
		}else if($('#password').val().trim().length  >= 4){
				$('.errorPassword').hide()
				passwordIsCorrect= true;
				return false;
			}
		}	
	})
	
	$('#captchaInput').on({
		focus: function(){
			if ($('#captchaInput').val().trim().length !== 7){
				$('.errorCaptcha').show()
				return false;
		}else if($('#captchaInput').val().trim().length === 7){
				$('.errorCaptcha').hide()
				captchaIsCorrect = true;
				return false;
			}
		},
		blur: function(){
			if ($('#captchaInput').val().trim().length !== 7){
				$('.errorCaptcha').show()
				return false;
		}else if($('#captchaInput').val().trim().length  === 7){
				$('.errorCaptcha').hide()
				captchaIsCorrect = true;
				return false;
			}
		}	
	})

	
	
})



function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}


