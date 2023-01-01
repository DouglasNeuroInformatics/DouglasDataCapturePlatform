import React from 'react';

import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center">
      <div className="py-6 sm:py-10">
        <h1 className="text-center text-4xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl">
          {t('home.pageTitle')}
        </h1>
        <p className="mx-auto mt-6 text-center text-lg text-slate-600 ">{t('home.platformDescription')}</p>
      </div>
    </div>
  );
};

export default Home;
