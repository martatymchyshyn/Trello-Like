import CONSTANTS from '../actions/index'

const deleteCard = ( cardID) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload:  cardID

    }
}

export default deleteCard;