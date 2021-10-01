import moment from 'moment';

const ItemDto = (item) => {

    return {
        ...
        item,
        uptaded_at: moment().toString()
    }
}

export default ItemDto;