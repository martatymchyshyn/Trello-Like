import CONSTANTS from '../actions/index'

const deleteList= (listID) => {
    return {
        type: CONSTANTS.DELETE_LIST,
        payload:  listID

    }
}

export default deleteList;