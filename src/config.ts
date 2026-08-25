/**
 * プロパティ値のパーサ
 */
const propertyParser = {
  /**
   * string 型に変換する
   * @param value 変換対象の文字列
   * @returns string 型に変換された値
   */
  asString: (value: string): string => value,
  /**
   * number 型に変換する
   * @param value 変換対象の文字列
   * @returns number 型に変換された値
   * @throws 変換できない場合は Error を投げる
   */
  asNumber: (value: string): number => {
    const parsed = Number(value);
    if (!value.length || isNaN(parsed))
      throw new Error(`invalid number: "${value}"`);
    return parsed;
  },
  /**
   * boolean 型に変換する
   * @param value 変換対象の文字列
   * @returns boolean 型に変換された値
   * @throws 変換できない場合は Error を投げる
   */
  asBoolean: (value: string): boolean => {
    const normalized = value.toLowerCase();
    if (normalized === "true" || normalized === "1") return true;
    if (normalized === "false" || normalized === "0") return false;
    throw new Error(`invalid boolean: "${value}"`);
  },
};

/**
 * Script Properties を読み込んで検証済みの設定オブジェクトを返す
 */
export const loadConfig = () => {
  const raw = PropertiesService.getScriptProperties().getProperties();

  const getProperty = <T>(
    key: string,
    parser: (value: string) => T,
    options: {required?: boolean; fallback?: T} = {}
  ): T => {
    const value =
      raw[key] === null || raw[key] === undefined
        ? ""
        : String(raw[key]).trim();
    if (!value.length) {
      if (options.required)
        throw new Error(`Required property ${key} is missing.`);
      if (options.fallback !== undefined) return options.fallback;
    }
    try {
      return parser(value);
    } catch (e) {
      throw new Error(
        `Property ${key} is invalid: ${e instanceof Error ? e.message : String(e)}`
      );
    }
  };

  const cfg = {
    stringProperty: getProperty("STRING_PROPERTY", propertyParser.asString),
    numberProperty: getProperty("NUMBER_PROPERTY", propertyParser.asNumber),
    booleanProperty: getProperty("BOOLEAN_PROPERTY", propertyParser.asBoolean),
  } as const;

  return cfg;
};
