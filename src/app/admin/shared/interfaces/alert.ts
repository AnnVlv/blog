export interface IAlert {
  type: IAlertType;
  message: string;
}

export type IAlertType = 'success' | 'warning' | 'danger';
