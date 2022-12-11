import type { NextPage } from 'next';
import Image from 'next/image';
import PageWrapper from '../hoks/PageWrapper';
import Circles from '../components/circles/Circles.jsx';
import Link from 'next/link';

import logo from '../public/logo300x168.svg';
import arrow from '../public/icons/arrow-right.svg';

const Home: NextPage = () => {
   return (
      <PageWrapper>
         <div className="home-wrapper">
            <Circles />
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
               <Link href="some" className="gradient-btn">
                  <p>Начать</p>
                  <Image src={arrow} alt="arrow" width={24} height={24} />
               </Link>
            </div>
         </div>
      </PageWrapper>
   );
};

export default Home;
