
$('#save-item').click(function(){
  saveItem();
  getAllItem();
  loadDetails();
  clear()

})
function saveItem(){
// Swal.fire({
//     position: 'center',
//     icon: 'success',
//     title: 'Your item has been saved',
//     showConfirmButton: false,
//     timer: 1500
// })
  let itemcode= $('#txtItemcode').val();
  let itemName= $('#txtItemName').val();
  let itemPrice= $('#txtItemPrice').val();
  let itemqty= $('#txtitemQty').val();

  var item={
    itemcode,
    itemName,
    itemPrice,
    itemqty
  }
  itemsArray.push(item)
  console.log(itemsArray)
  loadallIteamOption();
  loadCode();
}
$('#getAll-iteam').click(function(){
  getAllItem();
})
function getAllItem(){
  $('#iteam-tablebody').empty();
  for(var i of itemsArray ){
  var row=`<tr ><td>${i.itemcode}</td><td >${ i.itemName}</td> <td >${i.itemPrice}</td><td >${i.itemqty}</td></tr>`;
  $('#iteam-tablebody').append(row)
}
clear()
}
// SEARCH ITEM
// function findItem(){
//   var result=$('#item-search').val();
//   for (var i of itemsArray){
//     if(i.itemcode == result){
//       $('#txtItemcode').val(i.itemcode)
//       $('#txtItemName').val(i.itemName)
//       $('#txtItemPrice').val(i.itemPrice)
//       $('#txtitemQty').val(i.itemqty)
//     }
//   }
// }
function searchItem(itemCode){
  for (let item of itemsArray) {
    if(item.itemcode==itemCode){
        return item;
    }
  }
  return null;
}
$('#searchI').click(function(){
  alert("D");
let typecode=$('#item-search').val();
let item=searchItem(typecode)
if(item !=null){
$('#txtItemcode').val(item.itemcode)
$('#txtItemName').val(item.itemName)
$('#txtItemPrice').val(item.itemPrice)
$('#txtitemQty').val(item.itemqty)
}
else {
    alert("There is no item available for that " + typecode)
    }
})
$('#txtItemcode').change(function(){
// findItem()
})
function clear(){
$('#txtItemcode').val('')
$('#txtItemName').val('')
$('#txtItemPrice').val('')
$('#txtitemQty').val('')
}
//////////// end find item ///////////

////ITEM DELETE /////
$('#delet-item').click(function(){
let iCode=$('#item-search').val();
let option=confirm('Do you want to delete this item'+iCode)
if(option){
if(deletItem(iCode)){
//   Swal.fire({
//     icon: 'delete',
//     title: 'Deleted...',
//     text: 'Item Successfully Deleted!',
// })
$('#txtcustomerId').val('')
$('#txtcustomerName').val('')
$('#txtcustomerAddress').val('')
$('#txtcustomerSalary').val('')

}
else{
alert("No such item to delete. please check the id" )
}
}
})
function deletItem(itemcode){
let item=searchItem(itemcode)
if(item!=null){
    let indexNo=itemsArray.indexOf(item)
    itemsArray.splice(indexNo,1)
    getAllItem();
    return true;
}
else{
  return false;
}

}

///END ITEM DELETE////
///UPDATE ITEM////
$('#update-item').click(function(){
let itemCode=$('#txtItemcode').val()
let response=updateItem(itemCode)
if(response){
  Swal.fire({
// position: 'center',
// icon: 'success',
// title: 'Customer Updated Successfully',
// showConfirmButton: false,
// timer: 1500
})
$('#txtItemcode').val('')
$('#txtItemName').val('')
$('#txtItemPrice').val('')
$('#txtitemQty').val('')
}
else{
  alert("Update Failed..!" )
}
})
function updateItem(itemCode){
let item=searchItem(itemCode)
if(item != null){
  item.itemCode=$('#txtItemcode').val()
  item.itemName= $('#txtItemName').val()
  item.itemPrice= $('#txtItemPrice').val()
  item.itemqty=$('#txtitemQty').val()
  getAllItem()
  return true
}
else{
  return false
}
}
///DELETE ITEM///
//CLICK ROW AND SET VALUES TEXT FEILD/////
$('#loadForm').click(function(){
loadDetails()
})
function loadDetails(){
$("#iteam-tablebody>tr").click(function(){
let code=$(this).children(':eq(0)').text()
let name=$(this).children(':eq(1)').text()
let price=$(this).children(':eq(2)').text()
let qty=$(this).children(':eq(3)').text()

$('#txtItemcode').val(code)
$('#txtItemName').val(name)
$('#txtItemPrice').val(price)
$('#txtitemQty').val(qty)
})
}
///ENTER EVENT  SAVE ITEM  & VALIDATION///
$('#txtItemcode').on('keydown',function(event){
if(event.key=='Enter'){
var code=/^(I)[0-9]{3}$/;
var result=code.test($('#txtItemcode').val());
if(result){
  $("#txtItemcode").css({
    'border-color': 'green'
  })
  $('#txtItemName').focus();
}
else{
  $("#txtItemcode").css({
    'border-color': 'red'
  })
}
}
})
$('#txtItemName').on('keydown',function(event){
if(event.key=='Enter'){
var Name=/^[A-z ]{3,15}$/
var result=Name.test($('#txtItemName').val());
if(result){
  $("#txtItemName").css({
    'border-color': 'green'
  })
  $('#txtItemPrice').focus();
}
else{
  $("#txtItemName").css({
    'border-color': 'red'
  })
}

}
})
$('#txtItemPrice').on('keydown',function(event){
if(event.key=='Enter'){
var price=/^[1-9][0-9]*(.[0-9]{2})?$/;
var result=price.test($('#txtItemPrice').val());
if(result){
  $("#txtItemPrice").css({
    'border-color': 'green'
  })
  $('#txtitemQty').focus();
}
else{
  $("#txtItemPrice").css({
    'border-color': 'red'
  })
}
}
})
$('#txtitemQty').on('keydown',function(event){
if(event.key=='Enter'){
var qty=/^[0-9]{1,}$/;
var result=qty.test($('#txtitemQty').val());
if(result){
  $("#txtitemQty").css({
    'border-color': 'green'
  })
confirm('Do you want to save this item');
saveItem();
getAllItem();
}
else{
  $("#txtitemQty").css({
    'border-color': 'red'
  })
}

}
})
////disable tab key of all  text fields
$('#txtItemcode,#txtItemName,#txtItemPrice,#txtitemQty').on('keydown',function(event){
 if(event.key=='Tab'){
  event.preventDefault();
 }
})
// load ids
function loadCode(){
$('#cmbitCodes').empty()
for(let item of itemsArray){
  $('#cmbitCodes').append(`<option>${item.itemcode}</option>`)
}
}
$('#cmbitCodes').click(function(){
 let result=$('#cmbitCodes').val();
 $('#item-search').val(result)
})