import React from 'react';

import Layout from '../components/Layout.js';

const IndexPage = () => {
  return (
    <Layout>
      <div className="py-6 sm:py-10">
        <h1 className="text-center text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
          Welcome to the Douglas Data Capture Platform
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600 dark:text-slate-400">
          The Douglas Data Capture Platform is build from the ground up to serve the needs of clinical researchers. The
          platform enables you to continuously collect and store data about your clients in a streamlined, secure,
          reliable, and structured manner. This structured data drives a live dashboard with query interfaces to easily
          visualize summary information regarding your clients. Optionally, at your request, we can provide you with a
          subset of this data for research purposes.
        </p>
      </div>
      <div className="flex justify-center space-x-6 text-sm">
        <a
          className="dark:highlight-white/20 flex h-12 w-full items-center justify-center rounded-lg bg-slate-900 px-6 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:hover:bg-sky-400 sm:w-auto"
          href="/docs/installation"
        >
          Learn More
        </a>
      </div>
    </Layout>
  );
};

export default IndexPage;
