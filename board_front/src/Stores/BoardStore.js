import {action} from "mobx";
import axios from "axios";

class BoardStore {

    static __instance = null;

    static getInstance() {
        if (BoardStore.__instance === null) {
            BoardStore.__instance = new BoardStore();
        }
        return BoardStore.__instance;
    }

    constructor()
    {
        BoardStore.__instance = this;
    }

    @action getBoard = async (u) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/board/boards",
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
            this.user = null;
        }
    }

    @action getCount = async (id) => {
        try
        {
            let response = await axios({
                url : "http://localhost:8080/api/board/getCount/" + id,
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
            this.user = null;
        }
    }
}

export default BoardStore.getInstance();