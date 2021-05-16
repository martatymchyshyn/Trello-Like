import CONSTANTS from '../actions/index'

const deleteCard = ( cardID, listId) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload:  {cardID, listId}

    }
}

export default deleteCard;