export interface BlocksInterface {
  list: {
    id: number;
    title: string;
    sortOrder: number;
    preset: {
      id: string;
      params: {
        id: string;
        blockId: number;
        params: any;
        position: {
          id: number;
          sortOrder: number;
          value: number;
        };
        shown: boolean;
        sortOrder: number;
        value: string;
      };
    };
  }[];
}
