import Papa from 'papaparse';

export async function parseCSV<T>(filePath: string): Promise<T[]> {
  const response = await fetch(filePath);
  const csvText = await response.text();
  
  return new Promise((resolve, reject) => {
    Papa.parse<T>(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(results.errors);
        } else {
          resolve(results.data);
        }
      },
      error: (error: Error) => reject(error)
    });
  });
}