$(document).ready(function () { 
    $.ajax({
        url: "/getProject",
        method: "POST",
        success: function(response){
            $("#ecm").text(response[0].ecm),
            $("#localEcm").text(response[0].localECM)
            $("#changeType").text(response[0].ecmChangeType)
            $("#teamName").text(response[0].teamName)
            $("#ecrNumber").text(response[0].ecrNumber)
        }
    })
 })