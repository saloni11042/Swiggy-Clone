// private methods and properties

var shoppingCart = (
    function(){
        var cart =[];

        function Item(name, price, count, image) {
            this.name = name
            this.price = price
            this.count = count
            this.image = image
        }

        function saveCart(){
            localStorage.setItem("shoppingCart", JSON.stringify(cart));
        }

        function loadCart() {
            this.cart  =JSON.parse(localStorage.getItem("shoppingCart"))
        }

        // Public methods and properties
        var obj ={};

        obj.addItemToCart = function(name, price, count, image){
            for (var i in cart){
                if(cart[i].name === name){
                    if (cart[i].count >= 10){
                        window.alert('A max of 10 items can be ordered!')
                        return;
                    } else if (cart[i].count < 1){
                        console.log("Count is less than 1.")
                        return;

                    }else{
                        cart[i].count += count;
                        saveCart();
                        return;
                    }
                }
            }
            console.log("addItemToCart:", name, price, count, image);
            var item = new Item(name, price, count, image)
            cart.push(item);
            saveCart();
        };


        obj.setCountForItem = function(name, count){
            for (var i in cart){
                if(cart[i].name === name){
                    cart[i].count = count;
                }
            }
            saveCart();
        };


        obj.removeItemFromCart = function (name){
            for (var i in cart){
                if(cart[i].name === name){
                    cart[i].count--;
                    if(cart[i].count === 0){
                        cart.splice(i,1);
                    }
                    break;
                }
            }
            saveCart();
        };


        obj.removeItemFromCartAll = function (name){
            for (var i in cart){
                if(cart[i].name === name){
                    cart.splice(i, 1);
                    break;
                }
            }
            saveCart();
        };


        obj.clearCart = function(){
            cart = [];
            saveCart();

        };


        obj.countCart = function(){
            var totalCount = 0;
            for (var i in cart){
                totalCount += cart[i].count;
            }
            return totalCount;
        };


        obj.totalCart = function(){
            var totalCost = 0;
            for (var i in cart){
                totalCost += cart[i].price * cart[i].count;
            }
            return totalCost.toFixed(2);
        };



        obj.listCart = function(){
            var cartCopy = [];
            for(var i in cart){
                var item = cart[i];
                var itemCopy = {};
                for(var p in item){
                    itemCopy[p] = item[p];
                }
                itemCopy.total = (item.price * item.count).toFixed(2)
                cartCopy.push(itemCopy);
            }
            return cartCopy;
        };
        return obj;
    }
)();

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

$(".add-to-cart").click(function(event){
    event.preventDefault();
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));
    var image = $(this).attr("image-path");
    var id = $(this).attr("id");
    var cartArray = shoppingCart.listCart();
    var elem = $('#'+id).html()
    shoppingCart.addItemToCart(name, price, 1, image);
    displayCart();
    if (elem == "Add to cart"){
        $('#'+id).html("Added!");
        $('#'+id).css('backgroundColor','green');
        $('#'+id).css('color','white');
        }
    else{
        for (var i in cartArray){
            if (name == cartArray[i].name){
                // console.log(cartArray[i]);
                $('#'+id).html("Add to cart");
                $('#'+id).css('backgroundColor','white');
                $('#'+id).css('color','green');
            }
        
        }
    }
});

$("#clear-cart").click(function(event){
    shoppingCart.clearCart();
    displayCart();
    $('.add-to-cart').html("Add to cart");
    $('.add-to-cart').css('backgroundColor','white');
    $('.add-to-cart').css('color','green');
});

$("#show-cart").on("click", ".delete-item", function(event){
    var name = $(this).attr("data-name");
    console.log("this:");
    console.log($(this).attr());
    
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
});

$("#show-cart").on("click", ".subtract-item", function(event){
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCart(name);
    displayCart();
});

$("#show-cart").on("click", ".plus-item", function(event){
    var name = $(this).attr("data-name");
    shoppingCart.addItemToCart(name, 0, 1, null);
    displayCart();
});

$("#show-cart").on("change", ".item-count", function(event){
    var name = $(this).attr("data-name");
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

function displayCart() {
    var cartArray = shoppingCart.listCart();
    console.log(cartArray);
    var output = "";

    for (var i in cartArray) {
        output += "<li>"
            +"<img class='c_cart-image' src='"
            +cartArray[i].image
            +"'><span class='c_item-name text-wrap'>"
            +cartArray[i].name
            +"</span>"
            +"<input class='item-count' type='number' min='0' max='10' data-name='"
            +cartArray[i].name +"' value='"
            +cartArray[i].count+"'>"
            +" x <span class='c_item-price'>"
            +cartArray[i].price
            +"</span> = <span class='c_item-total'>"
            + cartArray[i].total
            +"</span><button class='plus-item' data-name='"
            +cartArray[i].name
            +"'>+</button>"
            +" <button class='subtract-item' data-name='"
            +cartArray[i].name+"'>-</button>"
            +" <button class='delete-item' data-name='"
            +cartArray[i].name+"'>X</button>"
            +"</li>"
            +"<hr style='margin-top:10px;'>";
    }
    $("#show-cart").html(output);
    $("#count-cart").html( shoppingCart.countCart() );
    $("#total-cart").html( shoppingCart.totalCart() );
}

function openCart(){
    document.getElementById("c_cart-card").style.display = 'block';
}

function closeCart1(){
    sleep(300);
    document.getElementById("c_cart-card").style.display = 'none';
}

displayCart();



