import { GraphQLScalarType } from "graphql";

export const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "A valid date time value",
  parseValue: (value: any) => new Date(value),
  serialize: (value: any) => new Date(value).toISOString(),
  parseLiteral: (ast: any) => ast.value,
});
