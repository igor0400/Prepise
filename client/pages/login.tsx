import { NextPage } from 'next';
import CirclesWrapper from '../src/hoks/circlesWrapper/CirclesWrapper';
import PageWrapper from '../src/hoks/pageWrapper/PageWrapper';

const Login: NextPage = () => {
   return (
      <PageWrapper nopadding>
         <CirclesWrapper>Log in</CirclesWrapper>
      </PageWrapper>
   );
};

export default Login;
