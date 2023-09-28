
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


})

$(function (){

    $("#generateChart").on("click", function(){
        
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
                $("#canvasChart").remove()

                $.ajax({
                    url: "/getInfoForChart",
                    method: "POST",
                    data: {
                        partID: $("#partsForChart").val(),
                        chartType: $("#chartType").val(),
                    },
                    success: function (response){
                        $("#chartContent").append('<canvas id="canvasChart" width="950" height="420"></canvas>')
                        let ctx = $("#canvasChart")[0].getContext('2d');
                        
                         phChart =  new Chart(ctx, {type: 'bar',
                        data: {
                          labels: [],
                          datasets: [{
                            label: 'Part ' + ($("#chartType").val() === 'cost' ? 'Cost' : $("#chartType").val() === 'leadtime' ? 'Lead Time' : $("#chartType").val() === 'quantity' ? 'Quantity': '') + ' Exploration',
                            data: [],
                            borderWidth: 1,
                            backgroundColor: ['#ffd621','#367c2b']
                          }]
                        },
                        options: {
                          scales: {
                            y: {
                              beginAtZero: false
                            }
                          }
                        }})

                        const mostrar = (datos) =>{
                            datos.forEach(element =>{
                                phChart.data['labels'].push(element.createDate)
                                phChart.data['datasets'][0].data.push(element.Result)
                            });
                            phChart.update()
                        }

                        mostrar(response)
                      


                    }
                })
            }
        })
    })

})
