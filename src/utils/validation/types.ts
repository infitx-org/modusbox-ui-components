export interface ValidationMessage {
  active: boolean;
  message: string;
}

export interface ValidationField {
  isValid: boolean;
  isRequired: boolean;
  messages: ValidationMessage[];
  token: Object[];
  fields?: ValidationFields[];
}

export interface ValidationFields {
  [name: string]: ValidationField;
}

export interface ValidationResults {
  isValid: boolean;
  fields: ValidationFields;
  messages: ValidationMessage[];
  token: Object[];
}
