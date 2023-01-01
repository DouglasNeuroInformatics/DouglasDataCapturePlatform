import React from 'react';

import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation('common');
  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center">
      <div className="py-6 sm:py-10">
        <h1 className="text-center text-4xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl">
          {t('welcomeMessage')}
        </h1>
        <p className="mx-auto mt-6 text-center text-lg text-slate-600 ">
          The Douglas Data Capture Platform is build from the ground up to serve the needs of clinical researchers. The
          platform enables you to continuously collect and store data about your clients in a streamlined, secure,
          reliable, and structured manner. This structured data drives a live dashboard with query interfaces to easily
          visualize summary information regarding your clients. Optionally, at your request, we can provide you with a
          subset of this data for research purposes.
        </p>
      </div>
    </div>
  );
};

export default Home;
