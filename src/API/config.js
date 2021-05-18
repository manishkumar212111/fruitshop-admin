import { API_BASE_URL } from "../config";

const BASE_URL = API_BASE_URL;
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
    }    
};

export { BASE_URL, EndPoints, getImageURL };