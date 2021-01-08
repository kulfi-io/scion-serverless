import app from "../../server";
import supertest from "supertest";
import dotenv from "dotenv";

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

export const superRequest = () => {
    return supertest(app);
};

export const getLoginToken = (err, res) => {
    if (!err) return res.body.data.login.token;
};

export const apiUrl = () => {
    return process.env.API_BASE_URL;
};

export const whitelist = () => {
    return process.env.ORIGIN_WHITELIST;
};
