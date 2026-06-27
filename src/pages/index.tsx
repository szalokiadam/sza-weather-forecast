import HomePage from '@/components/page/home';
import { WeatherProvider } from '@/components/page/home/context';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Időjárás előrejelzés</title>
      </Head>
      <WeatherProvider>
        <HomePage />
      </WeatherProvider>
    </>
  );
}
