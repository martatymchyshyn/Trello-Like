import express from 'express'

const router = express.Router()

const db = [
    {
        id: 0,
        title: 'To Do',
        cards: [
            {
                id: 0,
                text: 'First card',
                listId: 0,
                index: 0,
                timestamp: Date.now()
            },
            {
                id: 1,
                text: "Second card",
                listId: 0,
                index: 1,
                timestamp: Date.now()
            },
            {
                id: 2,
                text: "Third card",
                listId: 0,
                index: 2,
                timestamp: Date.now()
            }
        ],
    },
    {
        id: 1,
        title: 'In Progress',
        cards: [],
    }
]

router.get('/', (req, res) => {
    console.log("Received request to fetch all lists")
    console.log(db)
    db.forEach(list => list.cards.sort((a, b) => a.index > b.index ? 1 : -1));
    console.log(db)
    res.status(200)
    res.send(db)
})

router.post('/', ((req, res) => {
    console.log(req.params)
    console.log(`Received request to create list with title: ${req.body.title}`)

    const newList = {
        id: db.length,
        title: req.body.title,
        cards: []
    }

    db.push(newList)
    res.status(201)
    res.send(newList)
}))

router.post('/:listId/cards', ((req, res) => {
    const listId = +req.params.listId;
    console.log(`Received request to add new card to list with id:${listId}`)
    console.log(req.body)
    const retrievedList = retrieveListById(listId)
    const newCard = {id: calculateNewCardId(), text: req.body.text, listId: listId, index: req.body.index, timestamp: Date.now()}
    addCardToList(retrievedList, newCard)
    res.status(200)
    res.send(newCard)
}))


router.put('/:id/cards/:cardId', (req, res) => {
    console.log(req.body)

    const oldListId = +req.params.id;
    const cardId = +req.params.cardId;

    const newListId = +req.body.listId;
    const index = +req.body.index;

    const swappingData = {
        listFromId: oldListId,
        listToId: newListId,
        cardId: cardId,
        index: index
    }

    console.log(swappingData)

    swapCardBetweenLists(swappingData)

    res.status(200)
    res.send()
})

router.delete('/:id', ((req, res) => {
    const listIdToDelete = +req.params.id;
    deleteList(listIdToDelete)
    res.status(200)
    res.send()
}))

router.delete('/:id/cards/:cardId', ((req, res) => {
    const listId = +req.params.id;
    const cardId = +req.params.cardId;
    console.log(req.params)
    deleteCardFromList(retrieveListById(listId), retrieveCardFromListById(retrieveListById(listId), cardId))
    res.status(200)
    res.send()
}))

function calculateNewCardId() {
    const cards = db.map((list) => list.cards).flat(1)
    return cards.length
}

function swapCardBetweenLists(swappingData) {
    const listFrom = retrieveListById(swappingData.listFromId);
    console.log(`listFrom: ${listFrom}`)
    const cardToSwap = retrieveCardFromListById(listFrom, swappingData.cardId);

    deleteCardFromList(listFrom, cardToSwap);

    cardToSwap.index = swappingData.index
    cardToSwap.listId = swappingData.listToId
    cardToSwap.timestamp = Date.now();

    const listTo = retrieveListById(swappingData.listToId)
    console.log(`listTo: ${listTo}`)
    addCardToList(listTo,cardToSwap)
}

const addCardToList = (list, card) => {
    list.cards.push(card)
    applyListChange(list)
}

const deleteCardFromList = (list, card) => {
    list.cards = list.cards.filter(c => c.id !== card.id)
    applyListChange(list)

}

const applyListChange =  newList => {
    const index = db.findIndex(l => l.id === newList.id);
    db[index] = newList;
}

const deleteList = listId => {
    const index = db.findIndex(l => l.id === listId);
    db.splice(index, 1)
}


function retrieveListById(listId) {
    return db.find((list) => {
        return list.id === listId
    })
}

function retrieveCardFromListById(list, cardId) {
    return list.cards.find(card => card.id === cardId);

}

export default router;
