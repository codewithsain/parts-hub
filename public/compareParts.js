$(document).ready(function () {
    var currPart = Cookies.get("currentPart")
    $.ajax({
        url: "/getComparePart",
        method: "POST",
        data: {
            partNumber: currPart
        },
        success: function (compareResponse) {

            $("#partPlant").text(compareResponse[0].plant),
                $("#partPartInfo").text(compareResponse[0].description),
                $("#partTermCode").text(compareResponse[0].termCode),
                $("#partNetWeight").text(compareResponse[0].netWeight),
                $("#partGrossWeight").text(compareResponse[0].grossWeight),
                $("#partSupplierNumber").text(compareResponse[0].supplierNumber),
                $("#partSupplierName").text(compareResponse[0].supplierName),
                $("#partLocalService").text(compareResponse[0].lsi),
                $("#partGlobalService").text(compareResponse[0].gsi),
                $("#partQuantity").text(compareResponse[0].containerQuantity),
                $("#partDescription").text(compareResponse[0].containerDesc),
                $("#partRoundingValue").text(compareResponse[0].roudingValue),
                $("#partMinLotSize").text(compareResponse[0].minLotSize)
                $("#partImage").append('<img src="/partImages/'+currPart+'.jpg" width="284" height="177">')
        }
    })

    $.ajax({
        url: "/getComparePartPrice",
        method: "POST",
        data: {
            partNumber: currPart
        },
        success: function (priceResults) {
       
                $("#partPrice").text(priceResults[0].tic)
        }
    })

    $.ajax({
        url: "/getComparePartQuantities",
        method: "POST",
        data: {
            partNumber: currPart
        },
        success: function (quantitiesResult) {
               $("#partGlobalEstimation").text(quantitiesResult[0].globalEstimation),
                $("#partBuyerEstimation").text(quantitiesResult[0].buyerEstimation)
        }
    })

    $.ajax({
        url: "/getECM",
        method: "POST",
        success: function (ecmResults) {
              $("#partECMProject").text(ecmResults[0].ecm),
              $("#similarPartECMProject").text(ecmResults[0].ecm)
        }
    })

    $.ajax({
        url: "/getSimilarPart",
        method: "POST",
        data: {
            partNumber: currPart
        },
        success: function (similarPartResults) {
            $("#similarPartPlant").text(similarPartResults[0].plant),
                $("#similarPartPartInfo").text(similarPartResults[0].description),
                $("#similarPartTermCode").text(similarPartResults[0].termCode),
                $("#similarPartNetWeight").text(similarPartResults[0].netWeight),
                $("#similarPartGrossWeight").text(similarPartResults[0].grossWeight),
                $("#similarPartSupplierNumber").text(similarPartResults[0].supplierNumber),
                $("#similarPartSupplierName").text(similarPartResults[0].supplierName),
                $("#similarPartLocalService").text(similarPartResults[0].lsi),
                $("#similarPartGlobalService").text(similarPartResults[0].gsi),
                $("#similarPartQuantity").text(similarPartResults[0].containerQuantity),
                $("#similarPartDescription").text(similarPartResults[0].containerDesc),
                $("#similarPartRoundingValue").text(similarPartResults[0].roudingValue),
                $("#similarPartMinLotSize").text(similarPartResults[0].minLotSize)
                $("#similarPartImage").append('<img src="/partImages/'+similarPartResults[0].partNumber+'.jpg" width="284" height="177">')

        }
    })

    $.ajax({
        url: "/getSimlarPartPrice",
        method: "POST",
        data: {
            partNumber: currPart
        },
        success: function (similarPartPriceResults) {
                $("#similarPartPrice").text(similarPartPriceResults[0].tic)
        }
    })

    $.ajax({
        url: "/getSimilarPartQuantities",
        method: "POST",
        data: {
            partNumber: currPart
        },
        success: function (similarQuantitiesResults) {
               $("#similarPartGlobalEstimation").text(similarQuantitiesResults[0].globalEstimation),
                $("#similarPartBuyerEstimation").text(similarQuantitiesResults[0].buyerEstimation)
        }
    })

})