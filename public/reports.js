$(document).ready(function (){
    var parts = ""
    $.ajax({
        url: "/getPartsCompleted",
        method: "POST",
        success: function(response){
       
            if(response){
                $.each(response, function (key, val) { 
                    parts += "<option value='" + val.partNumber + "'>" + val.partNumber + "</option>";
                 })
    
                 $("#completedParts").html(parts + "<option value='' disabled selected hidden>Please select a part</option>");
            }
        }
    })
})

$(function (){

    $("#generateReport").on("click", function(){
        
        
        const fileName = $("#completedParts").val()

        $("#generateReports").validate({
            rules:{
                completedParts: {
                    required: true
                }
            },
            messages: {
                completedParts: {
                    required: "Please select a valid part number",
                }
            },
            submitHandler: function(){
                $.ajax({
                    url: '/getReport',
                    method: 'POST',
                    data: {
                        partNumber: $("#completedParts").val()
                    },
                    cache: false,
                    xhr: function () {
                        var xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 2) {
                                if (xhr.status == 200) {
                                    xhr.responseType = "blob";
                                } else {
                                    xhr.responseType = "text";
                                }
                            }
                        };
                        return xhr;
                    },
                    success: function (data) {
                        var blob = new Blob([data], { type: "application/pdf" });
                        var isIE = false || !!document.documentMode;
                        if (isIE) {
                            window.navigator.msSaveBlob(blob, fileName);
                        } else {
                            var url = window.URL || window.webkitURL;
                            link = url.createObjectURL(blob);
                            var a = $("<a />");
                            a.attr("download", fileName);
                            a.attr("href", link);
                            $("body").append(a);
                            a[0].click();
                            $("body").remove(a);
                        }
                    }
                });

            }   
        })  
        
    })
})
