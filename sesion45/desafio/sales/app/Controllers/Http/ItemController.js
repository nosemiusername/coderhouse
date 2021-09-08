'use strict'
const Item = use('App/Models/Item')
class ItemController {

    async getAll({ views, request, response }) {
        return await Item.all();
    }

    async get({ views, request, response }) {
        const { id } = request.params
        return await Item.find(id);
    }

    async add({ views, request, response }) {
        const newItem = request.body
        const item = new Item()
        item.fill({ ...newItem })
        item.save()
        return await item
    }

    async delete({ views, request, response }) {
        const { id } = request.params
        const user = await Item.find(id)
        if (user) {
            await user.delete()
        }
        return user
    }

}

module.exports = ItemController
