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

    getPrice() {
        return this.#price;
    }

    setQuantity(quantity) {
        this.#quantity = quantity;
    }

    getQuantity() {
        return this.#quantity;
    }

    async create() {
        try {
            const response = await fetch(
                'http://localhost:3000/api/products/',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: this.getName(),
                        price: this.getPrice() * 100,
                        quantity: this.getQuantity(),
                    }),
                }
            );

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    async readAll() {
        try {
            const response = await fetch('http://localhost:3000/api/products/');

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    async readOne() {
        try {
            const response = await fetch(
                `http://localhost:3000/api/products/${this.getId()}`
            );

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    async update() {
        try {
            const response = await fetch(
                `http://localhost:3000/api/products/${this.getId()}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: this.getName(),
                        price: this.getPrice() * 100,
                        quantity: this.getQuantity(),
                    }),
                }
            );

            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    async delete() {
        try {
            const response = await fetch(
                `http://localhost:3000/api/products/${this.getId()}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}

export default Product;
