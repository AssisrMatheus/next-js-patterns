import { GraphQLNamedType } from "graphql";
// For some reason, date from 'graphql-scalars' does not work on ssr for now
import { GraphQLDateTime } from "graphql-iso-date";
import { asNexusMethod } from "nexus";

export const DateTime = asNexusMethod(
  GraphQLDateTime as unknown as GraphQLNamedType,
  "date"
);
