async function synchronousFetch(url) {
  const response = await fetch(url);
  return await response.json();
}
var data = [];

//JavaScript kód pre vyhľadávanie noriem v katalógu noriem
document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission
    const apiUrl = "https://normy.normoff.gov.sk/api/standard/?";

    // Pridanie parametrov do URL
    const formData = new FormData(this);
    let apiUrlWithParams = apiUrl;

    for (const [key, value] of formData) {
      apiUrlWithParams += `${key}=${encodeURIComponent(value)}&`;
    }

    // Odstránenie posledného "&"
    apiUrlWithParams = apiUrlWithParams.slice(0, -1);

    // Výpis URL s parametrami do konzoly
    console.log("API URL with parameters:", apiUrlWithParams);

    var page = 1;
    var pagesCount = 69;
    data = [];

    // Získanie výsledkov vyhľadávania
    while (page <= pagesCount) {
      apiUrlWithParams += `&page=${page}`;
      const newData = await synchronousFetch(apiUrlWithParams);

      console.log("API Response Data:", newData);
      pagesCount = newData.pagination.pagesCount;
      page = newData.pagination.page;
      data = [...data, ...newData.data];

      page++;
    }

    // Odstránenie tabuľky s výsledkami vyhľadávania
    const existingTable = document.getElementById("resultTable");
    if (existingTable) {
      existingTable.remove();
    }

    console.log("API Response Data:", data);

    // Zobrazenie výsledkov vyhľadávania
    const table = document.createElement("table");
    table.id = "resultTable";
    table.innerHTML = `
   <thead>
     <tr>
       <th>Katalógové číslo normy</th>
       <th>Označenie normy</th>
       <th>Slovenský názov normy</th>
       <th>Anglický názov normy</th>
       <th>URL adresa normy</th>
       <th>Triediaci znak</th>
       <th>Dátum vydania</th>
       <th>Dátum schválenia</th>
       <th>Dátum účinnosti</th>
       <th>Dátum zrušenia</th>
       <th>Dátum zverejnenia</th>
       <th>Jazyk</th>
       <th>Zmeny</th>
       <th>Úroveň spracovania</th>
       <th>Platnosť</th>
       <th>Vestník</th>
       <th>Poznámka vo vestníku</th>
       <th>Predmet normy</th>
       <th>Počet strán</th>
       <th>Formát normy</th>
       <th>Nariadenie vlády</th>
       <th>Vestník harmonizácie</th>
       <th>ICS kód normy</th>
       <th>Nahradené normy</th>
       <th>Nahradzujúce normy</th>
       <th>Obsah normy</th>
       <th>Dostupná v listinnej forme</th>
       <th>Dostupná v elektronickej forme</th>
     </tr>
   </thead>
   <tbody>
     ${data
       .map(
         (item) => `
       <tr>
         <td>${item.catalogueNo}</td>
         <td>${item.sdName}</td>
         <td>${item.name}</td>
         <td>${item.enName}</td>
         <td>${item.url}</td>
         <td>${item.classSeq}</td>
         <td>${item.dateVyd}</td>
         <td>${item.dateSchvl}</td>
         <td>${item.dateUcin}</td>
         <td>${item.dateZrus}</td>
         <td>${item.dateZv}</td>
         <td>${item.language}</td>
         <td>${item.changes}</td>
         <td>${item.urovSprac}</td>
         <td>${item.isValid}</td>
         <td>${item.vestnik}</td>
         <td>${item.vestnikNote}</td>
         <td>${item.standardSubject}</td>
         <td>${item.pageCount}</td>
         <td>${item.pageFormat}</td>
         <td>${item.govReg}</td>
         <td>${item.vestnikHarm}</td>
         <td>${item.ics}</td>
         <td>${item.replacedStandard}</td>
         <td>${item.standardReplacement}</td>
         <td>${item.contents}</td>
         <td>${item.canBuy}</td>
         <td>${item.canBuyOnline}</td>
       </tr>
     `
       )
       .join("")}
   </tbody>
 `;
    document.body.appendChild(table);
  });

function downloadCSV() {
  // Create a new CSV string.
  const csvString = [];

  // Get the keys of the first object in the list.
  const keys = Object.keys(data[0]);

  const keyMap = {};

  keyMap["catalogueNo"] = "Katalógové číslo normy";
  keyMap["sdName"] = "Označenie normy";
  keyMap["name"] = "Slovenský názov normy";
  keyMap["nameEn"] = "Anglický názov normy";
  keyMap["url"] = "URL adresa normy";
  keyMap["classSeq"] = "Triediaci znak";
  keyMap["dateVyd"] = "Dátum vydania";
  keyMap["dateSchvl"] = "Dátum schválenia";
  keyMap["dateUcin"] = "Dátum účinnosti";
  keyMap["dateZrus"] = "Dátum zrušenia";
  keyMap["dateZv"] = "Dátum zverejnenia";
  keyMap["language"] = "Jazyk";
  keyMap["changes"] = "Zmeny";
  keyMap["urovSprac"] = "Úroveň spracovania";
  keyMap["isValid"] = "Platnosť";
  keyMap["vestnik"] = "Vestník";
  keyMap["vestnikNote"] = "Poznámka vo vestníku";
  keyMap["standardSubject"] = "Predmet normy";
  keyMap["pageCount"] = "Počet strán";
  keyMap["pageFormat"] = "Formát normy";
  keyMap["govReg"] = "Nariadenie vlády";
  keyMap["vestnikHarm"] = "Vestník harmonizácie";
  keyMap["ics"] = "ICS kód normy";
  keyMap["replacedStandard"] = "Nahradené normy";
  keyMap["standardReplacement"] = "Nahradzujúce normy";
  keyMap["contents"] = "Obsah normy";
  keyMap["canBuy"] = "Dostupná v listinnej forme";
  keyMap["canBuyOnline"] = "Dostupná v elektronickej forme";

  // Iterate over the keys and use them to create a new object with the keys mapped to the desired values.
  for (const key of keys) {
    if (!keyMap[key]) {
      keyMap[key] = key;
    }
  }

  // Add the header row to the CSV string.
  csvString.push(keys.map((key) => keyMap[key]).join("$"));

  // Iterate over the objects in the list and add them to the CSV string.
  for (const object of data) {
    // Get the values of the object.
    const values = keys.map((key) => object[key]);

    // Add the values to the CSV string.
    csvString.push(values.join("$"));
  }

  // Create a new Blob object.
  const blob = new Blob([csvString.join("\n")], { type: "text/csv" });

  // Create a new anchor element.
  const anchor = document.createElement("a");
  anchor.href = window.URL.createObjectURL(blob);
  anchor.download = "tabulka.csv";

  // Append the anchor element to the body of the document.
  document.body.appendChild(anchor);

  // Click the anchor element to download the CSV file.
  anchor.click();

  // Remove the anchor element from the body of the document.
  document.body.removeChild(anchor);
}
