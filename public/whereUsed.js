$(document).ready(function () {  
    $.ajax({
        url: "/getWhereUsed",
        method: "post",
        success: function (response) { 
            var whereUsedTable = ""
            $('#whereUsedTable tr').not(':first').remove();
            $.each(response, function (key, val) { 
                whereUsedTable += '<tr><td>' + val.plant + '</td><td>' + val.Supplier+ '</td><td>' + val.termCode+ '</td><td>' + val.termCodeDesc+ '</td><td>' + val.globalEAU+ '</td><td>' + val.tic+ '</td>';
             })
             $('#whereUsedTable tr').first().after(whereUsedTable);
         }
    })
})