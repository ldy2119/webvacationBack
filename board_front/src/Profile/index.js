import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
// import {Link} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import MyPage from "./MyPage";

@inject("stores")
@observer
class Profile extends Component {

    state = {
        account : "",
        password : ""
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

    // AutoLogin = async () => {
    //     await this.u.Login({
    //         account : "zzzz",
    //         password : "zzzzzz"
    //     });
    // }

    Login = async () =>
    {
        if(this.state.account && this.state.password)
        {
            await this.u.Login(this.state);
            if(!this.u.user)
            {
                alert("로그인 실패");
            }
            this.setState({
                ...this.state,
                account : "",
                password : ""
            });
        }
    }

    Logout = async () =>
    {
        await this.u.Logout();
    }

    render()
    {

            if(this.props.match && this.props.match.params.command === "register")
                return <Register/>
            else if(this.props.match && this.props.match.params.command === "login")
                return <Login/>
            else if(this.props.match && this.props.match.params.command === "myPage")
                return <MyPage userId={this.props.match.params.userId}/>
            else if(this.props.match && this.props.match.params.command === "edit")
            {
                return <Register/>
            }
    }

}

export default Profile;