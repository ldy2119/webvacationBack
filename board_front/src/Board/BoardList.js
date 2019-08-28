import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import "./Board.scss";
import BoardListItem from "./BoardListItem";

@inject("stores")
@observer
class BoardList extends Component{

    state = {
        boardId : null,
        postList : null,
        count : 0,
        postCountList : null
    }

    p = this.props.stores.PostStore;
    u = this.props.stores.UserStore;
    b = this.props.stores.BoardStore;

    pageNumber = null;

    async componentDidMount()
    {
        this.setState({
            ...this.state,
            boardId : this.props.boardId,
            count : await this.b.getCount(this.props.boardId)
        });

        this.pageNumber = this.props.pageNumber;

        await this.getPost();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if(this.pageNumber !== this.props.pageNumber)
        // {
        //     this.pageNumber = this.props.pageNumber;
        //     await this.getPost();
        // }
        if(this.props.pageNumber !== prevProps.pageNumber)
        {
            this.pageNumber = this.props.pageNumber;
            await this.getPost();
        }
    }

    getPost = async () => {

        let postCountList = [];
        for (let i = 0; i < this.state.count / this.p.amountPage; i++)
        {
            postCountList.push(i + 1);
        }
        // console.log(this.state.boardId, this.pageNumber, postCountList);

        this.setState({
            ...this.state,
            postList : await this.p.getBoardPost(this.state.boardId, this.pageNumber),
            postCountList : postCountList
        });
    }

    changeAmountPage = async (event) => {
        this.p.amountPage = event.target.value;
        this.pageNumber = 1;
        // console.log(this.pageNumber);
        await this.getPost();
    }

    render(){

        let addPost = null;
        if(this.u.user)
        {
            addPost = <Link to={`/board/add/${this.state.boardId}`}><button>글쓰기</button></Link>;
        }

        return(
            <div>
                <div>
                    <select onChange={this.changeAmountPage}>
                        <option value={5}>5개</option>
                        <option value={10}>10개</option>
                        <option value={20}>20개</option>
                    </select>
                </div>
                <span className="board-title">제목</span>
                <span className="board-other">작성시간</span>
                <span className="board-other">작성자</span>
                <span className="board-other">번호</span>
                <span className="board-other">추천수</span>
                <span className="board-other">조회수</span>
                {this.state.postList && this.state.postList.map(post => {
                    return(
                        <BoardListItem post={post} key={post.id}/>
                    )
                })}
                <br/>
                {addPost}
                {this.state.postCountList && this.state.postCountList.map(count => {
                    return(
                        <span key={count} className="board-count">
                            <Link to={`/board/board/${this.state.boardId}/${count}`}>{count}</Link>
                        </span>
                    )
                })}
                <br/>
                <Link to="/"><button>홈으로</button></Link>
            </div>
        );
    }
};

export default BoardList;