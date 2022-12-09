import { FC, useState } from 'react';
import classNames from 'classnames';

import { Layout } from 'antd';
import Image from 'next/image';
import Button, { Themes } from '../templates/Button';

import logo from '../../public/logo100x56.svg';
import plus from '../../public/icons/plus_.svg';
import search from '../../public/icons/search.svg';

const { Header: AntHeader } = Layout;

const Header: FC = () => {
   const [inputFocus, setInputFocus] = useState(false);

   return (
      <AntHeader className="header flex justify-between">
         <Image src={logo} alt="logo" width={100} height={56} />
         <div
            className={classNames(
               'search-input flex justify-between rounded-md ml-10',
               { 'border-2': inputFocus, 'p-0.5': !inputFocus }
            )}
         >
            <input
               className="font-semibold text-base p-2.5 h-9 grow"
               type="text"
               placeholder="Поиск..."
               onFocus={() => setInputFocus(true)}
               onBlur={() => setInputFocus(false)}
            />
            <Image
               className="mr-2.5 my-1.5 cursor-pointer"
               src={search}
               alt="search"
               width={25}
               height={25}
            />
         </div>
         <div className="btns grow flex justify-end gap-3.5">
            <Button theme={Themes.SHADOW}>
               <Image
                  src={plus}
                  alt="plus"
                  width={20}
                  height={20}
                  className="mr-0.5"
               />
               Опубликовать
            </Button>
            <Button>Войти</Button>
            <Button theme={Themes.LINED}>Регистрация</Button>
         </div>
      </AntHeader>
   );
};

export default Header;
