import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

@inject("stores")
@observer
class LoginBar extends Component {

    u = this.props.stores.UserStore;

    Logout = async () =>
    {
        await this.u.Logout();
    }

    render()
    {
        if(this.u.user)
        {
            return(
                <div>
                    환영합니다. {this.u.user.nickname}님.
                    <button onClick={this.Logout}>로그아웃</button>
                    <Link to={`/user/myPage/${this.u.user.id}`}><button>마이페이지</button></Link>
                </div>
            );
        }
        else
        {
            return(
                <div><Link to="/user/login"><button>로그인</button></Link></div>
            );
        }
    }

}

export default LoginBar;