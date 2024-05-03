import React from 'react';
import BannerSlider from './BannerSlider';
import { comingSoon } from '../../assets';
import BannerSliderVideo from './BannerSliderVideo';

const Marketing = () => {
  return (
    <div className="xl:p-4 md:p-4 sm:ml-[8rem] text-white">
      <div className="p-4 px-10 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <h2 className="text-left md:text-[30px] xl:text-[40px] font-semibold">Marketing Partner</h2>
        

        {/* Add ComingSoon image */}
        <div className="py-3">
          <img src={comingSoon} alt="Coming Soon" className="w-full mb-4" />
        </div>
      </div>
    </div>
  );
};

export default Marketing;
