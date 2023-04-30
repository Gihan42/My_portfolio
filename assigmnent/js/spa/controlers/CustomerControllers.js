

$('#save-customer').click(function(){
    saveCustomer();
    
    
    loadDetails();
    loadAllCustomers();
    // doubleClickRemoveRow();
    clear();
    
    alert('saveCustomer')
})
function saveCustomer(){
    // Swal.fire({
    //     position: 'center',
    //     icon: 'success',
    //     title: 'Your work has been saved',
    //     showConfirmButton: false,
    //     timer: 1500
    // })
    let customerId=  $('#txtcustomerId').val()
    let custonerName=  $('#txtcustomerName').val()
    let customerAddress=  $('#txtcustomerAddress').val()
    let customerSalary=  $('#txtcustomerSalary').val()
   
    var custome = {
        customerId,
        custonerName,
        customerAddress,
        customerSalary
    }

    customers.push(custome)
    console.log(customers)
    loadAllCustomerOption();
    loadCuId();
}
$('#getAll-customer').click(function(){
    loadAllCustomers();
    clear()
})

function loadAllCustomers(){
    $('#customer-tablebody').empty()
    for(var i of customers){
        // console.log('customerId='+i.customerId)
        var row=`<tr ><td>${i.customerId}</td><td >${ i.custonerName}</td> <td >${i.customerAddress}</td><td >${i.customerSalary}</td></tr>`;
        $('#customer-tablebody').append(row);
    }
}
// SEARCH CUSTOMER
$('#search').click(function(){
    let typedId = $("#customer-search").val();
    let customer = searchCustomer(typedId);
    if (customer != null) {
        $('#txtcustomerId').val(customer.customerId)
        $('#txtcustomerName').val(customer.custonerName)
        $('#txtcustomerAddress').val(customer.customerAddress)
        $('#txtcustomerSalary').val(customer.customerSalary)
    } else {
        Swal.fire("There is no cusotmer available for that " + typedId)
        setTextfieldValues("", "", "", "");
    }
})

// function findCustomer(){
//   var result=$('#customer-search').val()
//     for(var i of customers ){
//       console.log(i.customerId)
//       if(i.customerId == result ){
//         $('#txtcustomerId').val(i.customerId)
//         $('#txtcustomerName').val(i.custonerName)
//         $('#txtcustomerAddress').val(i.customerAddress)
//         $('#txtcustomerSalary').val(i.customerSalary)
//       }
//     }
//     }
// }

function searchCustomer(cusID) {
    for (let customer of customers) {
        if (customer.customerId == cusID) {
            return customer;
            console.log(customer)
        }
    }
    return null;
}
//END SEARCH CUSTOMER

