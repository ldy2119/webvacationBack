import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from "react-router-dom";
import Comment from "../Comment/index";

import "./Board.scss"

@inject("stores")
@observer
class PostView extends Component{

    state = {
        goToList : false,
        post : null,
        userName : null,
        imagePath : null,
        editPost : null
    }

    p = this.props.stores.PostStore;
    u = this.props.stores.UserStore;

    postId = null;

    async getPost() {
        this.setState({
            ...this.state,
            post : await this.p.getPost(this.postId)
        });
        let user = await this.u.findUser(this.state.post.userId);
        this.setState({
            ...this.state,
            userName : user.nickname,
            imagePath : user.imagePath,
            editPost : `/board/edit/${this.state.post.boardId}/${this.props.postid}`
        });
    }

    async componentDidMount() {
        this.postId = this.props.postid;
        await this.p.addShowCount(this.postId);
        await this.getPost();
    }

    deletePost = async () =>
    {
        if(window.confirm("삭제하시겠습니까?") === false)
            return;
        if(await this.props.stores.PostStore.deletePost(this.props.postid))
        {
            // await this.props.stores.PostStore.fetchItems();
            this.setState({
                ...this.state,
                goToList:true
            });
        }
    }

    recommend = async () =>
    {
        let recommend = await this.props.stores.PostStore.addRecommendedCount(this.props.postid)

        if(recommend)
        {
            await this.getPost();
        }
    }

    render() {

        if(this.state.goToList)
        {
            return <Redirect to="/board"/>
        }
        else if(this.state.goToList)
        {
            return <Redirect to={`/board/view/${this.props.postid}`}/>
        }
        else if(!this.state.post)
        {
            return(
                <div>

                </div>
            )
        }

        let edit = null;
        let del = null;
        if(this.u.user && this.state.post.userId === this.u.user.id)
        {
            if(this.state.editPost)
                edit = <button><Link to={this.state.editPost}>수정</Link></button>;
            del = <button onClick={this.deletePost}>삭제</button>;
        }

        return (
            <div>
                <div>
                    <span className="board-other">제목</span> {this.state.post.title}
                </div>
                <div>
                    <span className="board-other">작성시간</span> {new Date(this.state.post.created).toLocaleString()}
                </div>
                <div>
                    <span className="board-other">작성자</span> {this.state.userName}
                </div>
                <div>
                    <span className="board-other">조회수</span> {this.state.post.showCount}
                </div>
                <div>
                    <span className="board-other">추천</span> {this.state.post.recommendedCount}
                </div>
                <div>
                    <img width="100px" height="100px" src={`http://localhost:8080/attachment/${this.state.imagePath}`} alt=""/>
                </div>
                <div>
                    내용 : <div dangerouslySetInnerHTML={{__html:this.state.post.content}}></div><br/>
                    {edit}
                    {del}
                </div>
                <div>
                    <button onClick={this.recommend}>이 글 추천하기</button>
                </div>
                <div>
                    <Comment postId={this.postId}/>
                </div>
                <div>
                    <button><Link to={`/board/board/${this.state.post.boardId}`}>목록</Link></button>
                </div>
            </div>
        )
    }
};

export default PostView;