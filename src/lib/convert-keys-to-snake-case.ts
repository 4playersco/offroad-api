import snakeCase from "lodash/snakeCase";

const convertKeysToSnakeCase = (obj: object) => {
  return Object.entries(obj).reduce((memo, entry) => {
    return { ...memo, [snakeCase(entry[0])]: entry[1] };
  }, {});
};

export default convertKeysToSnakeCase;
