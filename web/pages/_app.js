import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme/theme-dark";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import "../index.css";
import rootReducer from "../store/reducers/index";
import Main from "./main";
// import "../sass/index.scss";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const composeEnhancers =
    (process.env.NODE_ENV === "development"
      ? typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : null) || compose;

  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    console.log(window);
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Main>
            <Component {...pageProps} />
          </Main>
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}
