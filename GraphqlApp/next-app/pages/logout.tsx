import { MyContext } from '../interfaces/MyContext';
import { LogoutMutation } from '../graphql/user/mutations/logout';
import { withApollo } from '../lib/withApollo';
import redirect from '../lib/redirect';

const LogoutPage = () => {
    return null;
}

LogoutPage.getInitialProps = async ({ apolloClient, ...ctx }: MyContext) => {
    await apolloClient.mutate({ mutation: LogoutMutation });
    await apolloClient.resetStore();
    redirect(ctx, '/login');
    return {};
}

export default withApollo(LogoutPage);