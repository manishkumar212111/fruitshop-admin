import { REACT_APP_SERVER_URL } from "../configs";

const BASE_URL = REACT_APP_SERVER_URL;
// const BASE_URL = 'https://obscure-harbor-22627.herokuapp.com/';
const IMAGE_URL = "https://ik.imagekit.io/i2wp0fsg8dx/";

const getImageURL = (imgName) => IMAGE_URL.concat(imgName);

const EndPoints = {
    Users: {
        url: 'api/users',
    },
    Login : {
        url : "api/auth/login"
    },
    Logout : {
        url : "api/auth/logout"
    },
    productList : {
        url : "api/product"
    },
    productUpload : {
        url : "api/product/product/csv/upload"
    }    
};

export { BASE_URL, EndPoints, getImageURL };