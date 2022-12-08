import Head from 'next/head';
import { FC, ReactNode } from 'react';

interface Props {
   children: ReactNode;
   title?: string;
}

const PageWrapper: FC<Props> = ({ children, title }) => {
   return (
      <>
         <Head>
            <title>{title ?? 'Prepise'}</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         {children}
      </>
   );
};

export default PageWrapper;
