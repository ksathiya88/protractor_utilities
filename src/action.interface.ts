export enum LocationTypes {
  Id = "id",
  Xpath = "xpath",
  Class = "class"
}

export interface ILocRef {
  type: LocationTypes;
  value: string;
}

export interface IElement {
  location: ILocRef;
  value: string;
}
