import xlsx from "xlsx";

export function excelToJSON(pathFile: string): any[] {
  // Lê o arquivo Excel
  const workbook: xlsx.WorkBook = xlsx.read(pathFile, { type: "buffer" });

  // Obtém a aba desejada (ou a primeira se não for informada)
  const sheetName: string = workbook.SheetNames[0];
  const worksheet: xlsx.WorkSheet | undefined = workbook.Sheets[sheetName];

  if (!worksheet) {
    throw new Error(`A aba "${sheetName}" não foi encontrada no arquivo.`);
  }

  // Converte os dados da planilha para JSON
  const jsonData: any[] = xlsx.utils.sheet_to_json(worksheet);

  return jsonData;
}
