import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";
// import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@inject("stores")
@observer
class addPost extends Component {

    state = {
        title : "",
        content : "",
        id : -1,
        goToList : false,
        userId : null,
        boardId : -1,
        recommendedCount : 0,
        showCount : 0
    }

    p = this.props.stores.PostStore;
    u = this.props.stores.UserStore;

   async componentDidMount() {
        // if(this.props.id != null)
        // {
        //     this.setState({
        //         ...this.state,
        //         id:this.props.id
        //     });
        //     if(post)
        //     {
        //         this.setState({
        //             ...this.state,
        //             title : post.title,
        //             content : post.content
        //         });
        //     }
        // }
        if(this.u.user)
        {
            this.setState({
                ...this.state,
                userId : this.u.user.id,
                boardId : this.props.boardId
            });

            if(this.props.id)
            {
                this.setState({
                    ...this.state,
                    id : this.props.id
                });
                await this.getPost();
            }
        }
    }

    getPost = async () => {
       let post = await this.p.getPost(this.props.id);
       this.setState({
           ...this.state,
           title : post.title,
           content : post.content
       });
    }

    updateTitle = (event) => {
        this.setState({
            ...this.state,
            title : event.target.value
        });
    };
    updateContent = (event) => {

        this.setState({
            ...this.state,
            content : event.target.value
        });
    };

    addNewPost = async () => {

        if(!this.state.title || !this.state.content)
        {
            alert("전부 입력해주세요.");
            return;
        }

        if(this.state.id === -1)
        {
            if(window.confirm("추가하시겠습니까?") === false)
                return;

            if(await this.p.addPost(this.state))
            {
                this.setState({
                    ...this.state,
                    goToList:true
                });
            }
        }
        else
        {
            if(window.confirm("수정하시겠습니까?") === false)
                return;

            if(await this.p.editPost(this.state))
            {
                // await this.props.stores.PostStore.fetchItems();
                this.setState({
                    ...this.state,
                    goToList:true
                });
            }
        }
    }

    cancelNewPost = async () => {
        this.setState({
            ...this.state,
            goToList:true
        });
    }

    render()
    {
        if(this.state.goToList)
            return <Redirect to="/board"/>

        if(!this.u.user)
            return <Redirect to="/board"/>

        return(
            <div>
                <div>
                    제목 <input value={this.state.title} onChange={this.updateTitle}/>
                </div>
                <div>
                    내용
                    <div>
                        {/*<CKEditor*/}
                            {/*editor={ClassicEditor}*/}
                            {/*data={this.state.content}*/}
                            {/*onChange={this.updateContent}/>*/}
                        <textarea
                            value={this.state.content}
                            onChange={this.updateContent}
                            />
                    </div>
                </div>
                <div>
                    <button onClick={this.addNewPost}>확인</button>
                    <button onClick={this.cancelNewPost}>취소</button>
                </div>
            </div>
        );
    }


};

export default addPost;