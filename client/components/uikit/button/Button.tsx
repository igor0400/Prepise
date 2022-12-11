import { FC, ReactNode } from 'react';

export enum Themes {
   ACCENT = 'accent',
   LINED = 'lined',
   SHADOW = 'shadow',
}

interface Props {
   theme?: Themes;
   children: ReactNode;
}

const Button: FC<Props> = ({ theme = Themes.ACCENT, children }) => {
   return (
      <button
         className={`btn-${theme} btn px-7 flex items-center font-bold text-base`}
      >
         {children}
      </button>
   );
};

export default Button;
