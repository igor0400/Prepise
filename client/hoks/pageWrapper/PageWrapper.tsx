import Head from 'next/head';
import { FC, ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
   children: ReactNode;
   title?: string;
   nopadding?: boolean;
}

const PageWrapper: FC<Props> = ({ children, title, nopadding }) => {
   return (
      <>
         <Head>
            <title>{title ?? 'Prepise'}</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <div
            className={classNames('content-wrapper', { padding: !nopadding })}
         >
            {children}
         </div>
      </>
   );
};

export default PageWrapper;
