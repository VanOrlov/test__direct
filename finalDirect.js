/*const axios = require("axios");
const xlsx = require("xlsx-populate");*/

//Токен directprmaker
const token = "y0_AgAAAABZ0n8vAAryqQAAAADz-yg-iUnEemM_RYKQXCghLusNMkJLiFo"

//Выгружает всех клиентов агенства directprmaker и возвращает массив объектов {login: (string), name: (string) }
function agency() {
  //Возвращаемый массив
  let arr__clients = [];

  // Настройки запроса
  const requestBody = {
    method: "get",
    params: {
      SelectionCriteria: {
        "Archived": "NO"
      },
      FieldNames: ["ClientInfo", "Login"],
    },
  };

  //заголовок запроса
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json; charset=utf-8",
    Host: "api.direct.yandex.com",
    "Accept-Language": "ru",
  };

  return new Promise((resolve, reject) => {
    axios
      .post("https://api.direct.yandex.ru/json/v5/agencyclients", requestBody, {
        headers,
      })
      .then((response) => {
        clients__login(response.data.result.Clients);
        resolve(arr__clients);
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
        reject(error);
      });

    function clients__login(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr__clients.push({ login: arr[i].Login, name: arr[i].ClientInfo });
      }
    }
  });
}

//Использует массив объектов из функции agency и выгружает данные по каждому клиенту, возвращает массив объектов {name: (string), balance: (Number)}
function accmanager(arr) {
    const array__clients = arr.map((obj) => obj.name);
    let clients__login__for__header = arr.map((obj) => obj.login);
    let result__balance = []; //тут будет хранится итоговый массив клиентов с балансом
  
    // Настройки запроса
    const requestBody = {
      method: "AccountManagement",
      param: {
        Action: "Get",
        SelectionCriteria: {
          Logins: clients__login__for__header,
        },
      },
      token: "y0_AgAAAABZ0n8vAAryqQAAAADz-yg-iUnEemM_RYKQXCghLusNMkJLiFo",
      locale: "ru",
    };
  
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
      Host: "api.direct.yandex.ru",
      "Accept-Language": "ru",
    };
  
    return new Promise((resolve, reject) => {
      axios
        .post("https://api.direct.yandex.ru/live/v4/json/", requestBody, {
          headers,
        })
        .then((response) => {
          name__balance(response.data.data.Accounts);
          console.log(result__balance);
          resolve(result__balance);
        })
        .catch((error) => {
          reject(error);
        });
  
      function name__balance(arr) {
        for (let a = 0; a < arr.length; a++) {
          result__balance.push({
            name: array__clients[a],
            balance: arr[a].Amount,
          });
        }
      }
    });
}

function createExcel(data){
    xlsx
    .fromBlankAsync()
    .then((workbook) => {
      const sheet = workbook.sheet(0);
  
      // Записываем заголовки
      sheet.cell("A1").value("Ответственный");
      sheet.cell("B1").value("Клиенты");
      sheet.cell("C1").value("Вчера");
      sheet.cell("D1").value("Сегодня");
  
      // Записываем данные в таблицу Excel
      data.forEach((row, index) => {
        sheet.cell(`B${index + 2}`).value(row.name);
        sheet.cell(`D${index + 2}`).value(row.balance);
      });
  
      return workbook.toFileAsync("./output.xlsx");
    })
    .then(() => {
      console.log("Excel файл успешно создан.");
    })
    .catch((err) => {
      console.error("Ошибка при создании Excel файла:", err);
    });
}


try {
  agency()
  .then((response) => {
    accmanager(response)
    .then(res => {
        createExcel(res)
    })
    .catch(err => {
        console.log(err);
    })
  })
  .catch(err => {
    console.log(err);
  })
} catch (error) {
  console.log(error);
}

let btn1 = document.querySelector('.btn1')

btn1.addEventListener('click', (e) => {
    e.preventDefault()
    try {
        agency()
        .then((response) => {
          accmanager(response)
          .then(res => {
              createExcel(res)
          })
          .catch(err => {
              console.log(err);
          })
        })
        .catch(err => {
          console.log(err);
        })
      } catch (error) {
        console.log(error);
      }
      
})
