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

export enum IValueTypes {
  Value = "value",
  CheckValue = "checkValue",
  Location = "location"
}
