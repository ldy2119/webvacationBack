import {observable, action} from "mobx";
import axios from "axios";

class UserStore {

    static __instance = null;

    static getInstance() {
        if (UserStore.__instance === null) {
            UserStore.__instance = new UserStore();
        }
        return UserStore.__instance;
    }

    constructor()
    {
        UserStore.__instance = this;
    }

    @observable user = null;
    @action Login = async (u) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/user/login",
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(u)
            });
            if(response.status === 200)
            {
                this.user = response.data;
            }
            else
            {
                alert("전송 실패");
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
            this.user = null;
        }
    }

    @action Logout = async () => {
        this.user = null;
    }

    @action UploadImage = async (file) => {
        file = file[2].files[0];

        if(file == null)
            return null;
        let formData = new FormData();
        formData.append("uploadFile", file);

        let response = await axios({
            url : "http://localhost:8080/attachment",
            method: 'post',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            timeout: 3000,
            data: formData,
            processData : false,
            contentType : false
        });

        if(response.status === 200)
        {
            return response.data;
        }
    }

    @action Register = async(user) => {
        try
        {
            let request = {
                account : user.account,
                password : user.password,
                checkPassword : user.checkPassword,
                nickname : user.name,
                gender : user.gender,
                imagePath : user.imagePath
            };
            console.log(request);

            let response = await axios({
                url : "http://localhost:8080/api/user/addUser",
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(request)
            });
            if(response.status === 200)
            {
                return response.data;
            }
            else
            {
                alert("전송 실패");
                return 0;
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
        }
    }

    @action checkAccount = async (account) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/user/checkAccount/" + account,
                method: 'get',
                headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            if(response.data)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        catch(e)
        {
            alert(e.toLocaleString());
            return true;
        }
    }

    @action findUser = async (id) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/user/findById/" + id,
                method: 'get',
                headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                },
                timeout: 3000
            });
            if(response.data)
            {
                return response.data;
            }
            else
            {
                return null;
            }
        }
        catch(e)
        {
            alert(e.toLocaleString());
            return null;
        }
    }

    @action CheckPassword = async (account, password) => {
        try
        {
            let user = {
                account : account,
                password : password
            };

            let response = await axios({
                url : "http://localhost:8080/api/user/login",
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(user)
            });
            if(response.status === 200)
            {
                return response.data;
            }
            else
            {
                return 0;
            }
        }
        catch(e)
        {
            alert(e.toLocaleString());
        }
    }

    @action EditProfile = async(user) => {
        try
        {
            let request = {
                id : this.user.id,
                account : user.account,
                password : user.password,
                checkPassword : user.checkPassword,
                nickname : user.name,
                gender : user.gender
            };
            if(user.imagePath)
            {
                request = {
                    ...request,
                    imagePath : user.imagePath
                };
            }
            else
            {
                request = {
                    ...request,
                    imagePath : this.user.imagePath
                };
            }
            console.log(request);
            let response = await axios({
                url : "http://localhost:8080/api/user/modifyUser",
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(request)
            });
            console.log(response);
            if(response.status === 200)
            {
                console.log(response.data);
                return response.data;
            }
            else
            {
                return 0;
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
        }
    }
}

export default UserStore.getInstance();