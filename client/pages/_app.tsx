import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from '../components/header/Header';
import { Layout } from 'antd';

const { Content } = Layout;

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <>
         <Layout>
            <Header />
            <Content>
               <Component {...pageProps} />
            </Content>
         </Layout>
      </>
   );
}

export default MyApp;
