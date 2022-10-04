const flowers = [
    {
        name: "All About You!",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOg_FRJ8f0rm7TO-ns3XAThADmIrCztFac-wieOUMfflM43MLB8ZgK6ktWx1MH3zI1dmc&usqp=CAU",
        price: 36.99,
        qtty: 1,
    },
    {
        name: "Big Heart",
        image: "https://cdn.euroflorist.com/Products/340x340/BOU16_017M.webp",
        price: 37.99,
        qtty: 1,
    },
    {
        name: "Tenderness",
        image: "https://cdn.euroflorist.com/Products/340x340/BOU16_050M.webp",
        price: 35.99,
        qtty: 1,
    },
    {
        name: "Fairy Dance",
        image: "https://cdn.euroflorist.com/Products/340x340/BOU15_64M.webp",
        price: 37.99,
        qtty: 1,
    },
    {
        name: "Fabulous Roses",
        image: "https://cdn.euroflorist.com/Products/340x340/BOU15_69M.webp",
        price: 59.99,
        qtty: 1,
    },
    {
        name: "Best Wishes!",
        image: "https://cdn.euroflorist.com/Products/340x340/BOU15_44M.webp",
        price: 35.99,
        qtty: 1,
    },
    {
        name: "Floral Crush",
        image: "https://cdn.euroflorist.com/Products/340x340/BOU15_30M.webp",
        price: 39.99,
        qtty: 1,
    },
    {
        name: "Sunny Favorite",
        image: "https://cdn.euroflorist.com/Products/340x340/BOU15_43M.webp",
        price: 39.99,
        qtty: 1,
    },
];

const currencyFormater = new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
});

let flowersRow = document.querySelector(".products");

for (let flower of flowers)
{
    flowersRow.innerHTML += `
    <div class="card product col my-4" style="width: 300px;">
        <img class="card-img-top mt-2 px-3" src="${flower.image}" alt="${flower.name}">
        <div class="card-body px-3 py-0">
            <h5 class="card-title">${flower.name}</h5>
            <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, libero.</p>
            <p class="card-text h3 text-end">${currencyFormater.format(flower.price)}</p>
            <p class="card-text3 d-flex justify-content-end">
                <button class="btn w-75 product-button">
                <i class="fs-4 bi bi-cart-plus"></i>
                Add to cart</button>
            </p>
        </div>
    </div>
    `;
}

//cart declared
const cart = [];

//product button selected
const addToCartBtn = document.querySelectorAll(".product-button")

for (let i = 0; i < addToCartBtn.length; i++) {
    addToCartBtn[i].addEventListener("click", function () {
        if (cart.find((val) => val.name == flowers[i].name)){
            flowers[i].qtty++;
        }
        else{
            cart.push(flowers[i]);
        }
        flowerCarts();
        cartTotal();
    }); 
}


const flowerCarts = () => {
    document.querySelector(".cart-items").innerHTML = "";

    for (let item of cart){
        document.querySelector(".cart-items").innerHTML += `
        <div class="cart-row row gx-0">
            <div class="cart-item col-6 ps-md-5 my-2 d-flex align-items-center justify-content-start">
                <img class="cart-item-image" src="${item.image}" width="100" height="100" alt="${item.name}">
                <div class="cart-item-title h5 ms-2">${item.name}</div>
            </div>
            <div class="cart-qtty-action col-2 d-flex justify-content-center align-items-center">
                <div class="d-flex">
                    <i class="plus fs-5 bi bi-plus-circle-fill"></i>
                </div>
                <div class="text-center m-0 cart-quantity h4 w-25">${item.qtty}</div>
                <div class="d-flex">
                    <i class="minus fs-5 bi bi-dash-circle-fill"></i>
                </div>
                
                </div>
                <div class="col-1 d-flex justify-content-start align-items-center">
                    <i class="del fs-4 bi bi-trash3-fill text-danger"></i>
                </div>
                <div class="cart-price col-3 h5 my-auto text-end p-2 pe-sm-5">${currencyFormater.format(item.price)}</div>
                <div>Sum per item: ${currencyFormater.format(item.price * item.qtty)}</div>       
            </div>
            <br>      
                   
        </div>
        `;
    }

    let plusBtns = document.querySelectorAll(".plus"); 
    let minusBtns = document.querySelectorAll(".minus"); 
    let delBtns = document.querySelectorAll(".del"); 

    plusBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            plusQtty(i);
        })
    })

    minusBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            minusQtty(i);
        })
    })

    delBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            deleteItem(i);
        })
    })

}

//increases item quantity
const plusQtty = (index) => {
    cart[index].qtty++;
    flowerCarts();
    cartTotal();
}

//decreases item quantity
const minusQtty = (index) => {
    if (cart[index].qtty == 1) {
        cart.splice(index, 1);
    } else {
        cart[index].qtty--;
    }
    flowerCarts();
    cartTotal();
}

//deletes item from cart
const deleteItem = (index) => {
    cart[index].qtty = 1;
    cart.splice(index, 1);
    flowerCarts();
    cartTotal();
}

//updates the cart total amount
const cartTotal = () => {
    let total = 0;
    for (let item of cart){
        total += item.price * item.qtty;
    }

    if (total < 100) {
        document.getElementById("sum").innerHTML = ``;
        document.getElementById("discount").innerHTML = ``;
        document.getElementById("price").innerHTML = currencyFormater.format(total);
    }

    if (total >= 100) {
        total * 0.9;
        document.getElementById("sum").innerHTML = `Sum: ${currencyFormater.format(total)}`;
        document.getElementById("discount").innerHTML = `Discount 10%: ${currencyFormater.format(total * 0.10)}`;
        document.getElementById("price").innerHTML = currencyFormater.format(total - (total * 0.10));
    }

    if (total > 200) {
        total * 0.8;
        document.getElementById("sum").innerHTML = `Sum: ${currencyFormater.format(total)}`;
        document.getElementById("discount").innerHTML = `Discount 20%: ${currencyFormater.format(total * 0.20)}`;
        document.getElementById("price").innerHTML = currencyFormater.format(total - (total * 0.20));
    }
}