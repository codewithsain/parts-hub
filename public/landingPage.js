$(document).ready(function (){

    var isShowing = false;
    $(".dropdown-content").hide();

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
    })

    $(".cancelBtn").on('click', function(){
        $(".addPartModal").css("display", "none")
    })

    $(".partNumberI").mask('A00000');
    $(".termCodeI").mask('00-00-00');

})