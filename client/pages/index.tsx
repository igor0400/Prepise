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
            <div className="title text-center justify-center">
               <Image
                  src={logo}
                  alt="logo"
                  width={180}
                  height={100}
                  className="mx-auto"
               />
               <h1 className="text-6xl font-black max-w-4xl py-4 mx-auto">
                  Удобная подготовка к собеседованиям
               </h1>
               <p className="light-text text-xl font-medium max-w-xl mx-auto">
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
