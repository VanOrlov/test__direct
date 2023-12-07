const xlsx = require('xlsx-populate');

const data = [
    { name: 'Пиламотериалы', balance: '0' },
    { name: 'ММКлиник', balance: '0' },
    { name: 'Патрикеев Лес', balance: '189.976083' },
    { name: 'Мишутка', balance: '4885.901667' },
    { name: 'Вектор М (осн сайт)', balance: '23758.483083' },
    { name: 'ДомОрион', balance: '5080' },
    { name: 'Штепсель и Батарейка', balance: '0' },
    { name: 'СтоматологияМилана', balance: '17625.324667' },
    { name: 'Всяупаковка', balance: '24669.29525' },
    { name: 'PRMaker', balance: '11723.896' },
    { name: 'Мироли', balance: '3002.836' },
    { name: 'АльфаРитуал', balance: '23292.091583' },
    { name: 'Спецтехпром', balance: '16725.127917' },
    { name: 'Никас', balance: '11996.029417' },
    { name: 'БурениеСкважин', balance: '0' },
    { name: 'ГастробарХЛЕБ', balance: '9459.428667' },
    { name: 'ВетклиникаСедова', balance: '6389.723167' },
    { name: 'АвтоБум', balance: '3785.339583' },
    { name: 'МэриТрюфельЯрославль', balance: '42926.947833' },
    { name: 'СТОБаранка', balance: '2796.6625' },
    { name: 'МТ Н Новгород', balance: '15967.779583' },
    { name: 'Ювента', balance: '10417.904417' },
    { name: 'СтоматологияКонсилиум', balance: '14786.372' },
    { name: 'Мехмаркет', balance: '7333.456833' },
    { name: 'ПатрикеевДом', balance: '6690.717917' },
    { name: 'Имбиан', balance: '0' },
    { name: 'СтоматологияТаис', balance: '23848.697083' },
    { name: 'ЯрПак', balance: '5866.807833' }
  ]

  xlsx.fromBlankAsync()
  .then(workbook => {
    const sheet = workbook.sheet(0);

    // Записываем заголовки
    sheet.cell('A1').value('Ответственный');
    sheet.cell('B1').value('Клиенты');
    sheet.cell('C1').value('Вчера');
    sheet.cell('D1').value('Сегодня');

    // Записываем данные в таблицу Excel
    data.forEach((row, index) => {
      sheet.cell(`B${index + 2}`).value(row.name);
      sheet.cell(`D${index + 2}`).value(row.balance);
    });

    return workbook.toFileAsync('./output.xlsx');
  })
  .then(() => {
    console.log('Excel файл успешно создан.');
  })
  .catch(err => {
    console.error('Ошибка при создании Excel файла:', err);
  });