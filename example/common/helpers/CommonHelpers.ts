export class CommonHelpers {
  public static isString(value: any) {
    return typeof value === 'string' || value instanceof String;
  }

  public static stringFormat(template: string, ...args: any[]): string {
    return template.replace(/{(\d+)}/g, (match, number) => {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  }

  public static copyObject<Type>(obj: Type): Type {
    return JSON.parse(JSON.stringify(obj));
  }
}
