import React from 'react';
import {Component} from 'react';
import ListComponent from "./ListComponent";
import {connect} from 'react-redux';
import '../stylesCSS/App.css'
import TrelloActionButton from "./TrelloActionButton";
import Header from './Header'
import {DragDropContext} from "react-beautiful-dnd";
import {sort} from '../actions/'

class App extends Component {

  onDragEnd = (result) => {
      const {destination, source, draggableId} = result;
      if(!destination) {
          return;
      }

      this.props.dispatch(sort(
          source.droppableId,
          destination.droppableId,
          source.index,
          destination.index,
          draggableId
      ))

  }
  render() {
    const {lists} = this.props;
    return(
        <DragDropContext onDragEnd={this.onDragEnd}>
            <div className='App'>
            <Header/>
                <div className='ListContainer'>
                {lists.map(list => (<ListComponent  key={list.id} title={list.title} cards={list.cards} listID={list.id} />))}
                <TrelloActionButton  list/>
                </div>
                {/*<Footer/>*/}
            </div>
        </DragDropContext>


    );
  }
}

const mapStateToProps = (state) => ({
    lists: state.lists,
})



export default connect(mapStateToProps)(App);