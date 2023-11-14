const dropDown = document.querySelector(".hamburger");
const menu = document.querySelector("#mobile");
const close = document.querySelector(".close");
const mainContent = document.querySelector("main");
const headerContent = document.querySelector("header");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const sneakerPic = document.querySelector(".main-sneaker");
const quantity = document.querySelector(".quantity-item");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const shoppingCart = document.querySelector(".shopping-cart");
const addToCart = document.querySelector(".add-cart");
const quantityDisplay = document.querySelector(".orange-circle")

let itemCount = 0;

dropDown.addEventListener("click", (event) => {
    menu.classList.remove("hide");
    mainContent.classList.add("blur");
    headerContent.classList.add("blur");
})

close.addEventListener("click", (event) => {
    menu.classList.add("hide");
    mainContent.classList.remove("blur");
    headerContent.classList.remove("blur");
})

next.addEventListener("click", newPicture);
previous.addEventListener("click", newPicture);

function newPicture(event) {
    const strPic = sneakerPic.getAttribute("src");
    
    const newPic = changePicture(strPic, event.target)
    sneakerPic.setAttribute("src", newPic);
}

function changePicture(srcString, direction) {
    const array = srcString.split("-");
    const lastIndex = array.length - 1;
    let numbPic = parseInt(array[lastIndex][0])
    if(direction.classList.contains("next") && numbPic < 4) {
        numbPic += 1;
    } else if(direction.classList.contains("next") && numbPic === 4) {
        numbPic = 1;
    } else if(direction.classList.contains("previous") && numbPic > 1) {
        numbPic -= 1;
    } else {
        numbPic = 4;
    }
    array[lastIndex] = numbPic + array[lastIndex].slice(1);
    return array.join("-");
}

function quantityIncrement(event) {
    let number = parseInt(quantity.textContent);
    let str = '';
    if(event.target.classList.contains("plus")) {
        number += 1;
    } else if (event.target.classList.contains("minus") && number > 0) {
        number -= 1;
    } 
    str = number;
    quantity.textContent = number;
}

plus.addEventListener("click", quantityIncrement);
minus.addEventListener("click", quantityIncrement);

shoppingCart.addEventListener("click", (e) => {
    const cart = document.querySelector("#cart");
    cart.classList.toggle("cart")
    cart.classList.toggle("hide");
})

addToCart.addEventListener("click", (e) => {
    let numberQuantity = parseInt(quantity.textContent);


    if(numberQuantity > 0) {
        itemCount += numberQuantity;
        quantity.textContent = 0;
        quantityDisplay.textContent = itemCount.toString();
    }
    console.log(numberQuantity)
})