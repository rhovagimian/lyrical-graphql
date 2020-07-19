//@ts-check
const { printSchema } = require("graphql");
const fs = require("fs");
const schema = require("./schema");
const fileData = printSchema(schema);
fs.writeFile("./server/schema/schema.graphql", fileData, (error) =>
  console.error(error)
);
