import { FC, ReactNode } from 'react';
import Circles from '../../components/circles/Circles';

interface Props {
   children: ReactNode;
}

const CirclesWrapper: FC<Props> = ({ children }) => {
   return (
      <div className="circles-wrapper relative">
         <Circles />
         {children}
      </div>
   );
};

export default CirclesWrapper;
