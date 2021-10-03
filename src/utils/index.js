/** Transform MongoObject in Manipulable Object */
export const mongoToObject = (res) => res == null ? [] : (!Array.isArray(res) ? [res.toObject()] : res.map(item => item.toObject()));