//////CUSTOMER DELETE//////
$('#customerDelete').click(function(){
    let cusId=$("#customer-search").val();
    let option=confirm('Do you want to delete this customer'+cusId)
    if(option){
        if(deleteCustomer(cusId)){
            Swal.fire({
                icon: 'delete',
                title: 'Deleted...',
                text: 'Customer Successfully Deleted!',
            })
            $('#txtcustomerId').val('')
            $('#txtcustomerName').val('')
            $('#txtcustomerAddress').val('')
            $('#txtcustomerSalary').val('')
        }
        else{
            Swal.fire("No such customer to delete. please check the id" )
        }
    }

})
function deleteCustomer(customerID){
    let customer= searchCustomer(customerID)
    if(customer!=null){
        let indexNo= customers.indexOf(customer);
        customers.splice(indexNo,1)
        loadAllCustomers()
        return true;
    }else{
        return false;
    }
}
//////END   CUSTOMER DELETE//////
/////UPDATE CUSTOMER//////
$('#customerUpdate').click(function(){
    let cutomerId=$('#txtcustomerId').val()
    let response=updateCustomer(cutomerId)
    if(response){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Customer Updated Successfully',
            showConfirmButton: false,
            timer: 1500
        })
        $('#txtcustomerId').val('')
        $('#txtcustomerName').val('')
        $('#txtcustomerAddress').val('')
        $('#txtcustomerSalary').val('')
    }
    else{
        Swal.fire("Update Failed..!" )
    }
})
function updateCustomer(customerID){
    let customer= searchCustomer(customerID)
    if(customer !=null){
        customer.customerID=$('#txtcustomerId').val()
        customer.custonerName= $('#txtcustomerName').val()
        customer.customerAddress= $('#txtcustomerAddress').val()
        customer.customerSalary= $('#txtcustomerSalary').val()
        loadAllCustomers()
        return true
    }
    else{
        return false
    }
}
////END UPDATE CUSTOMER////
function clear(){
    $('#txtcustomerId').val('')
    $('#txtcustomerName').val('')
    $('#txtcustomerAddress').val('')
    $('#txtcustomerSalary').val('')
}
////////end find customer////////
//CLICK ROW AND SET VALUES TEXT FEILD//////
$('#loadForm').click(function(){
    loadDetails()
})
function loadDetails(){
    $("#customer-tablebody>tr").click(function(){
        let id= $(this).children(':eq(0)').text()
        let name=$(this).children(':eq(1)').text()
        let address=$(this).children(':eq(2)').text()
        let salary=$(this).children(':eq(3)').text()
        console.log(id,name,address,salary)

        $('#txtcustomerId').val(id)
        $('#txtcustomerName').val(name)
        $('#txtcustomerAddress').val(address)
        $('#txtcustomerSalary').val(salary)
    })
}
///// DOUBLE CLICK REMOVE ROW /////
// function removeRow(){
//     $("#customer-tablebody>tr").on('dblclick',function(){
//         $(this).remove()
//     });
// }
///// END REMOVE ROW /////
$('#addnewCustomer').click(function(){
    $('#txtcustomerId').focus()
})
///ENTER EVENT  SAVE CUSTOMER & VALIDATION///
$('#txtcustomerId').focus()
$('#txtcustomerId').on('keydown',function(event){
    if(event.key=='Enter'){
        var id = /^(C)[0-9]{3}$/;
        var result = id.test($("#txtcustomerId").val());
        if (result) {
            $("#txtcustomerId").css({
                'border': '2px solid green'
            })
            $('#txtcustomerName').focus();
        } else {
            $("#txtcustomerId").css({
                'border-color': 'red'
            })

            $('#txtcustomerId').error='Customer ID Pattern is Wrong : C00-001'
        }
    }
})
$('#txtcustomerName').on('keydown',function(event){
    if(event.key=='Enter'){
        var Name = /^[A-z ]{3,15}$/;
        var result = Name.test($("#txtcustomerName").val());
        console.log(result);

        if (result) {
            $("#txtcustomerName").css({
                'border-color': 'green'
            })
            $('#txtcustomerAddress').focus();
        } else {
            $("#txtcustomerName").css({
                'border-color': 'red'
            })
        }
    }
})
$('#txtcustomerAddress').on('keydown',function(event){
    if(event.key=='Enter'){
        var address=/^[A-z0-9 ,/]{4,20}$/
        var result=address.test($('#txtcustomerAddress').val())
        if(result){
            //no3,Galle
            $('#txtcustomerAddress').css({
                'border-color': 'green'
            })
            $('#txtcustomerSalary').focus();
        }
        else{
            $('#txtcustomerAddress').css({
                'border-color': 'red'
            })
        }
    }
})
$('#txtcustomerSalary').on('keydown',function(event){
    if(event.key=='Enter'){
        var salary=/^[1-9][0-9]*(.[0-9]{2})?$/;
        var result=salary.test($("#txtcustomerSalary").val())
        if (result){
            $('#txtcustomerSalary').css({
                'border-color': 'green'
            })
            confirm('Do you want to save this customer')
            saveCustomer();
            loadAllCustomers();
            clear();
        }
        else{
            $('#txtcustomerSalary').css({
                'border-color': 'red'
            })
        }
    }
})

////disable tab key of all  text fields
$('#txtcustomerId,#txtcustomerName,#txtcustomerAddress,#txtcustomerSalary').on('keydown',function(event){
    if(event.key=='Tab'){
        event.preventDefault();
    }
})
// load ids
function loadCuId(){
$('#cmbloadCusId').empty()
for(let cus of customers){
    $('#cmbloadCusId').append(`<option>${cus.customerId}</option>`)
}
}
$('#cmbloadCusId').click(function(){
  let result=  $('#cmbloadCusId').val();
    $('#customer-search').val(result)
})