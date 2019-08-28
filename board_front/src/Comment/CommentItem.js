import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import "./Comment.scss";

@inject("stores")
@observer
class CommentItem extends Component {

    state = {
        commentId : null,
        userId : null,
        userName : null,
        content : null,
        date : null,
        imagePath : null
    }

    u = this.props.stores.UserStore;
    c = this.props.stores.CommentStore;

    async componentDidMount() {
        let user = await this.u.findUser(this.props.userId);

        this.setState({
            ...this.state,
            commentId : this.props.commentId,
            userId : this.props.userId,
            userName : user.nickname,
            content : this.props.content,
            date : this.props.date,
            imagePath : user.imagePath
        });

        console.log(typeof(this.state.date));

    }

    render()
    {
        let date = new Date(this.state.date);
        return(
            <div>
                <img width="50px" height="50px" src={`http://localhost:8080/attachment/${this.state.imagePath}`} alt=""/>
                <span className="comment-title">{this.state.userName}</span>
                <span className="comment-date">
                    {date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()}
                </span><br/>
                {this.state.content}
            </div>
        )
    }
}

export default CommentItem;