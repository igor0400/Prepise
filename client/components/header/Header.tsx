import { FC } from 'react';

import { Layout } from 'antd';
import Image from 'next/image';
import Button, { Themes } from '../templates/Button';

import logo from '../../public/logo100x56.svg';
import plus from '../../public/icon/plus_.svg';

const { Header: AntHeader } = Layout;

const Header: FC = () => {
   return (
      <AntHeader className="header flex justify-between">
         <Image src={logo} alt="logo" width={100} height={56} />
         <div className="btns flex gap-3.5">
            <Button theme={Themes.SHADOW}>
               <Image src={plus} alt="plus" width={20} height={20} className='mr-0.5' />
               Опубликовать
            </Button>
            <Button>Войти</Button>
            <Button theme={Themes.LINED}>Регистрация</Button>
         </div>
      </AntHeader>
   );
};

export default Header;
