/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation SignupUser($email: String!, $name: String!, $password: String!) {\n    signupUser(email: $email, name: $name, password: $password) {\n      id\n      name\n      email\n    }\n  }\n": types.SignupUserDocument,
    "\n  query ListUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n": types.ListUsersDocument,
};

export function graphql(source: "\n  mutation SignupUser($email: String!, $name: String!, $password: String!) {\n    signupUser(email: $email, name: $name, password: $password) {\n      id\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation SignupUser($email: String!, $name: String!, $password: String!) {\n    signupUser(email: $email, name: $name, password: $password) {\n      id\n      name\n      email\n    }\n  }\n"];
export function graphql(source: "\n  query ListUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  query ListUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;