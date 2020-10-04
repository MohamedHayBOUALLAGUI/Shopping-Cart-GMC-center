//Déclaration des variables:

//buttons declaration
let carts = document.querySelectorAll(".add-item");
console.log(carts.length)
//

let products = [
  {
    name: "PC Portable HP Gaming Pavilion 15-ec0004nk AMD Ryzen 8Go",
    tag: "pchp",
    price: 1699,
    inCart: 0,
  },
  {
    name: "PC Portable ASUS X507MA Dual-Core 4Go 500Go - Gold",
    tag: "pcasus",
    price: 729,
    inCart: 0,
  },
  {
    name: "Appareil Photo NIKON D3500 ",
    tag: "nikon",
    price: 2999,
    inCart: 0,
  },
  {
    name: "Appareil Photo CANON PowerShot SX540 HS WiFi",
    tag: "canon",
    price: 1169,
    inCart: 0,
  },
  {
    name: 'Téléviseur TCL 32" HD Android Smart',
    tag: "tvtcl",
    price: 569,
    inCart: 0,
  },
  {
    name: 'Téléviseur MAXWELL 40" HD Noir',
    tag: "tvmaxwell",
    price: 719,
    inCart: 0,
  },
  {
    name: "Montre Connecté KSIX Atlantis Fitness Band Contact Bluetooth Noir",
    tag: "lcsbhr",
    price: 79,
    inCart: 0,
  },
  {
    name: "Montre Pour Enfant ALCATEL avec GPS - Orange",
    tag: "childclock",
    price: 75,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i += 1) {
  carts[i].addEventListener("click", function () {
    itemNumbers(products[i]);
    totalCost(products[i]);
    let heartt = document.querySelectorAll(".hert");
    
    heartt[i].style.color = "red";
    heartt[i].style.transform = "scale(2,2)";
  });
  



}

function onLoadItemNumbers() {
  let productNumbers = localStorage.getItem("itemNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

//items counting
function itemNumbers(product) {
  let productNumbers = localStorage.getItem("itemNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("itemNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("itemNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

//set items
function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let itemCost = localStorage.getItem("totalCost");
  if (itemCost != null) {
    itemCost = parseInt(itemCost);
    localStorage.setItem("totalCost", itemCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}



function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let itemCost = localStorage.getItem("totalCost");
  let productContainer = document.querySelector(".products");
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
        <div class='product'>
        <ion-icon name="close-circle" id='close'></ion-icon>
            <span >${item.name} </span>
        </div>
        <div class="price"><span>${item.price},000 TND</span></div>
        <div class='quantity'>
        <ion-icon name="caret-back"></ion-icon>
        <span>${item.inCart} </span>
        <ion-icon name="caret-forward"></ion-icon>
    </div>
    <div class="total"><span>${item.price * item.inCart},000 TND</span></div>

            `;
    });

    productContainer.innerHTML += `
    <div class='basketTotalContainer'>
            <h4 class="basketTotalTitle">Basket Total</h4>
            <h4 class="basketTotal">${itemCost},000 TND </h4>
        </div>
    
    
    `;
  }
}



onLoadItemNumbers();
displayCart();
