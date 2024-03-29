$(document).ready(function () {
  var currPart = Cookies.get('currentPart')
  $.ajax({
    url: '/getCosts',
    method: 'POST',
    data: {
      partNumber: currPart
    },
    success: function (response) {
   
      $('#prodCostQualSelect').val(response[0].prodCostQual),
        $('#supplierQuote').val(response[0].supplierQuote),
        $('#experimentalSupplierQuote').val(response[0].expQuote),
        $('#shouldCost').val(response[0].shouldCost),
        $('#shouldCostSourceSelect').val(response[0].shouldCostSource),
        $('#unitCurrency').val(response[0].currencyID),
        $('#productionCost').val(response[0].prodCost),
        $('#experimentalCost').val(response[0].expCost),
        $('#targetCost').val(response[0].targetCost),
        $('#surcharge').val(response[0].surcharge),
        $('#directMat').val(response[0].directMat),
        $('#dirOverhead').val(response[0].dirOverhead),
        $('#perOverhead').val(response[0].perOverhead),
        $('#tic').text(response[0].tic)
    }
  })

  var currencies = ''
  $.ajax({
    url: '/getCurrency',
    method: 'POST',
    success: function (response) {
      $.each(response, function (key, val) {
        currencies +=
          "<option value='" + val.id + "'>" + val.currName + '</option>'
      })

      $('#unitCurrency').html(
        currencies +
          "<option value='' disabled selected hidden>Select a currency</option>"
      )
    }
  })

  var calculateTIC = function () {
    var total =
      (parseInt($('#supplierQuote').val()) || 0) +
      (parseInt($('#shouldCost').val()) || 0) +
      (parseInt($('#productionCost').val()) || 0) +
      (parseInt($('#targetCost').val()) || 0) +
      (parseInt($('#surcharge').val()) || 0) +
      (parseInt($('#directMat').val()) || 0) +
      (parseInt($('#dirOverhead').val()) || 0) +
      (parseInt($('#perOverhead').val()) || 0);
    $('#tic').text(total)
  };

  $('#supplierQuote').keyup(function () {
    calculateTIC()
  })

  $('#shouldCost').keyup(function () {
    calculateTIC()
  })

  $('#productionCost').keyup(function () {
    calculateTIC()
  })

  $('#targetCost').keyup(function () {
    calculateTIC()
  })
  $('#surcharge').keyup(function () {
    calculateTIC()
  })
  $('#directMat').keyup(function () {
    calculateTIC()
  })
  $('#dirOverhead').keyup(function () {
    calculateTIC()
  })
  $('#perOverhead').keyup(function () {
    calculateTIC()
  })
})

