import { NextPage } from 'next';
import CirclesWrapper from '../src/hoks/circlesWrapper/CirclesWrapper';
import PageWrapper from '../src/hoks/pageWrapper/PageWrapper';

const Register: NextPage = () => {
   return (
      <PageWrapper nopadding>
         <CirclesWrapper>register</CirclesWrapper>
      </PageWrapper>
   );
};

export default Register;
