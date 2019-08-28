import {action, observable} from "mobx";
import axios from "axios";

class PostStore {

    static __instance = null;

    static getInstance() {
        if (PostStore.__instance === null) {
            PostStore.__instance = new PostStore();
        }
        return PostStore.__instance;
    }

    constructor()
    {
        PostStore.__instance = this;
    }

    @action getCurrentPost = async (boardId) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/post/findCurrentPostByBoardId/" + boardId,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            // console.log(response);
            if(response.status === 200)
            {
                return response.data;
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

    @action getPost = async (postId) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/post/findPost/" + postId,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            if(response.status === 200)
            {
                return response.data;
            }
            else
            {
                alert("전송 실패");
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
        }
    }

    @action getPostListByUserId = async (userId) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/post/findPostByUserId/" + userId,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            if(response.status === 200)
            {
                return response.data;
            }
            else
            {
                alert("전송 실패");
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
        }
    }

    @action addPost = async (state) => {
        try
        {
            let post = {
                title : state.title,
                content : state.content,
                userId : state.userId,
                boardId : state.boardId
            };

            let response = await axios({
                url : "http://localhost:8080/api/post/addPost/",
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data : JSON.stringify(post)
            });
            if(response.status === 200)
            {
                return response.data;
            }
            else
            {
                alert("전송 실패");
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
        }
    }

    @action deletePost = async (postId) =>
    {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/post/deletePost/" + postId,
                method: 'delete',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            if(response.status === 200)
            {
                return true;
            }
            else
            {
                alert("전송 실패");
                return false;
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
            return false;
        }
    }

    @action editPost = async (state) =>
    {
        let post = {
            title : state.title,
            content : state.content,
            userId : state.userId,
            boardId : state.boardId,
            id : state.id
        };
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/post/modifyPost",
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                data : JSON.stringify(post),
                timeout: 3000
            });
            if(response.status === 200)
            {
                return true;
            }
            else
            {
                alert("전송 실패");
                return false;
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
            return false;
        }
    }

    @observable amountPage = 5;
    @action getBoardPost = async (boardId, pageNumber) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/post/findByPageNumber/" + boardId + "/" + (pageNumber - 1) * this.amountPage + "/" + this.amountPage,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            if(response.status === 200)
            {
                return response.data;
            }
            else
            {
                alert("전송 실패");
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
        }
    }

    @action addShowCount = async (postId) =>{
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/post/addShowCount/" + postId,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            if(response.status === 200)
            {
                return response.data;
            }
            else
            {
                alert("전송 실패");
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
        }
    }

    @action addRecommendedCount = async (postId) =>{
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/post/addRecommendCount/" + postId,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            if(response.status === 200)
            {
                return response.data;
            }
            else
            {
                alert("전송 실패");
                return null;
            }
        }
        catch (e)
        {
            alert(e.toLocaleString());
            return null;
        }
    }

}

export default PostStore.getInstance();