import React, {Component} from 'react';
import Icon from "@material-ui/core/Icon";
import '../stylesCSS/ActionButton.css'
import Card from "@material-ui/core/Card";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import  {connect} from "react-redux";
import {addList} from '../actions';
import addCard from '../actions/cardsActions'


class TrelloActionButton extends Component {

    state = {
        formOpen: false,
        text: ''
    }

    renderAddButton = () => {
        const {list} = this.props;
        const buttonText = list ? 'Add another list' : 'Add another card';
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? 'black' : 'inherit';
        const buttonTextBack = list ? '#e6d930' : 'inherit';
        
        return (
            <div
                onClick={this.openForm}

                style={{opacity: buttonTextOpacity, color: buttonTextColor, backgroundColor: buttonTextBack }} className='ActionButton'>
                <Icon>add</Icon>
                <p >{buttonText}</p>
            </div>
        )
    }
    openForm = () => {
        this.setState(
            {formOpen:  true}
        )
    }
    closeForm = () => {
        this.setState(
            {formOpen:  false}
        )
    }

    handleInputChange = (e) => {
        this.setState({
            text: e.target.value
        })

    }

    handleAddList = () => {
        const { dispatch } = this.props;
        const { text } = this.state;


        if(text) {
            dispatch(addList(text))
            this.setState({text: ''});

        }

    }

    handleAddCard = () => {
        const {dispatch, listID, nextCardIndex} = this.props;
        const {text} = this.state;
        console.log(nextCardIndex)

        if(text) {
            dispatch(addCard(listID, text, nextCardIndex))
            this.setState({text: ''});
        }

    }

    renderForm = () => {
        const {list} = this.props;
        const placeholder = list ? 'Enter list title' : 'Enter a title for this card';
        const buttonTitle = list ? 'Add List' : 'Add Card';
        return (
            <div>
                <Card className='action-card'>
                    <TextareaAutosize
                        className='text-area'
                        placeholder={placeholder}
                        autoFocus
                        onBlur={this.closeForm}
                        aria-valuemax={this.state.text}
                        onChange={this.handleInputChange}
                    />
                </Card>
                <div className='formButtonGroup'>
                    <Button
                        onMouseDown={list ? this.handleAddList : this.handleAddCard}
                        variant='contained'
                        style={{
                            color: 'white',
                            backgroundColor: '#13ba5e'
                        }}>{buttonTitle}{" "}</Button>
                    <Icon style={{marginLeft: 8, cursor: 'pointer'}}>close</Icon>
                </div>
            </div>

        )
    }



    render() {
        return this.state.formOpen ? this.renderForm() :  this.renderAddButton();
    }
}

export default connect()(TrelloActionButton);