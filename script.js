const products = [
    {
        id: 1,
        name: "Premium Product",
        price: 499,
        image: "https://placehold.co/600x600?text=Product+1"
    },
    {
        id: 2,
        name: "Smart Product",
        price: 699,
        image: "https://placehold.co/600x600?text=Product+2"
    },
    {
        id: 3,
        name: "Trending Product",
        price: 899,
        image: "https://placehold.co/600x600?text=Product+3"
    },
    {
        id: 4,
        name: "New Product",
        price: 999,
        image: "https://placehold.co/600x600?text=Product+4"
    }
];

let cart = [];


/* SHOW PRODUCTS */

function displayProducts(list = products) {

    const container = document.getElementById("products");

    container.innerHTML = "";

    list.forEach(product => {

        container.innerHTML += `
            <div class="product">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <div class="price">
                        ₹${product.price}
                    </div>

                    <button
                        class="add"
                        onclick="addToCart(${product.id})"
                    >
                        ADD TO CART
                    </button>

                </div>

            </div>
        `;
    });
}


/* ADD TO CART */

function addToCart(id) {

    const product = products.find(p => p.id === id);

    const existing = cart.find(p => p.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    openCart();
}


/* UPDATE CART */

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cartCount").innerText = count;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    } else {

        cartItems.innerHTML = "";

        cart.forEach(item => {

            cartItems.innerHTML += `

                <div class="item">

                    <div>
                        <strong>${item.name}</strong>
                        <br>
                        ₹${item.price} × ${item.quantity}
                    </div>

                    <div class="qty">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>
            `;
        });
    }


    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    document.getElementById("cartTotal").innerText = total;
}


/* CHANGE QUANTITY */

function changeQuantity(id, amount) {

    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart = cart.filter(p => p.id !== id);
    }

    updateCart();
}


/* OPEN CART */

function openCart() {

    document.getElementById("cart")
        .classList.add("open");

    document.getElementById("cartOverlay")
        .classList.add("open");
}


/* CLOSE CART */

function closeCart() {

    document.getElementById("cart")
        .classList.remove("open");

    document.getElementById("cartOverlay")
        .classList.remove("open");
}


/* SEARCH */

function searchProducts() {

    const search =
        document.getElementById("search")
        .value
        .toLowerCase();

    const filtered =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(search)
        );

    displayProducts(filtered);
}


/* WHATSAPP ORDER */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    /*
      IMPORTANT:
      YAHAN APNA WHATSAPP NUMBER DAALNA HAI.

      Example:
      India number 9876543210

      Likho:
      919876543210
    */

    const whatsappNumber = "919999999999";


    let message =
        "Hello ZEE HUB 👋%0A%0A";

    message +=
        "I want to place an order:%0A%0A";


    cart.forEach(item => {

        message +=
            `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}%0A`;
    });


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    message +=
        `%0A*Total: ₹${total}*%0A%0A`;

    message +=
        "Name:%0AAddress:%0APhone:";


    window.open(
        `https://wa.me/${whatsappNumber}?text=${message}`,
        "_blank"
    );
}


/* START WEBSITE */

displayProducts();

updateCart();
