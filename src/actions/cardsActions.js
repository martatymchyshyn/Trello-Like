import CONSTANTS from '../actions/index'

const addCard = (listID, text, newCardIndex) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {listID, text, newCardIndex }

    }
}

export default addCard;