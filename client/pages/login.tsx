import { NextPage } from 'next';
import CirclesWrapper from '../hoks/circlesWrapper/CirclesWrapper';
import PageWrapper from '../hoks/pageWrapper/PageWrapper';

const Login: NextPage = () => {
   return (
      <PageWrapper nopadding>
         <CirclesWrapper>Log in</CirclesWrapper>
      </PageWrapper>
   );
};

export default Login;
