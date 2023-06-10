import Head from "next/head";

import EventsScreen from "../../containers/Events/Events.container";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Events about Climate Awareness</title>
        <meta
          name="description"
          content="That Protest is an online cyber protesting platform created in covid
          lockdown."
        />
        <meta
          name="google-site-verification"
          content="GMukjUvzX7N_4jFCWt-Hu2lgJ4Xi1aDF5r0TZiciNHc"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <EventsScreen />
      </main>
    </div>
  );
}
