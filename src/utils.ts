export const joinPaths = (...paths: string[]): string => {
    return paths.join('/').replaceAll(/\/+/g, '/');
  };
  
  //update
  export const getFileExtension = (filename: any) => {
    const extension = filename.split('.').pop();
    return extension;
  };
  
  export interface Task {
    id: string;
    text: string;
    category: string;
    priority: 'Low' | 'Medium' | 'High';
    completed: boolean;
  }