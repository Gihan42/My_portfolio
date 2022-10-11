
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
     //SAVE ORDER//
     function saveOrder(){
        let orderId=$('#orderId').val();
        let cusId= $('#cusid').val();
        let itemCode= $('#itCode').val();
        let itemName= $('#itName').val();
        let itemPrice=$('#itPrice').val();
        let itemsqty=$('#itemsqty').val();
        let balance=$('#balance').val();

        var order={
            orderId,
            cusId,
            itemCode,
            itemName,
            itemPrice,
            itemsqty,
            balance, 
        }
        orderArray.push(order)
        console.log(orderArray)
        console.log('price in= '+itemPrice)
     }
     //LOAD ALL DATA TABLE
     function loadAllOrders(){
        $('#order-tabelbody').empty();
        for (var i of orderArray){
            var TbaleRow=`<tr ><td>${i.orderId}</td><td>${i.cusId}</td><td>${i.itemCode}</td><td>${i.itemName}</td><td>${i.itemPrice}</td><td>${i.itemsqty}</td><td>${i.balance}</td><td>${'<button class="btn btn-outline-danger" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" id="btnRemove">remove</button>'}</td></tr>`
            $('#order-tabelbody').append(TbaleRow)
        }
     }
     //ADD CART
     $('#addCart').click(function(){
        $('#order-tabelbody').empty();
        saveOrder();
        loadAllOrders();
        genarateOrderId()
        clear();
     })
     //////CALCULATE///
     $('#itemsqty').keyup(function(){
        let price=$('#itPrice').val()
        let itqty=$('#itemsqty').val();
        let total=price*itqty;
        $('#total').val(total);
    })
    $('#customerpayment').keyup(function(){
        let tot=  $('#total').val();
        let cash=$('#customerpayment').val()
        let balance=cash-tot;
        $('#balance').val(balance);
    })
  ////PLACE ORDER
  $('#placeorder').click(function(){
    alert('order has been saved!')
    clear()
    
})

let oid=001;
$('#orderId').val('O000')
function genarateOrderId(){
    $('#orderId').val('O00'+oid++);
}
//CLEAR TEXTFEILD///
function clear(){
    $('#cusid').val('')
    $('#txtcusName').val('')
    $('#txtcusAddress').val('')
    $('#txtcusSalary').val('')
    $('#itCode').val('')
    $('#itName').val('')
    $('#itPrice').val('')
    $('#itQty').val('')
    $('#total').val('');
    $('#balance').val('');
    $('#customerpayment').val('')
    $('itemsqty').val('');
}

