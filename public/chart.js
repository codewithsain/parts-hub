$(document).ready(function (){
    var parts = ""
    $.ajax({
        url: '/getParts',
        method: 'POST',
        success: function(response){
            $.each(response, function (key, val) { 
                parts += "<option value='" + val.id + "'>" + val.partNumber + "</option>";
             })

             $("#partsForChart").html(parts + "<option value='' disabled selected hidden>Select a part</option>");

        }
    })

    let ctx = $("#canvasChart")[0].getContext('2d');

     new Chart(ctx, {type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }})
})

$(function (){

    $("#selectSection").validate({
        rules: {
            partsForChart: {
                required: true
            },
            chartType: {
                required: true
            }
        },
        messages: {
            partsForChart: {
                required: "Please select a part"
            },
            chartType: {
                required: "Please select a type"
            }
        },
        submitHandler: function (){
            $.ajax({
                url: "/getInfoForChart",
                method: "POST",
                data: {
                    partNumber: $("#partsForChart").val(),
                    chartType: $("#chartType").val(),
                },
                success: function (response){

                }
            })
        }
    })
})
