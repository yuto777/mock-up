// ローカルストレージキー
const CART_STORAGE_KEY = "cartData";
// カートデータを格納
let cart = [];

// ページが読み込まれた後の処理
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = document.body.dataset.page;
    // "Add to Cart" ボタンのクリックイベントを設定
    const addToCartButtons = document.querySelectorAll(".btn-success");
    console.log("tetete")
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productCard = event.target.closest(".card");
            const productTitle = productCard.querySelector(".card-title").textContent;
            const productPrice = productCard.querySelector(".card-text").textContent;

            // 商品情報をカートに追加
            addToCart(productTitle, productPrice);
        });
    });
    // ホームページでのみ「Add to Cart」を設定
    if (currentPage === "home") {
        initializeAddToCart();
    }
    // カートページでのみカートデータを表示
    if (currentPage === "cart") {
        console.log('cart')
        displayCart();
    }
    // カートの初期化
    updateCartCount();
});

// カートに商品を追加
function addToCart(title, price) {
    const cart = getCartData();
    cart.push({ title, price });
    saveCartData(cart);
    updateCartCount();
    alert(`Added "${title}" to the cart!`);
}

// カートデータを表示
function displayCart() {
    const cart = getCartData();
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    // カートが空の場合の表示
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-center">Your cart is empty.</p>`;
        if (cartTotalElement) {
            cartTotalElement.textContent = "$0.00";
        }
        return;
    }

    // カートアイテムのリストを生成
    let total = 0;
    cartItemsContainer.innerHTML = "";
    cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace("$", ""));
        total += price;

        const cartItem = document.createElement("div");
        cartItem.className = "list-group-item d-flex justify-content-between align-items-center";
        cartItem.innerHTML = `
            <span>${item.title}</span>
            <span>${item.price}</span>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    console.log("Total Price:", total);

    // 合計金額を更新
    if (cartTotalElement) {
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }
}

// カートから商品を削除
function removeFromCart(index) {
    const cart = getCartData();
    cart.splice(index, 1);
    saveCartData(cart);
    displayCart();
}

// カートデータの保存と取得
function getCartData() {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
}

function saveCartData(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// カート内の合計数を更新
function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        const cart = getCartData();
        cartCountElement.textContent = cart.length;  // カート内の商品数を表示
    } else {
        console.error("Cart count element not found!");
    }
}

// ホームページで「Add to Cart」ボタンを設定
function initializeAddToCart() {
    const addToCartButtons = document.querySelectorAll(".btn-success");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productCard = event.target.closest(".card");
            const productTitle = productCard.querySelector(".card-title").textContent;
            const productPrice = productCard.querySelector(".card-text").textContent;
            addToCart(productTitle, productPrice);
        });
    });
}
