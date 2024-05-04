class Product {
    #id;
    #name;
    #price;
    #quantity;

    // constructor() {}

    setId(id) {
        this.#id = id;
    }

    getId() {
        return this.#id;
    }

    setName(name) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }

    setPrice(price) {
        this.#price = price;
    }

    getprice() {
        return this.#price;
    }

    setQuantity(quantity) {
        this.#quantity = quantity;
    }

    getQuantity() {
        return this.#quantity;
    }
}

export default Product;
