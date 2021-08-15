import Joi from '@hapi/Joi'

export const validate = item => {
    const itemSchema = Joi.object({
        id: Joi.number().greater(1).required(),
        productName: Joi.string().alphanum().required(),
        department: Joi.string().alphanum().required(),
        price: Joi.number().greater(1).required(),
        stock: Joi.number().greater(-1).required(),
        productDescription: Joi.string().alphanum().required(),
        image: Joi.string().alphanum().required(),
    });

    const { error } = itemSchema.validate(item);

    if (error) {
        return { result: false, error }
    } else {
        return { result: true }
    }

}