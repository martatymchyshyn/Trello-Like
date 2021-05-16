import CONSTANTS from '../actions/index'

const addCard = (listID, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {listID, text, }

    }
}

export default addCard;