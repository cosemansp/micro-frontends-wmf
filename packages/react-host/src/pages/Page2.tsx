import React from 'react';

// @ts-ignore
const Button = React.lazy(() => import('myApp/Button'));

const Page2 = () => (
  <div>
    <h1>Page 2</h1>
    <React.Suspense fallback="Loading Styled Component Button...">
      <Button>&#128133; Button</Button>
    </React.Suspense>
  </div>
);

export default Page2;
