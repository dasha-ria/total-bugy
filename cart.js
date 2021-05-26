const CART = {
  KEY: "basket",
  contents: [],
  init() {
    let _contents = localStorage.getItem(CART.KEY);
    this.updateDOM();
    if (_contents) {
      CART.contents = JSON.parse(_contents);
    } else {
      CART.contents = [
        {
          _id: 284,
          qty: 3,
          name: "Ulrikke",
          price: 499,
        },
      ];
    }
    CART.sync();
  },
  sync() {
    let _cart = JSON.stringify(CART.contents);
    localStorage.setItem(CART.KEY, _cart);
    CART.updateDOM();
  },
  updateDOM() {
    const cartContent = document.querySelector(".cart_content");
    cartContent.innerHTML = "";

    if (CART.contents.length === 0) {
      cartContent.innerHTML = "<p>Cart is empty.</p>";
    } else {
      CART.contents.forEach((element) => {
        console.log(element);

        const cartTemp = document.querySelector("#theCart").content;
        const cartCopy = cartTemp.cloneNode(true);

        const id = element._id;
        const labelEl = cartCopy.querySelector(".itemName");
        labelEl.textContent = element.name;
        labelEl.setAttribute("for", "fid-" + id);

        const inputEl = cartCopy.querySelector("input");
        inputEl.id += id;
        inputEl.name += id;
        inputEl.value = element.qty;

        inputEl.addEventListener("change", () => {
          const itemQty = inputEl.valueAsNumber;
          element.qty = itemQty;
          console.log(element);
          CART.update(element);
        });

        inputEl.addEventListener("focus", (e) => {
          e.target.select();
        });

        const minusBtn = cartCopy.querySelector(".minus");
        minusBtn.addEventListener("click", () => {
          CART.minusOne(id);
        });

        const plusBtn = cartCopy.querySelector(".plus");
        plusBtn.addEventListener("click", () => {
          CART.plusOne(id);
        });

        const priceEl = cartCopy.querySelector(".price-each span");
        priceEl.textContent = element.price;
        const priceAll = cartCopy.querySelector(".price-row span");
        const prodTotal = element.price * element.qty;
        priceAll.textContent = prodTotal;

        cartContent.appendChild(cartCopy);
      });
    }
  },

  add(obj) {
    const index = CART.contents.findIndex((element) => element._id == obj._id);
    if (index == -1) {
      console.log(obj);
      obj.qty = 1;
      console.log(CART.contents);
      CART.contents.push(obj);
    } else {
      CART.contents[index].qty += 1;
    }

    console.log(CART.contents);
    this.sync();
  },
  update(obj) {
    const index = CART.contents.findIndex((element) => element._id == obj._id);
    if (obj.qty === 0) {
      CART.contents.splice(index, 1);
    } else {
      CART.contents[index].qty = obj.qty;
    }
    CART.sync();
  },

  minusOne(id) {
    const indexObj = CART.contents.find((element) => element._id == id);
    indexObj.qty--;
    console.log(indexObj);
    CART.update(indexObj);
  },

  plusOne(id) {
    const indexObj = CART.contents.find((element) => element._id == id);
    indexObj.qty++;
    console.log(indexObj);
    CART.update(indexObj);
  },
};

CART.init();
