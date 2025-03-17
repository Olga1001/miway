import { useState } from "react";
import * as XLSX from "xlsx";
import { useHttp } from "../hooks/http.hook";

const ExcelToJson = () => {
  const [jsonData, setJsonData] = useState(null);
  const { request } = useHttp();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Отримуємо перший аркуш
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Конвертуємо в масив рядків
      const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });

      // Перевіряємо, чи є дані
      if (rawData.length < 2) {
        console.error("Недостатньо даних у файлі");
        return;
      }

      // Форматуємо нові дані
      const newFormattedData = rawData.slice(1).map((row) => ({
        id: String(row[1] || "").trim(),
        category: String(row[2] || "").trim(),
        name: String(row[3] || "").trim(),
        count: Number(row[4]) || 0,
        price: Number(row[5]) || 0,
        unit: String(row[6] || "").trim(),
      }));

      // Відправка оновлених даних на сервер
      request("http://localhost:4001/data", "POST", JSON.stringify(newFormattedData))
        .then((res) => console.log(res, "Отправка успешна"))
        .catch((err) => console.log(err));
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} />
      <pre>{jsonData ? JSON.stringify(jsonData, null, 2) : "Upload an Excel file"}</pre>
    </div>
  );
};

export default ExcelToJson;
