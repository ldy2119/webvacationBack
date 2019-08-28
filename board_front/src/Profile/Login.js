import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from "react-router-dom";

@inject("stores")
@observer
class Login extends Component {

    state = {
        account : "",
        password : "",
        goToHome : false
    }

    u = this.props.stores.UserStore;

    updateAccount = (event) => {
        this.setState({
            ...this.state,
            account : event.target.value
        });
    };
    updatePassword = (event) => {

        this.setState({
            ...this.state,
            password : event.target.value
        });
    };

    Login = async () =>
    {
        if(this.state.account && this.state.password)
        {
            await this.u.Login(this.state);
            if(!this.u.user)
            {
                alert("로그인 실패");
                return;
            }
            this.setState({
                ...this.state,
                account : "",
                password : "",
                goToHome : true
            });
        }
        else
        {
            alert("아이디와 패스워드를 입력해주세요.");
        }
    }

    backToHome = async () => {
        this.setState({
            ...this.state,
            account : "",
            password : "",
            goToHome : true
        });
    }

    render()
    {
        if(this.state.goToHome)
        {
            return(
                <Redirect to="/"/>
            )
        }
        else if(this.u.user)
        {
            return(
                <div>
                </div>
            );
        }
        else
        {
            return(
                <div>
                    아이디 : <input value={this.state.account} onChange={this.updateAccount}/><br/>
                    비밀번호 : <input type="password" value={this.state.password} onChange={this.updatePassword}/><br/>
                    <button onClick={this.Login}>로그인</button>
                    <Link to="/user/register"><button>회원가입</button></Link><br/>
                    <button onClick={this.backToHome}>홈으로</button>
                </div>
            );
        }

    }

}

export default Login;