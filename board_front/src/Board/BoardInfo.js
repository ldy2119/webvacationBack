import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

import "./Board.scss";

@inject("stores")
@observer
class BoardInfo extends Component {

    state = {
        title : null,
        id : null,
        currentPostList : null
    }

    async componentDidMount() {
        this.setState({
            ...this.state,
            title : this.props.title,
            id : this.props.id,
            currentPostList : await this.props.stores.PostStore.getCurrentPost(this.props.id)
        })
    }

    render() {
        // if(this.props.match && this.props.match.params.command === "view" && this.props.match.params.postid)
        //     return <PostView postid={this.props.match.params.postid}/>
        // else if(this.props.location && this.props.location.pathname === "/board/add")
        //     return <AddPost/>
        // else if(this.props.match && this.props.match.params.command && this.props.match.params.command === "edit" && this.props.match.params.postid)
        // {
        //     return <AddPost id={this.props.match.params.postid}/>
        // }

        // let p = this.props.stores.PostStore;
        //
        // return(
        //     <div>
        //         {p.items && <BoardList items={p.items} />}
        //     </div>
        // );

        return(
            <div className="board-info">
                <Link to={`/board/board/${this.state.id}`}>{this.state.title}</Link><br/>
                <ul style={{"margin" : "20px"}}>
                    {this.state.currentPostList && this.state.currentPostList.map((post) => {
                        let content = post.content.length > 10 ? post.content.substring(0, 10) + "..." : post.content;
                        return(
                            <li key={post.id}>
                                <Link to={`/board/view/${post.id}`}>
                                    {post.title}<br/>
                                    {content}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

}

export default BoardInfo;