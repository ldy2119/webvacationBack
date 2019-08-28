import {action} from "mobx";
import axios from "axios";

class CommentStore {

    static __instance = null;

    static getInstance() {
        if (CommentStore.__instance === null) {
            CommentStore.__instance = new CommentStore();
        }
        return CommentStore.__instance;
    }

    constructor()
    {
        CommentStore.__instance = this;
    }

    @action getComment = async(postId) => {
        try {
            let response = await axios({
                url: "http://localhost:8080/api/comment/findCommentByPostId/" + postId,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });
            if (response.status === 200) {
                return response.data;
            } else {
                return 0;
            }
        } catch (e) {
            alert(e.toLocaleString());
            this.user = null;
        }
    }

    @action AddComment = async(postId, userId, content) => {
        try
        {
            let comment = {
                userId : userId,
                postId : postId,
                content : content
            };

            console.log(comment);

            let response = await axios({
                url : "http://localhost:8080/api/comment/addComment",
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000,
                data: JSON.stringify(comment)
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
        catch (e)
        {
            alert(e.toLocaleString());
            this.user = null;
        }
    }
}

export default CommentStore.getInstance();