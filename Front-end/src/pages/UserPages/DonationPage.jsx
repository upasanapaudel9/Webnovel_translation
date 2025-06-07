import React, { useEffect } from 'react';
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';

const Donation = () => {
  return (
    <>
      <HeaderComponents />
      <main className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#0d172a] text-center text-white">
        <div className="max-w-[1280px] w-full" id="root">
          <div className="card bg-[#121e35] rounded-2xl shadow-lg border border-[#1e2d4a] p-8 mx-auto">
            <h1 className="text-4xl font-semibold text-white mb-4">Support CollabTranslate 💖</h1>
            <p className="text-white/80 mb-6 leading-relaxed">
              Love using CollabTranslate? Help keep it going strong! Your donation helps cover server costs and keeps development active.
            </p>
            <a
              href="https://ko-fi.com/Q5Q31DOG1F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="https://storage.ko-fi.com/cdn/kofi5.png"
                alt="Donate on Ko-fi"
                className="hover:scale-110 transition-transform duration-200"
                height="48"
                style={{ height: '48px', border: 0 }}
              />
            </a>
            <p className="read-the-docs mt-6 text-white/50">Thank you for your support! ☕</p>
          </div>
        </div>
      </main>
      <FooterComponents />
    </>
  );
};

export default Donation;
