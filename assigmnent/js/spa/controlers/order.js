function loadAllCustomerOption(){
    $('#cmbCusId').empty();
    for(let cus of customers){
        $('#cmbCusId').append(`<option>${cus.customerId}</option>`)
    }
    }   
    function loadallIteamOption(){
        $('#cmbItemcode').empty();
        for(let item of itemsArray){
            $('#cmbItemcode').append(`<option>${item.itemcode}</option>`)
        }
    }
    //customer combobox click and set value textfeild
    $('#cmbCusId').click(function(){
       let val= $('#cmbCusId').val()
    //    $('#cusid').val(val)
       let cus=searchCustomer(val);
       if (cus != null) {
        $('#cusid').val(cus.customerId)
        $('#txtcusName').val(cus.custonerName)
        $('#txtcusAddress').val(cus.customerAddress)
        $('#txtcusSalary').val(cus.customerSalary)
    } 
    })
     //item combobox click and set value textfeild
     $('#cmbItemcode').click(function(){
        let itemVal= $('#cmbItemcode').val()
        let items=searchItem(itemVal)
        if(items != null){
            $('#itCode').val(items.itemcode)
            $('#itName').val(items.itemName)
            $('#itPrice').val(items.itemPrice)
            $('#itQty').val(items.itemqty)
        }
     })