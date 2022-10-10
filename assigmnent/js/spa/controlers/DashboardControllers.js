
    $("#navbar").css("visibility","visible");
    $("#home").css("visibility","visible");
    $("#customer").css("display","none");
    $("#item").css("display","none");
    $("#order").css("display","none");
    // HOME
    $("#home-button-spa").click(function(){
    $("#navbar").show()
    $("#home").show()
    $("#customer").css("display","none");
    $("#item").css("display","none");
    $("#order").css("display","none");
})
    // CUSTOMER
    $("#custmer-button-spa").click(function(){
    $("#navbar").show()
    $("#home").css("display","none");
    $("#customer").show()
    $("#item").css("display","none");
    $("#order").css("display","none");
})
    // ITEM
    $("#item-button-spa").click(function(){
    $("#navbar").show()
    $("#home").css("display","none");
    $("#customer").css("display","none");
    $("#item").show();
    $("#order").css("display","none");
})
    // ORDER
    $("#order-button-spa").click(function(){
    $("#navbar").show()
    $("#home").css("display","none");
    $("#customer").css("display","none");
    $("#item").css("display","none");
    $("#order").show();
})

    // customet-card-button
    $("#cus-card-btn").click(function(){
    $("#navbar").show()
    $("#home").css("display","none");
    $("#customer").show()
    $("#item").css("display","none");
    $("#order").css("display","none");
})
    // item-card-button
    $("#item-card-btn").click(function(){
    $("#navbar").show()
    $("#home").css("display","none");
    $("#customer").css("display","none");
    $("#item").show();
    $("#order").css("display","none");
})
    // order-card-button
    $("#order-card-btn").click(function(){
    $("#navbar").show()
    $("#home").css("display","none");
    $("#customer").css("display","none");
    $("#item").css("display","none");
    $("#order").show();
})
