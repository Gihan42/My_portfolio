
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
        let cusIds= $('#cusid').val();
        let date=$('#txtDate').val()
        let items=cart
   
        
        cart.forEach(cartItem => {
        let found = itemsArray.find(item => {return item.itemcode == cartItem.itemCode})
        found.itemqty =  found.itemqty - cartItem.itemsqty
        // total = total + parseInt(cartItem.total)
    })


        var order={
            orderId,
            cusIds,
            items,
            date
        }
        orderArray.push(order)
        // console.log('order='+orderArray)
        // console.log('price in= '+itemPrice)
     }
   
   
  
  ////PLACE ORDER
  $('#placeorder').click(function(){
    $('#order-tabelbody').empty();
   console.log("this runs")
    saveOrder()
    $('#orderId').val(calculateNextId())
    subtot();
    alert('order has been saved!')
    clear()
    
})
//find order id
 $('#orderId').on('keyup',function(event){
    if(event.which==13){
        
        let order = orderArray.find((order) => {
            return order.orderId ==  $('#orderId').val()
        })
        console.log(order)
        // $('#order-tabelbody').empty();
        order.items.forEach(i => {
            var TbaleRow=`<tr ><td>${i.cusId}</td><td>${i.itemCode}</td><td>${i.itemName}</td><td>${i.itemPrice}</td><td>${i.itemsqty}</td><td><button class="btn btn-outline-danger" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" id="btnRemove">remove</button></td></tr>`
            $('#order-tabelbody').append(TbaleRow)
        }
)
    subtot(order.items)
    }
})

// subtotal
// function subtot(array){
//     let subtotal=0;
//     for (let i of array){
//         subtotal += (parseInt(i.itemPrice) * parseInt(i.itemsqty))
//     }
//     $('#subtotal').val(subtotal);
//     console.log(subtotal)
// }
function subtot(){
    let subtotal=0;
    for (let i of cart){
        subtotal += (parseInt(i.itemPrice) * parseInt(i.itemsqty))
    }
    $('#subtotal').val(subtotal);
    console.log(subtotal)
}
//genrate order id
$('#orderId').val(calculateNextId())

function calculateNextId() {
    if (orderArray.length > 0) {
      let id = orderArray[orderArray.length - 1].orderId;
      let [pre, frag] = id.split("-");
      let num = parseInt(frag) + 1;
      let count = num.toString().length;
      if (count == 1) {
        return pre + "-00" + num;
      } else if (count == 2) {
        return pre + "-0" + num;
      } else {
        return pre + "-" + num;
      }
    } else {
      return "O-001";
    }
  }

  
// let oid=001;
// $('#orderId').val('O000')
// function genarateOrderId(){
//     $('#orderId').val('O00'+oid++);
// }

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
    $('#customerpayment').val('')
    $('itemsqty').val('');
}

        // $('#customerpayment').keyup(function(){
        //     let tot=  $('#subtotal').val();
        //     let cash=$('#customerpayment').val()
        //     let balance=cash-tot;
        //     $('#balance').val(balance);
        // })
        $('#customerpayment').on('keydown',function(event){
            if(event.key=='Enter'){
                let tot=  $('#subtotal').val();
                let cash=$('#customerpayment').val()
                let balance=cash-tot;
                $('#balance').val(balance)

            }
            })