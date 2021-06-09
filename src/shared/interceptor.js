// import React from "react";
// import axios from "axios";

// const apiUrl = "https://niras-a363e-default-rtdb.firebaseio.com";
// axios.interceptors.request.use(
// 	(config) => {
// 		const { origin } = new URL(config.url);
// 		console.log(origin);
// 		const allowedOrigins = [apiUrl];
// 		console.log(allowedOrigins);

// 		const token = localStorage.getItem("token");
// 		if (allowedOrigins.includes(origin)) {
// 			config.headers.authorization = `Bearer ${token}`;

// 		}
// 		return config;
// 	},
// 	(error) => {

// 		return Promise.reject(error);
// 	}
// );

// export const interceptor = axios;
