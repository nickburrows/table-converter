// 解析表格數據
function parseTableData(table) {
  const rows = table.trim().split("\n");
  const headers = rows[0].split("\t");
  const data = rows.slice(1).map(row => row.split("\t"));
  return { headers, data };
}

// 轉換為 JSON
function convertTableToJson(table) {
  const { headers, data } = parseTableData(table);
  const jsonData = data.map(row => {
    const obj = {};
    row.forEach((cell, index) => {
      obj[headers[index]] = cell;
    });
    return obj;
  });
  return JSON.stringify(jsonData, null, 2);
}

// 轉換為 Markdown
function convertTableToMarkdown(table) {
  const { headers, data } = parseTableData(table);
  let markdown = "| " + headers.join(" | ") + " |\n";
  markdown += "| " + headers.map(() => "---").join(" | ") + " |\n";
  data.forEach(row => {
    markdown += "| " + row.join(" | ") + " |\n";
  });
  return markdown;
}

// 聆聽轉換為 JSON 按鈕的點擊事件
document.getElementById("convertToJSONButton").addEventListener("click", () => {
  const tableData = document.getElementById("tableInput").value;
  const jsonResult = convertTableToJson(tableData);
  document.getElementById("output").value = jsonResult;
});

// 聆聽轉換為 Markdown 按鈕的點擊事件
document
  .getElementById("convertToMarkdownButton")
  .addEventListener("click", () => {
    const tableData = document.getElementById("tableInput").value;
    const markdownResult = convertTableToMarkdown(tableData);
    document.getElementById("output").value = markdownResult;
  });

// 聆聽複製按鈕的點擊事件
document.getElementById("copyButton").addEventListener("click", () => {
  const output = document.getElementById("output");
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(output.value)
      .then(() => {
        console.log("已複製到剪貼簿"); // 複製成功的提示
      })
      .catch(err => {
        console.error("無法複製到剪貼簿: ", err);
      });
  } else {
    console.error("瀏覽器不支持剪貼簿 API");
  }
});
