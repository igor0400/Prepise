import { FC, ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
   children: ReactNode;
   type: 'descr' | 'list-item';
}

const ShadowCard: FC<Props> = ({ children, type }) => {
   return (
      <div
         className={classNames(
            'drop-shadow-md text-lg font-medium p-6 bg-white rounded-lg',
            {
               'text-center font-bold': type === 'descr',
            }
         )}
      >
         {type === 'descr' ? <h3>{children}</h3> : <li>{children}</li>}
      </div>
   );
};

export default ShadowCard;
