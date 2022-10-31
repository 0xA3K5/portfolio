import { AnimatePresence } from "framer-motion";
import type { AppContext, AppProps } from "next/app";
import Footer from "../src/components/Footer";
import CTA from "../src/components/CTA";
import App from "next/app";
import { SessionProvider } from "next-auth/react";

import "../src/styles/globals.css";
function MyApp({
  Component,
  router,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const url = `https://akml.io${router.route}`;

  return (
    <SessionProvider session={session}>
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} canonical={url} key={url} />
      </AnimatePresence>
      <CTA />
      <Footer />
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  // const cookies = new Cookies(appContext.ctx.req.headers.cookie);
  // const password = cookies.get(consts.SiteReadCookie) ?? "";

  // if (password === "hireak") {
  //   appProps.pageProps.hasReadPermission = true;
  // }

  return { ...appProps };
};

export default MyApp;
