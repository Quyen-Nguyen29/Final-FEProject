let appState = {
  shoppingCart: [
    {
      id: 2,
      image: "./images/pro2.jpg",
      name: "interior",
      price: 12.99,
      quantity: 1
    },
    {
      id: 3,
      image: "./images/pro3.jpg",
      name: "interior",
      price: 12.99,
      quantity: 2
    }
  ],
  products: [
    {
      id: 1,
      image: "./images/pro1.jpg",
      name: "interior",
      price: 10.99
    },
    {
      id: 2,
      image: "./images/pro2.jpg",
      name: "interior",
      price: 12.99
    },
    {
      id: 3,
      image: "./images/pro3.jpg",
      name: "interior",
      price: 12.99
    },
    {
      id: 4,
      image: "./images/pro4.jpg",
      name: "interior",
      price: 22.99
    },
    { id: 5, image: "./images/pro5.jpg", name: "interior", price: 24.99 },
    { id: 6, image: "./images/pro6.jpg", name: "interior", price: 32.99 },
    { id: 7, image: "./images/pro7.jpg", name: "interior", price: 45.99 },
    { id: 8, image: "./images/pro8.jpg", name: "interior", price: 32.99 },
    { id: 9, image: "./images/pro9.jpg", name: "interior", price: 37.99 },
    { id: 10, image: "./images/pro11.jpg", name: "interior", price: 23.99 },
    { id: 11, image: "./images/pro12.jpg", name: "interior", price: 13.99 }
  ]
};

render(appState);

function render() {
  const body = document.querySelector("body");
  let template = `
  ${renderNavBar()}
  ${renderBanner()}
  ${renderProducts()}
  ${renderShoppingcart()}
    `;
  body.innerHTML = template;
}

//render Navbar
function renderNavBar() {
  return `
  <!-- navbar -->
  <nav class="navbar">
    <div class="navbar-center">
      <span class="nav-icon">
        <i class="fas fa-bars"></i>
      </span>
      <img src="images/logo-interior.jpg" alt="Logo" />
      <div class="cart-btn">
        <span class="nav-icon">
          <i class="fas fa-cart-plus cart-icon"></i>
        </span>
        <cart class="cart-items">0</cart>
      </div>
    </div>
  </nav>
  <!-- end of  navbar -->
    `;
}

//end of render Navbar
//render banner
function renderBanner() {
  return `
  <!-- hero -->
  <header class="hero">
    <div class="banner">
      <h1 class="banner-title">Furniture Collection</h1>
      <button class="banner-btn">Shop now</button>
    </div>
  </header>
  <!-- end of hero -->
`;
}
// End render banner
//Render products
function renderProducts() {
  return `
  <!-- products     -->
  <section class="products">
  <div class="section-title">
      <h2>our products</h2>
     </div>
     <div class="products-center">
     ${renderProductItems(appState)}
    </div>
    </section>
    <!-- end of products     -->
  `;
}

//render product list
function renderProductItems(state) {
  let productsString = state.products.map(function(item) {
    return `
    <!-- single product -->
    <article class="product">
      <div class="img-container">
        <img
          src="${item.image}"
          alt="product"
          class="product-img"
        />
        <button class="add-to-cart-btn" data-id="${item.id}">
          <i class="fas fa-shopping-cart"></i>add to cart
        </button>
      </div>
      <h3>${item.name}</h3>
      <h4>$${item.price}</h4>
    </article>
    <!-- end of single product -->
    
    `;
  });
  return productsString.join("");
}
//end of render product list
//End of render products

//Render shoppingCart
function renderShoppingcart(state) {
  return `
  <!-- cart -->
    <div class="cart-overlay">
      <div class="cart">
        <span class="close-cart">
          <i class="fas fa-window-close"></i>
        </span>
        <h2>your cart</h2>
        <div class="cart-content">
        ${renderCartItem(appState)}
        </div>
        ${renderCartFooter(appState)}
        </div>
        </div>
 <!-- end of cart -->
  `;
}

//render cart items
function renderCartItem(state) {
  const shoppingCartElements = state.shoppingCart.map(function(item) {
    return `
    <!-- cart item -->
              <div class="cart-item">
                <img src="${item.image}" alt="product" />
                <div>
                  <h4>${item.name}</h4>
                  <h5>$${item.price}</h5>
                  <span class="remove-item">remove</span>
                </div>
                <div>
                  <i class="fas fa-chevron-up"></i>
                  <p class="item-amount">${item.quantity}</p>
                  <i class="fas fa-chevron-down"></i>
                </div>
              </div>
              <!-- End of  cart item -->   
    `;
  });
  return shoppingCartElements.join("");
}
//End of render cart items

//Render cart footer
function renderCartFooter(state) {
  const totalCart = state.shoppingCart.reduce(function(sum, item) {
    sum = sum + item.price * item.quantity;
    return sum;
  }, 0);
  return `
  <div class="cart-footer">
        <h3>your total :$ <span class="cart-total">${totalCart}</span></h3>
        <button class="clear-cart banner-btn">clear cart</button>
        </div>
    `;
}
//End of Render cart footer
//End of Render shoppingCart

function bindEvents() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach(function(addToCartBtn) {
    addToCartBtn.addEventListener("click", function() {
      let productId = addToCartBtn.dataset.id;
      let product = appState.products.find(function(item) {
        return item.id == productId;
      });
      const cartItemWithProductId = appState.shoppingCart.find(function(item) {
        return item.id == productId;
      });
      if (cartItemWithProductId !== undefined) {
        cartItemWithProductId.quantity += 1;
      } else {
        const cartItem = {
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          quantity: 1
        };
        appState.shoppingCart.push(cartItem);
      }
    });
  });
}
