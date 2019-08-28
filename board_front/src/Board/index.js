import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import BoardList from "./BoardList";
import AddPost from "./AddPost";
import BoardInfo from "./BoardInfo";

import "./Board.scss";
import PostView from "./PostView";

@inject("stores")
@observer
class Board extends Component {

    state = {
        boards : null
    }

    p = this.props.stores.PostStore;

    async componentDidMount() {
        this.setState({
            ...this.state,
            boards : await this.props.stores.BoardStore.getBoard()
        })
    }

    render() {
        if(this.props.match && this.props.match.params)
        {
            if(this.props.match.params.command === "view" && this.props.match.params.postid)
                return <PostView postid={this.props.match.params.postid}/>

            //postId = boardId
            else if(this.props.match.params.command === "board" && this.props.match.params.postid)
            {
                if(this.props.match.params.pageNumber)
                {
                    return <BoardList boardId={this.props.match.params.postid} pageNumber={this.props.match.params.pageNumber}/>
                }
                else
                {
                    return <BoardList boardId={this.props.match.params.postid} pageNumber={1}/>
                }
            }
            //postId = boarId
            else if(this.props.match.params.command === "add" && this.props.match.params.postid)
                return <AddPost boardId = {this.props.match.params.postid}/>

            else if(this.props.match.params.command === "edit" && this.props.match.params.postid && this.props.match.params.pageNumber)
            {
                return <AddPost boardId = {this.props.match.params.postid} id={this.props.match.params.pageNumber}/>
            }
        }

        return(
            <div>
                <ul style={{"margin" : "20px"}}>
                    {this.state.boards && this.state.boards.map((board) => {
                        return(
                            <BoardInfo id={board.id} title={board.title} key={board.id}/>
                        );
                    })}
                </ul>
            </div>
        );
    }

}

export default Board;