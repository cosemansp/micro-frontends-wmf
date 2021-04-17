import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// @ts-ignore
const UserList = React.lazy(() => import('app3/UserList'));

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

const Page1 = () => {
  return (
    <div>
      <h1>Page 1</h1>
      <Link to="/page2">Home</Link>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <React.Suspense fallback="Loading User List...">
          <UserList />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Page1;
