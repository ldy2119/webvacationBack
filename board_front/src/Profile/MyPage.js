import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from "react-router-dom";

@inject("stores")
@observer
class MyPage extends Component {

    state = {
        name : null,
        account : null,
        gender : null,
        recommendedCount : null,
        imagePath : null,
        password : "",
        goToList : false,
        goToEdit : false
    }

    u = this.props.stores.UserStore;
    p = this.props.stores.PostStore;

    async componentDidMount() {
        if(this.u.user)
        {
            if(this.u.user !== null)
            {
                this.setState({
                    ...this.state,
                    name : this.u.user.nickname,
                    account : this.u.user.account,
                    gender : this.u.user.gender,
                    imagePath : this.u.user.imagePath
                });

                let postList = await this.p.getPostListByUserId(this.u.user.id);

                if(postList !== null)
                {
                    let count = 0;
                    postList.map(post => {
                        count += post.recommendedCount;
                        return null;
                    });
                    this.setState({
                        ...this.state,
                        recommendedCount : count
                    });
                }
            }
        }
        else
        {
            this.setState({
                ...this.state,
                goToList : true
            });
        }
    }

    updatePassword = (event) => {
        this.setState({
            ...this.state,
            password : event.target.value
        });
    }

    onClick = async () => {
        if(await this.u.CheckPassword(this.state.account, this.state.password))
        {
            this.setState({
                ...this.state,
                goToEdit : true
            });
        }
    }

    render() {

        if(this.state.goToList)
            return <Redirect to="/board"/>
        else if(this.state.goToEdit)
        {
            return <Redirect to="/user/edit"/>
        }
        else if(this.u.user)
        {
            return(
                <div>
                    <div>
                        <span className="board-other">이름</span> {this.state.name}
                    </div>
                    <div>
                        <span className="board-other">아이디</span> {this.state.account}
                    </div>
                    <div>
                        <span className="board-other">성별</span> {this.state.gender}
                    </div>
                    <div>
                        <span className="board-other">추천수</span> {this.state.recommendedCount}
                    </div>
                    <div>
                        <img width="100px" height="100px" src={`http://localhost:8080/attachment/${this.state.imagePath}`} alt=""/>
                    </div>
                    <div>
                        비밀번호 : <input value={this.state.password} type="password" onChange={this.updatePassword} hint="비밀번호" />
                        <button onClick={this.onClick}>수정하기</button>
                    </div>
                </div>
            );
        }
        return <Redirect to="/board"/>

    }

}

export default MyPage;