$(function () {
  $('#selectCostBtn').on('click', function () {
    $('#costSelectModal').css('display', 'grid')
    loadCostTable()
  })

  $('#closeCostModal').on('click', function (e) {
    e.preventDefault();
    $('#costSelectModal').css('display', 'none')
  })

  $('#saveCostBtn').on('click', function () {
    var date = new Date()
    var dateTimestamp = date.toISOString().slice(0, 19).replace('T', ' ')
    var currPart = Cookies.get('currentPart')

    $('#costForm').validate({
      rules: {
        prodCostQualSelect: {
          required: true
        },
        supplierQuote: {
          required: true,
          number: true,
          maxlength: 12
        },
        experimentalSupplierQuote: {
          required: true,
          number: true,
          maxlength: 12

        },
        shouldCost: {
          required: true,
          number: true,
          maxlength: 12

        },
        shouldCostSourceSelect: {
          required: true
        },
        unitCurrency: {
          required: true
        },
        productionCost: {
          required: true,
          number: true,
          maxlength: 12

        },
        experimentalCost: {
          required: true,
          number: true,
          maxlength: 12

        },
        targetCost: {
          required: true,
          number: true,
          maxlength: 12

        },
        surcharge: {
          required: true,
          number: true,
          maxlength: 12

        },
        directMat: {
          required: true,
          number: true,
          maxlength: 12

        },
        dirOverhead: {
          required: true,
          number: true,
          maxlength: 12

        },
        perOverhead: {
          required: true,
          number: true,
          maxlength: 12

        }
      },
      messages: {
        prodCostQualSelect: {
          required: 'Please select a cost qual'
        },
        supplierQuote: {
          required: 'Please enter a value',
          number: 'Only digits are allowed'
        },
        experimentalSupplierQuote: {
          required: 'Please enter a value',
          number: 'Only digits are allowed'
        },
        shouldCost: {
          required: 'Please enter a value',
          number: 'Only digits are allowed'
        },
        shouldCostSourceSelect: {
          required: 'Pleae select a should cost source'
        },
        unitCurrency: {
          required: 'Please select a unit'
        },
        productionCost: {
          required: 'Please enter a value',
          number: 'Only digits are allowed'
        },
        experimentalCost: {
          required: 'Please enter a value',
          number: 'Only digits are allowed'
        },
        targetCost: {
          required: 'Please enter a value',
          number: 'Only digits are allowed'
        },
        surcharge: {
          required: 'Please enter a value',
          number: 'Only digits are allowed'
        },
        directMat: {
          required: 'Please enter a value',
          number: 'Only digits are allowed'
        },
        dirOverhead: {
          required: 'Please enter a value',
          number: 'Only digits are allowed'
        },
        perOverhead: {
          required: 'Please enter a value',
          number: 'Only digits are allowed'
        }
      },
      submitHandler: function () {
        $.ajax({
          url: '/addCost',
          method: 'POST',
          data: {
            prodCostQual: $('#prodCostQualSelect').val(),
            supplierQuote: $('#supplierQuote').val(),
            experimentalSupplierQuote: $('#experimentalSupplierQuote').val(),
            shouldCost: $('#shouldCost').val(),
            shouldCostSource: $('#shouldCostSourceSelect').val(),
            unitCurrency: $('#unitCurrency').val(),
            productionCost: $('#productionCost').val(),
            experimentalCost: $('#experimentalCost').val(),
            targetCost: $('#targetCost').val(),
            surcharge: $('#surcharge').val(),
            directMat: $('#directMat').val(),
            dirOverhead: $('#dirOverhead').val(),
            perOverhead: $('#perOverhead').val(),
            tic: $('#tic').text(),
            createDate: dateTimestamp,
            partNumber: currPart
          },
          before: function () {
    
          },
          success: function (response) {
            
            if (response === 'ok') {
             
           
              $('.message-container-successAdmin .message').text(
                'Cost esimation added successfully'
              )
              $('.message-container-successAdmin').css('display', 'grid')
              setTimeout(function () {
                $('.message-container-successAdmin').css('display', 'none')
              }, 6000)
            } else {
            
              $('.addUserModal').css('display', 'none')
              $('.message-container-errorAdmin .message').text(
                'An error has ocurred'
              )
              $('.message-container-errorAdmin').css('display', 'grid')
              setTimeout(function () {
                $('.message-container-error').css('display', 'none')
              }, 6000)
            }
          }
        })

        $("#saveSupplier").prop("disabled", false)
        $("#costStep").focus()
        $("#costStep").css("background-color", "#367c2b")
        $("#costStep").css("border", " 3px solid #367c2b")



      }
    })
  })

  $('table').on('click', '#deleteCostBtn', function () {
    $('#deleteCostModal').css('display', 'grid')

    let row = $(this).closest('tr')

    let id = row.find('.tableCostID').text()

    $('#confirmCostDelete').on('click', function () {
      $.ajax({
        url: '/deleteCost',
        method: 'POST',
        data: {
          id: id
        },
        beforeSend: function () {
        
        },
        success: function (response) {
          if (response === 'ok') {
    
            $('.deleteUserModal').css('display', 'none')
            $('.message-container-successAdmin .message').text(
              'Cost estimation deleted successfully'
            )
            $('.message-container-successAdmin').css('display', 'grid')
            $('#costSelectModal').css('display', 'none')
            $('#deleteCostModal').css('display', 'none')
            setTimeout(function () {
              $('.message-container-successAdmin').css('display', 'none')
            }, 6000)
          } else {
        
            $('.deleteUserModal').css('display', 'grid')
            $('.message-container-errorAdmin .message').text(
              'An error has occurred'
            )
            $('.message-container-errorAdmin').css('display', 'grid')
            $('#deleteCostModal').css('display', 'grid')
            setTimeout(function () {
              $('.message-container-errorAdmin').css('display', 'none')
            }, 6000)
          }
        }
      })
    })
  })

  $('#closeDeleteCostModal').on('click', function () {
    $('#deleteCostModal').css('display', 'none')
  })

  $('#cancelCostDelete').on('click', function (e) {
    e.preventDefault()
    $('#deleteCostModal').css('display', 'none')
  })

  $('table').on('click', '#updateCostBtn', function () {
    let row = $(this).closest('tr')

    let id = row.find('.tableQuanID').text()
    let prodCostQual = row.find('.tableProdCostQual').text()
    let supplierQuote = row.find('.tableSupplierQuote').text()
    let expQuote = row.find('.tableExpQuote').text()
    let shouldCost = row.find('.tableShouldCost').text()
    let shouldCostSource = row.find('.tableShouldCostSource').text()
    let currencyID = row.find('.tableCurrencyID').text()
    let prodCost = row.find('.tableProdCost').text()
    let expCost = row.find('.tableExpCost').text()
    let targetCost = row.find('.tableTargetCost').text()
    let surcharge = row.find('.tableSurcharge').text()
    let directMat = row.find('.tableDirectMat').text()
    let dirOverhead = row.find('.tableDirOverhead').text()
    let perOverhead = row.find('.tablePerOverhead').text()
    let tic = row.find('.tableTic').text()

    $('#prodCostQualSelect').val(prodCostQual),
      $('#supplierQuote').val(supplierQuote),
      $('#experimentalSupplierQuote').val(expQuote),
      $('#shouldCost').val(shouldCost),
      $('#shouldCostSourceSelect').val(shouldCostSource),
      $('#unitCurrency').val(currencyID),
      $('#productionCost').val(prodCost),
      $('#experimentalCost').val(expCost),
      $('#targetCost').val(targetCost),
      $('#surcharge').val(surcharge),
      $('#directMat').val(directMat),
      $('#dirOverhead').val(dirOverhead),
      $('#perOverhead').val(perOverhead),
      $('#tic').text(tic)

    $('#costSelectModal').css('display', 'none')
    $('.message-container-successAdmin .message').text(
      'Cost estimation loaded successfully'
    )
    $('.message-container-successAdmin').css('display', 'grid')
    $('#costSelectModal').css('display', 'none')
    setTimeout(function () {
      $('.message-container-successAdmin').css('display', 'none')
    }, 6000)
  })
})

