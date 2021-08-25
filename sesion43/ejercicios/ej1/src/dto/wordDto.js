import moment from 'moment';

const wordDto = (word) => {

    return {
        ...word,
        update_at: moment.toString(),
    }

}

export default wordDto;