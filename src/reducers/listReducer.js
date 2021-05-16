import CONSTANTS from "../actions/index";
import axios from "axios"

let listID = 2;
let cardID = 8;
const initialState = [
    {
        title: 'To Do',
        id: 0,
        cards: [
            {
                id: 0,
                text: 'First card'
            },
            {
                id: 1,
                text: "Second card"
            },
            {
                id: 2,
                text: "Third card"
            }
        ],
    },
    {
        title: 'In Progress',
        id: 1,
        cards: [
            /*{
                id: 3,
                text: 'First card'
            },
            {
                id: 4,
                text: "Second card"
            },
            {
                id: 5,
                text: "Third card"
            },
            {
                id: 6,
                text: "Second card"
            },
            {
                id: 7,
                text: "Third card"
            }*/
        ],
    }
]




const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LIST:

            const listBody = {
                title: action.payload
            }

          axios.post('http://localhost:8090/lists/', listBody).then(response => console.log(response.data))

            const newList = {
                id: listID,
                title: action.payload,
                cards: [],


            }
            listID += 1;
            console.log(newList)
            return [...state, newList]
        case CONSTANTS.ADD_CARD:
            const cardBody = {
                text: action.payload,
                listID: action.payload.listID,
                index: action.payload.nextCardIndex
            }


            axios.post(`http://localhost:8090/lists/${cardBody.listID}/cards`, cardBody).then(response => console.log(response.data))
            const newCard = {
                id: cardID,
                text: action.payload.text,

            }
            cardID += 1;
            return state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }

                } else {
                    return list;
                }
            });

        case CONSTANTS.DRAG_HAPPENED:
            const dragBody = {
                listId:action.payload.droppableIdEnd,
                index:action.payload.droppableIndexEnd,
            }
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId
            } = action.payload

            axios.put(`http://localhost:8090/lists/${droppableIdStart}/cards/${draggableId}`, dragBody).then(response => console.log(response.data))

            const newNewState = [...state];
            if (droppableIdStart === droppableIdEnd) {
                console.log(droppableIdStart)
                const list = state.find(list => droppableIdStart === String(list.id));
                console.log(state)
                console.log(list)
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }

            if(droppableIdStart !== droppableIdEnd) {
                const listStart = state.find(list => droppableIdStart === String(list.id));
                console.log(listStart)
                const card = listStart.cards.splice(droppableIndexStart, 1);
                console.log(droppableIdStart)
                const  listEnd = state.find(list => droppableIdEnd === String(list.id));
                console.log(listEnd)
                listEnd.cards.splice(droppableIndexEnd, 0, ...card)
                console.log(droppableIdEnd)
            }
            return newNewState;
        case CONSTANTS.DELETE_CARD:

            const deletedCard = {
                cardID: action.payload.cardID
            }
            axios.delete(`http://localhost:8090/lists/${action.payload.listId}/cards/${action.payload.cardID}`).then(response => console.log(response.data))
            console.log(state)
            const deletedState = () => {

                return state.map(item => {
                    const resultObjects = [];
                    const resultArr = item.cards.filter(card => card.id !== deletedCard.cardID)
                    resultArr.forEach(item => {
                        const itemObject = {
                            id: item.id,
                            text: item.text,
                        }
                        resultObjects.push(itemObject)
                    })
                    return {...item, ...{cards: resultObjects}}
                })
            };

                console.log(state);
                return deletedState()
        case CONSTANTS.DELETE_LIST:



            const deletedList = {
                listID: action.payload
            }
            axios.delete(`http://localhost:8090/lists/${deletedList.listID}`).then(response => console.log(response.data))
            const deletedStateList = () => {
                 const result = []
                 state.map(item => {
                    console.log(item.id)
                    console.log(deletedList.listID)
                    if(item.id !== deletedList.listID) {
                        result.push(item)
                    }
                })
                console.log(result)

                return result;
            };

             return deletedStateList();

            default:
                return state
            }

    }
    ;

    export default listsReducer;