const axios = require("axios");

let result__balance = []

let array__clinets = [
    { login: 'e-16302239', name: 'Пиламотериалы' },
    { login: 'e-16472991', name: 'ММКлиник' },
    { login: 'e-16657573', name: 'Патрикеев Лес' },
    { login: 'e-16691132', name: 'Мишутка' },
    { login: 'e-16691655', name: 'Вектор М (осн сайт)' },
    { login: 'e-16755929', name: 'ДомОрион' },
    { login: 'e-16763791', name: 'Штепсель и Батарейка' },
    { login: 'e-16766664', name: 'СтоматологияМилана' },
    { login: 'e-16766671', name: 'Всяупаковка' },
    { login: 'e-16780610', name: 'PRMaker' },
    { login: 'e-16783368', name: 'Мироли' },
    { login: 'e-16815516', name: 'АльфаРитуал' },
    { login: 'e-16844597', name: 'Спецтехпром' },
    { login: 'e-16867982', name: 'Никас' },
    { login: 'e-16898953', name: 'БурениеСкважин' },
    { login: 'e-16908815', name: 'ГастробарХЛЕБ' },
    { login: 'e-16946974', name: 'ВетклиникаСедова' },
    { login: 'e-16952173', name: 'АвтоБум' },
    { login: 'e-16974721', name: 'МэриТрюфельЯрославль' },
    { login: 'e-17005530', name: 'СТОБаранка' },
    { login: 'e-17025443', name: 'МТ Н Новгород' },
    { login: 'e-17029508', name: 'Ювента' },
    { login: 'e-17059310', name: 'СтоматологияКонсилиум' },
    { login: 'e-17132997', name: 'Мехмаркет' },
    { login: 'e-17140642', name: 'ПатрикеевДом' },
    { login: 'e-17141080', name: 'Имбиан' },
    { login: 'e-17143605', name: 'СтоматологияТаис' },
    { login: 'e-17207433', name: 'ЯрПак' }
  ]

let array__logins = array__clinets.map(el => el.login)

// Настройки запроса
const requestBody = {
  method: "AccountManagement",
  param: {
    Action: "Get",
    SelectionCriteria: {
      Logins: array__logins,
    },
  },
  token: "y0_AgAAAABZ0n8vAAryqQAAAADz-yg-iUnEemM_RYKQXCghLusNMkJLiFo",
  locale: "ru"
};

// Замените 'YOUR_SANDBOX_TOKEN' на ваш токен песочницы
const token = "y0_AgAAAABZ0n8vAAryqQAAAADz-yg-iUnEemM_RYKQXCghLusNMkJLiFo";
const url = "https://api.direct.yandex.ru/live/v4/json/";

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json; charset=utf-8",
  Host: "api.direct.yandex.ru",
  "Accept-Language": "ru",
};

axios
  .post(url, requestBody, { headers })
  .then((response) => {
    name__balance(response.data.data.Accounts)
    console.log(result__balance);
  })
  .catch((error) => {
    console.error("Ошибка при выполнении запроса:");
  });

  function name__balance(arr){
    for (let a = 0; a < arr.length; a++) {
        result__balance.push({name: array__clinets[a].name, balance: arr[a].Amount})
    }
  }
