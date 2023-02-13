export type Sushi = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'succes',
  ERROR = 'error',
}

export interface SushiSliceState {
  items: Sushi[];
  status: Status;
}
