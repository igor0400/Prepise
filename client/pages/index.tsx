import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import PageWrapper from '../src/hoks/pageWrapper/PageWrapper';
import CirclesWrapper from '../src/hoks/circlesWrapper/CirclesWrapper';

import logo from '../public/logo300x168.svg';
import arrow from '../public/icons/arrow-right.svg';
import Cards from '../src/components/main/cards/Cards';

const Home: NextPage = () => {
   return (
      <PageWrapper nopadding>
         <CirclesWrapper>
            <div className="title text-center justify-center padding-50">
               <Image
                  src={logo}
                  alt="logo"
                  width={180}
                  height={100}
                  className="mx-auto md:w-44 sm:w-36 w-28"
               />
               <h1 className="text-4xl sm:text-5xl md:text-6xl font-black max-w-4xl sm:py-4 py-3 mx-auto">
                  Удобная подготовка к собеседованиям
               </h1>
               <p className="text-base sm:text-lg md:text-xl light-text font-medium sm:max-w-xl max-w-md mx-auto">
                  Готовьтесь сами, помогайте другим, ищите работу или
                  сотрудника!
               </p>
               <Link href="/" className="gradient-btn">
                  <p>Начать</p>
                  <Image src={arrow} alt="arrow" width={24} height={24} />
               </Link>
            </div>
         </CirclesWrapper>
         <Cards />
      </PageWrapper>
   );
};

export default Home;
