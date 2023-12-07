const axios = require("axios");

const campaigns__logins = ["sbx-orlovaqbDc1k", 'sbx-orlovahYLjDV', 'sbx-orlovaHM3TnF']

// Настройки запроса
const requestBody = {
  method: "get",
  params: {
      "SelectionCriteria": {},
      "FieldNames": ["Name", "Funds"]
  },
};

// Замените 'YOUR_SANDBOX_TOKEN' на ваш токен песочницы
const token = "y0_AgAAAABcDEzAAAryfgAAAADz-ZPZ2OsYQ-tcRciySPQDccQmXP2HtXU";
const url = "https://api-sandbox.direct.yandex.ru/json/v5/campaigns";

let arr = []

for (let i = 0; i < campaigns__logins.length; i++) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Client-Login": campaigns__logins[i],
    "Content-Type": "application/json; charset=utf-8",
    Host: "api-sandbox.direct.yandex.com",
    "Accept-Language": "ru"
  };
  
  axios
    .post(url, requestBody, { headers })
    .then((response) => {
      console.log(response.data.result, response.data.result.Campaigns);
    })
    .catch((error) => {
      console.error("Ошибка при выполнении запроса:");
    });
  
}