function loadCostTable () {
  var costTable = ''
  var currPart = Cookies.get('currentPart')
  $.ajax({
    url: '/getCosts',
    method: 'POST',
    data: {
      partNumber: currPart
    },
    success: function (response) {
      $('#costTable tr').not(':first').remove()
      $.each(response, function (key, val) {
        costTable +=
          '<tr><td class="tableCostID">' +
          val.id +
          '</td><td class="tableProdCostQual">' +
          val.prodCostQual +
          '</td><td class="tableSupplierQuote">' +
          val.supplierQuote +
          '</td><td class="tableExpQuote">' +
          val.expQuote +
          '</td><td class="tableShouldCost">' +
          val.shouldCost +
          '</td><td class="tableShouldCostSource">' +
          val.shouldCostSource +
          '</td><td class="tableCurrencyID">' +
          val.currencyID +
          '</td><td class="tableProdCost">' +
          val.prodCost +
          '</td><td class="tableExpCost">' +
          val.expCost +
          '</td><td class="tableTargetCost">' +
          val.targetCost +
          '</td><td class="tableSurcharge">' +
          val.surcharge +
          '</td><td class="tableDirectMat">' +
          val.directMat +
          '</td><td class="tableDirOverhead">' +
          val.dirOverhead +
          '</td><td class="tablePerOverhead">' +
          val.perOverhead +
          '</td><td class="tableTic">' +
          val.tic +
          '</td><td class="tableCreateDate">' +
          val.createDate +
          '</td><td class="rowActions" id="rowActions"><button type="click" class="actionBtn"  id="deleteCostBtn">Delete</button><button type="click"  class="actionBtn" id="updateCostBtn">Load</button></td></tr>'
      })
      $('#costTable tr').first().after(costTable)
    }
  })
}
