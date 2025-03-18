import camelCase from "lodash/camelCase";

const convertKeysToCamelCase = (obj: object) => {
  return Object.entries(obj).reduce((memo, entry) => {
    return { ...memo, [camelCase(entry[0])]: entry[1] };
  }, {});
};

export default convertKeysToCamelCase;
