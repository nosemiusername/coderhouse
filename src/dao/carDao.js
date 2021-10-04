export default class CartDao {
    async findOne(email, status = "pending") {
        throw new Error('pending implementation!');
    };
    async updateCart(email, address, productId, quantity = 1, discount = false, productName, price, image) {
        throw new Error('pending implementation!');
    };
    async changeStatus(user) {
        throw new Error('pending implementation!');
    }
    async deleteCart(user) {
        throw new Error('pending implementation!');
    };
    async getAllItems(email) {
        throw new Error('pending implementation!');
    }
}