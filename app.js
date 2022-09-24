const productsListEl = document.querySelector(".products-list");
const seeMoreBtn = document.querySelector(".see-more-btn");

seeMoreBtn.addEventListener('click', () => {
  productsListEl.scrollIntoView({
    behavior: "smooth"
  })
})

//Select Elements
const productsE1 = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subTotalE1 = document.querySelector(".subtotal");
const cartTotalE1 = document.querySelector(".total-items-in-cart");
//Render Products
function renderProducts() {

  for (let i = 0; i < products.length; i++) {
    productsE1.innerHTML += `
        <div class="item">
        <div class="item-container">
            <div class="item-img">
                <img src="${products[i].imgSrc}" alt="${products[i].name}">
            </div>
            <div class="desc">
                <h2>${products[i].name}</h2>
                <h2><small>$</small>${products[i].price}</h2>
                <p>
                    ${products[i].description}
                </p>
            </div>
            <div class="add-to-wishlist">
                <img src="./icons/heart.png" alt="add to wish list">
            </div>
            <div class="add-to-cart" onclick="addToCart(${products[i].id})">
                <img src="./icons/bag-plus.png" alt="add to cart">
            </div>
        </div>
    </div>
        `;
  }


}

renderProducts();


//cart array
let cart = JSON.parse(localStorage.getItem("CART")) ||[];
updateCart();
//Add to cart
function addToCart(productID) {
  //check if product already exist in cart
  if (cart.some((items) => items.id === productID)) {
    changeNumberOfUnits("plus", productID);
  } else {
    const item = products.find((product) => product.id === productID)
    cart.push({
      ...item,
      numbersOfUnits : 1,
    });

  }
  updateCart();
}

//update cart
function updateCart(){
  renderCartItems();
  renderSubtotal();

  //save cart to localstorage 
  localStorage.setItem("CART", JSON.stringify(cart));
}

//Calculate and render subtotal

function renderSubtotal(){
  let totalPrice = 0, totalItems = 0, i=0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numbersOfUnits;
    totalItems += item.numbersOfUnits;
    i++;
    
  });

  subTotalE1.innerHTML =`Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`
  cartTotalE1.innerHTML = i;

}

//render cart item
function renderCartItems(){
  cartItemsEl.innerHTML = "";// clear carts elements
  cart.forEach((item)=> {
    cartItemsEl.innerHTML += `
    <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numbersOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
        </div>
    `
  })

}
//Remove item from cart
function removeItemFromCart(id){
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

//Change number of units for an item
function changeNumberOfUnits(action, id){
  cart = cart.map((item) => {
    
    let numbersOfUnits = item.numbersOfUnits;
    if(item.id === id){
        if(action === "minus" && numbersOfUnits > 1){
          numbersOfUnits--;
        }
        
        else if(action === "plus"&&  numbersOfUnits < item.instock){
          numbersOfUnits++;
        }
        else{
          alert("Reached the quantity limit!!")
        }

    }
    return {
      ...item,
    numbersOfUnits,
    };
  })
  updateCart();
}
  // 
  // for(i = 0 ; i< products.length; i++){
  // cart += products[i];
  // console.log(cart);
  // }

