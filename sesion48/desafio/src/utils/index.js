
export const mongoToObject = (res) => res == null ? null : (!Array.isArray(res) ? res.toObject() : res.map(item => item.toObject()));
