export type ImportStatusType = {
  status: string;
  message: string;
  updatedAt: string;
  createdAt: string;
};

export type ImportStatusState = {
  page: number;
  lastPage: number;
  perPage: number;
  total: number;
  from: number;
  to: number;
};
