import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BRANDS } from '../data/mockData';
import Icon from '../components/Icon';

interface BrandSelectPageProps {
  onSelectBrand: (brandName: string) => void;
}

const BrandSelectPage: React.FC<BrandSelectPageProps> = ({ onSelectBrand }) => {
  const navigate = useNavigate();

  const handleSelect = (brandName: string) => {
    onSelectBrand(brandName);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-light dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Select a Brand</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Choose a brand to view its unified query dashboard.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {BRANDS.map((brand) => (
          <div
            key={brand.name}
            onClick={() => handleSelect(brand.name)}
            className="bg-white dark:bg-dark rounded-lg shadow p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              <Icon name={brand.logo} className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{brand.name}</h2>
            <div className="flex flex-wrap justify-center gap-2">
                {brand.channels.map(channel => (
                    <span key={channel} className="text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                        {channel}
                    </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandSelectPage;