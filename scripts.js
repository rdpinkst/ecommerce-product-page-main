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
const quantityDisplay = document.querySelector(".orange-circle");
const deleteItem = document.querySelector(".delete");
const itemsInCart = document.querySelector(".full");
const emptyCart = document.querySelector(".empty");
const cartStyles = document.querySelector(".different-cart");
const picturesClick = document.querySelector(".sneaker-previews");
const modal = document.querySelector(".lightbox");
const modalBackground = document.querySelector(".lightbox-overlay");
const closeModal = document.querySelector(".close-mask");

let itemCount = 0;
let widthScreen = window.matchMedia("(min-width: 1440px)");


if(widthScreen.matches) {
    sneakerPic.addEventListener("click", lightBox)
}

widthScreen.addEventListener("change", (mm) => {
    if(mm.matches) {
        sneakerPic.addEventListener("click", lightBox);
    } else {
        sneakerPic.removeEventListener("click", lightBox);
    }
})


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
picturesClick.addEventListener("click", changePictureDesktop);

function changePictureDesktop(event) {
    // //Remove current active styling
    // const currentActive = document.querySelector(".active");
    // currentActive.classList.remove("active");

    //Get src current and manipulate to make clicked image
    const strPic = sneakerPic.getAttribute("src");
    const arr = strPic.split("-");
    const lastIndex = arr.length - 1;
    const currActiveNumber = arr[lastIndex][0];
    console.log(currActiveNumber, event.target.dataset.index)
    arr[lastIndex] = event.target.dataset.index + arr[lastIndex].slice(1);

    if(event.target.dataset.index !== currActiveNumber) {
        const currentActive = document.querySelector(".active");
        currentActive.classList.remove("active");
    }
    
    const newSrc = arr.join("-")

    //Add active class
    event.target.parentElement.classList.add("active");
    sneakerPic.setAttribute("src", newSrc);

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

    //Input names
    const itemBuying = document.querySelector(".item-name");
    const priceItem = document.querySelector(".price-item");
    const quantityItem = document.querySelector(".quantity-item-buy");
    const totalCost = document.querySelector(".total-cost");
    

    //Get item name and cost
    const itemName = document.querySelector(".sneaker-name").textContent;
    const price = parseInt(document.querySelector(".price").textContent.split("$")[1])
    

    cart.classList.toggle("cart");
    cart.classList.toggle("hide");

    if(itemCount === 0) {
        itemsInCart.classList.add("hide");
        emptyCart.classList.remove("hide");

    } else {
        console.log(itemCount)
        itemsInCart.classList.remove("hide");
        emptyCart.classList.add("hide");
        cartStyles.classList.remove("cart-item");
        cartStyles.classList.add("full-cart-item");

        itemBuying.textContent = itemName;
        priceItem.textContent = "$" + price.toString();
        quantityItem.textContent = itemCount.toString();
        totalCost.textContent = "$" + (price * itemCount).toString();
    }
})

addToCart.addEventListener("click", (e) => {
    let numberQuantity = parseInt(quantity.textContent);


    if(numberQuantity > 0) {
        itemCount += numberQuantity;
        quantity.textContent = 0;
        quantityDisplay.textContent = itemCount.toString();
    }
})

deleteItem.addEventListener("click", () => {
    itemCount = 0;
    quantityDisplay.textContent = "";
    itemsInCart.classList.add("hide");
    emptyCart.classList.remove("hide");
    cartStyles.classList.add("cart-item");
    cartStyles.classList.remove("full-cart-item");
})

// If no items in cart
// Add .cart-item
function lightBox() {
    const lightBoxPicture = document.querySelector(".main-sneaker-lightbox");
    let currentPicture = sneakerPic.getAttribute("src");

    console.log(currentPicture)
    lightBoxPicture.setAttribute("src", currentPicture)

    modal.setAttribute("style", "display: block");
    modalBackground.setAttribute("style", "display: block");


    console.log("Light Box")
}

closeModal.addEventListener("click", (event) => {
    modal.setAttribute("style", "display: none");
    modalBackground.setAttribute("style", "display: none");
})