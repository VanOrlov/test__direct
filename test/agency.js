const axios = require("axios");

// Настройки запроса
const requestBody = {
  method: "get",
  params: {
      "SelectionCriteria": {},
      "FieldNames": ["ClientId", "ClientInfo", "Login", "Bonuses"]
  },
};

// Замените 'YOUR_SANDBOX_TOKEN' на ваш токен
const token = "y0_AgAAAABZ0n8vAAryqQAAAADz-yg-iUnEemM_RYKQXCghLusNMkJLiFo";
const url = "https://api.direct.yandex.ru/json/v5/agencyclients";

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json; charset=utf-8",
  Host: "api.direct.yandex.com",
  "Accept-Language": "ru"
};

let arr__clients = []

axios
  .post(url, requestBody, { headers })
  .then((response) => {
    clients__login(response.data.result.Clients)
    console.log(arr__clients);
  })
  .catch((error) => {
    console.error("Ошибка при выполнении запроса:", error);
  });


function clients__login(arr){
    for (let i = 0; i < arr.length; i++) {
        arr__clients.push({login: arr[i].Login, name: arr[i].ClientInfo})
    }
}