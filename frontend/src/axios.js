import axios from "axios";

const instance = axios.create({
    baseURL: "https://blooming-castle-42959.herokuapp.com/",
});


export default instance;