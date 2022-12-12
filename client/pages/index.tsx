import type { NextPage } from 'next';
import Image from 'next/image';
import PageWrapper from '../hoks/pageWrapper/PageWrapper';
import Link from 'next/link';

import logo from '../public/logo300x168.svg';
import arrow from '../public/icons/arrow-right.svg';
import CirclesWrapper from '../hoks/circlesWrapper/CirclesWrapper';
import Cards from '../components/main/cards/Cards';

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
         <p className='text-xl p-10'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. At quae
            doloribus saepe quaerat quos adipisci soluta molestiae odio,
            assumenda provident expedita, illum voluptatibus dignissimos.
            Voluptate rem officia consequuntur harum ad. Inventore reprehenderit
            corrupti dolorum culpa ipsum, quisquam doloribus vero sapiente
            error, voluptas ex quae unde? Officiis cumque, vitae reiciendis
            recusandae maxime nulla fugit natus totam alias, debitis dignissimos
            impedit dolorum. Error facilis obcaecati sit magni tempora adipisci
            voluptatem doloribus, placeat quo dolor temporibus voluptatibus
            aliquid odio iusto amet dicta, suscipit repellendus, voluptate
            reiciendis expedita! Autem consequatur provident sequi nesciunt
            dolorem! Dolorem provident quia fugiat labore earum doloribus
            tempore molestiae ipsum amet aut modi vel eum deleniti ab quas,
            culpa quae quisquam optio vitae dicta. Doloribus voluptatibus ab
            placeat molestiae praesentium. Vel quidem necessitatibus velit,
            repudiandae deleniti totam soluta molestiae, impedit ipsum
            voluptates rem fugiat perspiciatis accusamus iste. Iusto mollitia
            eius molestias fugit ex ipsum sequi. Commodi laudantium odit natus
            quo. Molestias commodi soluta saepe, excepturi laboriosam
            repellendus ex ad voluptatem expedita rerum, id accusantium corporis
            enim dicta quaerat nihil distinctio deleniti neque dignissimos error
            dolorum doloremque. Porro deserunt libero facere! Illum sapiente
            velit vel maiores eveniet, quaerat obcaecati, earum at, iusto quod
            blanditiis ipsum aut placeat alias aliquam minus iure vero?
            Perferendis similique assumenda labore odio, officiis nulla magni
            dolore? Quis doloribus ratione quod accusamus quas natus sequi vero
            sint corporis ex, temporibus omnis, quasi voluptatem hic soluta
            nulla incidunt ducimus adipisci eos. Optio commodi voluptatum, fugit
            suscipit deserunt consectetur?
         </p>
      </PageWrapper>
   );
};

export default Home;
