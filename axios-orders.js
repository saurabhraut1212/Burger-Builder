import axios from "axios";

const instance=axios.create({
    baseURL:'https://burgerdemo-8baec-default-rtdb.firebaseio.com/'
})

export default instance;