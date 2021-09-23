import Joi from 'joi'

export const validateNewItem = item => {
    const itemSchema = Joi.object({
        productName: Joi.string().required(),
        department: Joi.string().required(),
        price: Joi.number().greater(1).required(),
        stock: Joi.number().greater(-1).required(),
        productDescription: Joi.string().required(),
        image: Joi.string().uri().required(),
    });

    const { error } = itemSchema.validate(item);

    if (error) {
        return { result: false, error }
    } else {
        return { result: true }
    }

}

export const validateUpdatedItem = item => {
    const itemSchema = Joi.object({
        id: Joi.number().greater(1).required(),
        productName: Joi.string().optional(),
        department: Joi.string().optional(),
        price: Joi.number().greater(1).optional(),
        stock: Joi.number().greater(-1).optional(),
        productDescription: Joi.string().optional(),
        image: Joi.string().uri().optional(),
    });

    const { error } = itemSchema.validate(item);

    if (error) {
        return { result: false, error }
    } else {
        return { result: true }
    }

}