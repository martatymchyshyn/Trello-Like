import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../stylesCSS/CardComponent.css'
import Card from "@material-ui/core/Card";
import {Draggable} from "react-beautiful-dnd";
import styled from 'styled-components';
import Icon from "@material-ui/core/Icon";
/*import store from "../store/store";*/
import deleteCard from "../actions/deleteCard";
import  {connect} from "react-redux";


const CardContainer = styled.div`
    margin-bottom: 8px
`

const CardComponent = ({text, id, index, dispatch, listId}) => {
   /* const card_id = store*/
    const handleDeleteCard = () => {
        console.log(listId)
        console.log(id)
        dispatch(deleteCard(id, listId))
    }

    return(
        <Draggable draggableId={String(id)} index={index}>
            {(provided) => (
                <CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

                        <Card>
                            <CardContent className='card'>
                                <Typography  color="textSecondary" gutterBottom>
                                    {text}
                                </Typography>
                                <Icon onClick={handleDeleteCard} color="disabled" style={{marginLeft: 8, cursor: 'pointer'}}>close</Icon>

                            </CardContent>
                        </Card>

                </CardContainer>
            )}

        </Draggable>
    )
}

export default connect()(CardComponent);