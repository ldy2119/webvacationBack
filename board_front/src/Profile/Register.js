import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from "react-router-dom";
import $ from "jquery";

@inject("stores")
@observer
class Register extends Component {

    state = {
        account : "",
        password : "",
        checkPassword : "",
        name : "",
        gender : "",
        imagePath : "",
        goToMain : false,
        checkAccount : -1,
        agree : false
    };

    u = this.props.stores.UserStore;

    async componentDidMount() {
        if(this.u.user)
        {
            this.setState({
                ...this.state,
                name : this.u.user.nickname,
                gender : this.u.user.gender
            });
        }
    }

    updateAccount = (event) => {
        this.setState({
            ...this.state,
            account : event.target.value,
            checkAccount : -1
        });
    };
    updatePassword = (event) => {

        this.setState({
            ...this.state,
            password : event.target.value
        });
    };
    updateCheckPassword = (event) => {

        this.setState({
            ...this.state,
            checkPassword : event.target.value
        });
    };
    updateName = (event) => {

        this.setState({
            ...this.state,
            name : event.target.value
        });
    };

    updateGender = (event) => {
        this.setState({
            ...this.state,
            gender : event.target.value
        });
    }

    checkAccount = async () =>
    {
        if(!await this.u.checkAccount(this.state.account))
        {
            this.setState({

                ...this.state,
                checkAccount : 1
            });
        }
        else
        {
            this.setState({
                ...this.state,
                checkAccount : 0
            });
        }
    }

    UploadImage = async () => {
        let file = $(".form-check-input");

        let fileName = await this.u.UploadImage(file);

        this.setState({
            ...this.state,
            imagePath : fileName
        });
        return fileName;
    }

    Register = async () =>
    {
        if(this.state.account && this.state.password &&
            this.state.checkPassword && this.state.name &&
            this.state.gender)
        {
            if(this.state.checkPassword !== this.state.password)
            {
                window.alert("패스워드와 패스워드확인이 같지 않습니다.");
                return;
            }
            else if(this.state.checkAccount === 0)
            {
                window.alert("중복확인을 해주세요.");
                return;
            }
            else if(!await this.UploadImage())
            {
                window.alert("이미지를 확인해주세요.");
                return;
            }
            if(await this.u.Register(this.state) > 0)
            {
                window.alert("회원가입 성공");
                this.setState({
                    account : "",
                    password : "",
                    checkPassword : "",
                    name : "",
                    gender : "",
                    imagePath : "",
                    goToMain : true
                });
            }
            else
            {
                window.alert("회원가입 실패");
            }
        }
        else
        {
            window.alert("전부 기입해주세요.");
        }
    }

    EditProfile = async () => {
        if(this.state.password && this.state.checkPassword &&
            this.state.name && this.state.gender)
        {
            if(this.state.checkPassword !== this.state.password)
            {
                window.alert("패스워드와 패스워드확인이 같지 않습니다.");
                return;
            }
            else if(!await this.UploadImage() && this.state.imagePath)
            {
                window.alert("이미지를 확인해주세요.");
                return;
            }
            if(await this.u.EditProfile(this.state) > 0)
            {
                window.alert("수정 성공");
                this.setState({
                    account : "",
                    password : "",
                    checkPassword : "",
                    name : "",
                    gender : "",
                    imagePath : "",
                    goToMain : true
                });
                await this.u.Logout();
            }
            else
            {
                window.alert("수정 실패");
            }
        }
        else
        {
            window.alert("전부 기입해주세요.");
        }
    }

    render()
    {
        if(this.state.goToMain)
        {
            return <Redirect to="/"/>
        }
        if(this.state.checkAccount === 1)
        {
            this.accountText = "가능한 아이디입니다."
        }
        else if(this.state.checkAccount === 0)
        {
            this.accountText = "이미 존재하는 아이디입니다.";
        }
        else if(this.state.checkAccount === -1)
        {
            this.accountText = "";
        }
        if(!this.u.user)
        {
            return(
                <div>
                    희망아이디 : <input value={this.state.account} onChange={this.updateAccount}/> {this.accountText} <button onClick={this.checkAccount}>중복확인</button><br/>
                    희망패스워드 : <input type="password" value={this.state.password} onChange={this.updatePassword}/><br/>
                    희망패스워드확인 : <input type="password" value={this.state.checkPassword} onChange={this.updateCheckPassword}/><br/>
                    닉네임 : <input value={this.state.name} onChange={this.updateName}/><br/>
                    성별 :
                    <label>
                        <input type="radio" name="gender" value="남성" checked={this.state.gender === "남성"} onChange={this.updateGender} className="form-check-input"/>
                        남성
                    </label>
                    <label>
                        <input type="radio" name="gender" value="여성" checked={this.state.gender === "여성"} onChange={this.updateGender} className="form-check-input"/>
                        여성
                    </label> <br/>
                    <input type="file" name="imagePath" accept=".jpeg, .jpg, .png" className="form-check-input"/><br/>
                    <button onClick={this.Register}>확인</button>
                    <Link to="/user/login"><button>취소</button></Link>
                </div>
            );
        }
        else
        {
            return(
                <div>
                    비밀번호 : <input type="password" value={this.state.password} onChange={this.updatePassword}/><br/>
                    비밀번호확인 : <input type="password" value={this.state.checkPassword} onChange={this.updateCheckPassword}/><br/>
                    닉네임 : <input value={this.state.name} onChange={this.updateName}/><br/>
                    성별 :
                    <label>
                        <input type="radio" name="gender" value="남성" checked={this.state.gender === "남성"} onChange={this.updateGender} className="form-check-input"/>
                        남성
                    </label>
                    <label>
                        <input type="radio" name="gender" value="여성" checked={this.state.gender === "여성"} onChange={this.updateGender} className="form-check-input"/>
                        여성
                    </label> <br/>
                    <input type="file" name="imagePath" accept="image/*" className="form-check-input"/><br/>
                    <button onClick={this.EditProfile}>확인</button>
                    <button><Link to="/">취소</Link></button>
                </div>
            );
        }
    }

}

export default Register;