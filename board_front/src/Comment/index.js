import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import CommentItem from "./CommentItem";

@inject("stores")
@observer
class Comment extends Component {

    postId = null;

    state = {
        content : "",
        comments : null
    }

    u = this.props.stores.UserStore;
    c = this.props.stores.CommentStore;

    async componentDidMount() {
        this.postId = this.props.postId;
        await this.getComment();
    }

    updateComment = (event) => {
        this.setState({
            ...this.state,
            content : event.target.value
        });
    };

    getComment = async () => {
        this.setState({
            ...this.state,
            comments : await this.c.getComment(this.postId)
        });
    }

    addComment = async () =>
    {
        if(this.state.content !== "")
        {
            await this.c.AddComment(this.postId, this.u.user.id, this.state.content);
            this.setState({
                ...this.state,
                content : ""
            });
            await this.getComment();
        }
        else
        {
            alert("댓글을 입력해주세요.");
        }
    }

    render()
    {

        let addCo = null;
        if(this.u.user)
        {
            addCo =
                <div>
                    댓글을 입력해주세요 : <input type="text" onChange={this.updateComment} value={this.state.content}/><br/>
                    <button onClick={this.addComment}>댓글 달기</button>
                </div>;
        }

        return(
            <div>
                코멘트<br/>
                <hr/><br/>
                {this.state.comments && this.state.comments.map(comment => {

                    return(
                        <div key={comment.id}>
                            <CommentItem userId = {comment.userId} commentId = {comment.id} content = {comment.content} date = {comment.created}/>
                        </div>
                    )
                })}
                {addCo}
            </div>
        )

    }

}

export default Comment;