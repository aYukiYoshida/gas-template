/**
 * Script Properties を読み込んで検証済みの設定オブジェクトを返す
 */
export const loadConfig = () => {
  const raw = PropertiesService.getScriptProperties().getProperties();
  const getStringProperty = (
    key: string,
    options: {required: boolean; fallback?: string} = {required: false}
  ): string => {
    const value =
      raw[key] === null || raw[key] === undefined
        ? ""
        : String(raw[key]).trim();
    if (!value.length && options.required)
      throw new Error(`Required property ${key} is missing.`);
    if (!value.length && options.fallback !== undefined)
      return options.fallback;
    return value;
  };

  const getNumberProperty = (
    key: string,
    options: {required: boolean; fallback?: number} = {required: false}
  ): number => {
    const value =
      raw[key] === null || raw[key] === undefined
        ? undefined
        : Number(raw[key]);
    if (value === undefined && options.fallback !== undefined)
      return options.fallback;
    if (value === undefined || options.required)
      throw new Error(`Required property ${key} is missing.`);
    if (isNaN(value))
      throw new Error(`Property ${key} is an invalid number: ${value}`);
    return value;
  };

  const cfg = {
    numberProperty: getNumberProperty("NUMBER_PROPERTY"),
    stringProperty: getStringProperty("STRING_PROPERTY"),
  };

  return cfg;
};
