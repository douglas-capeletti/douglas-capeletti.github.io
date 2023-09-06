export interface IPage {
  data: any[];
  start: number;
  end: number;
  size: number;
  total: number;
  currentPage: number;
  lastPage: number;
  url: IPageURL;
}

export interface IPageURL {
  current: string;
  prev: string | undefined;
  next: string | undefined;
}
