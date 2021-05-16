import React from 'react';
import '../stylesCSS/ListComponent.css'
import CardComponent from "./CardComponent";
import TrelloActionButton from "./TrelloActionButton";
import {Droppable} from "react-beautiful-dnd";
import Icon from "@material-ui/core/Icon";
import deleteList from "../actions/deleteList";
import  {connect} from "react-redux";

const ListComponent = ({title, cards, listID, dispatch}) => {

    const handleDeleteList = () => {
        dispatch(deleteList(listID))
    }

    return(
        <Droppable droppableId={String(listID)}>
            {(provided) => (<div {...provided.droppableProps} ref={provided.innerRef} className='ListComponent'>
                <div className='header'>
                    <h4>{title}</h4>
                    <Icon  onClick={handleDeleteList} color="#fff" style={{marginLeft: 8, cursor: 'pointer', paddingTop: 22, paddingRight: 15 }}>close</Icon>
                </div>
                {cards.map((card, index) => (<CardComponent  key={card.id} index={index} text={card.text} id={card.id}/>))}
                <TrelloActionButton listID={listID}/>
                {provided.placeholder}
            </div>)}

        </Droppable>
    )
}

export default connect()(ListComponent);