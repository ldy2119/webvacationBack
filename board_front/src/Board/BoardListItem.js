import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import "./Board.scss";

@inject("stores")
@observer
class BoardListItem extends Component{

    state = {
        post : null,
        userName : null
    }

    p = this.props.stores.PostStore;
    u = this.props.stores.UserStore;

    async componentDidMount()
    {
        this.setState({
            ...this.state,
            post : this.props.post
        });

        let user = await this.u.findUser(this.props.post.userId);
        this.setState({
            ...this.state,
            userName : user.nickname
        });
    }

    render(){

        let date = null;

        if(this.state.post)
        {
            date = new Date(this.state.post.created);

            return(
                <div>
                    <div>
                        <span className="board-title"><Link to={`/board/view/${this.state.post.id}`}>{this.state.post.title}</Link></span>
                        <span className="board-other">{date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()}</span>
                        <span className="board-other">{this.state.userName}</span>
                        <span className="board-other">{this.state.post.id}</span>
                        <span className="board-other">{this.state.post.recommendedCount}</span>
                        <span className="board-other">{this.state.post.showCount}</span>
                    </div>
                </div>
            );
        }
        else
        {
            return (
                <div>

                </div>
            );
        }
    }
};

export default BoardListItem;