export class StorageService {
  
  static setData(data: any, key: string) {
    if(key !== "user"){
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
    }
    
  };

  static getData(defaultMockData: any, key: string) {
    const storedData = localStorage.getItem(key);
    if(storedData) {
      return JSON.parse(storedData);
    } else {
      localStorage.setItem(key, JSON.stringify(defaultMockData));
      return defaultMockData;
    }


  }
};
