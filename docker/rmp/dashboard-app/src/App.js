import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./body.css";
import "antd/dist/antd.css";
import { ApolloProvider } from "@apollo/react-hooks";
import { Layout } from "antd";
import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import client from "./graphql/client";
import Header from "./components/Header";
const API_URL = `${document.location.protocol}//${document.location.host}`;

const cubejsApi = cubejs(() => {
  return fetch(`${API_URL}/auth/cubejs-token`)
      .then(res => res.json()).then(r => r.token)
}, {
  apiUrl: `${API_URL}/cubejs-api/v1`
});

const AppLayout = ({ children }) => (
  <Layout
    style={{
      height: "100%"
    }}
  >
    <Header />
    <Layout.Content>{children}</Layout.Content>
  </Layout>
);

const App = ({ children }) => (
  <CubeProvider cubejsApi={cubejsApi}>
    <ApolloProvider client={client}>
      <AppLayout>{children}</AppLayout>
    </ApolloProvider>
  </CubeProvider>
);

export default App;
