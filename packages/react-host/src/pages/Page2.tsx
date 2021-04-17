import React from 'react';

interface QuickCreateModule {
  quickCreate: () => Promise<string>;
}

// @ts-ignore
const Footer = React.lazy(() => import('app1/Footer'));

const Page2 = () => {
  const handleClick = async () => {
    // @ts-ignore
    const { quickCreate } = (await import('app3/QuickCreate')) as QuickCreateModule;
    quickCreate().then((result) => {
      console.log('hello', result);
    });
  };
  return (
    <div>
      <h1>Page 2</h1>
      <React.Suspense fallback="Loading Styled Component Button...">
        <Footer></Footer>
      </React.Suspense>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default Page2;
