
import React from 'react';
import { Apartment } from '../types';

interface ApartmentCardProps {
  apartment: Apartment;
  onClick: (apt: Apartment) => void;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment, onClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'available': return 'bg-green-500';
      case 'reserved': return 'bg-orange-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div 
      onClick={() => onClick(apartment)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-all cursor-pointer flex flex-col h-full"
      style={{ backgroundColor: 'var(--platform-bg, #ffffff)' }}
    >
      <div className="relative p-2 bg-gray-50 flex items-center justify-center min-h-[160px]" style={{ backgroundColor: 'var(--platform-secondary-bg, #f4f4f7)' }}>
        <img 
          src={apartment.imageUrl} 
          alt={apartment.title} 
          className="max-w-full max-h-36 object-contain mix-blend-multiply"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-1">
          <div className="bg-white/90 backdrop-blur-md text-[9px] font-bold px-2 py-1 rounded shadow-sm uppercase">
            №{apartment.number}
          </div>
          <div className={`${getStatusColor(apartment.status)} w-2 h-2 rounded-full mt-1.5 ml-1 ring-2 ring-white`}></div>
        </div>
        <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
          {apartment.rooms === 0 ? 'Студия' : `${apartment.rooms}к`}
        </div>
      </div>
      
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-base font-black truncate" style={{ color: 'var(--platform-text, #000000)' }}>
            {formatPrice(apartment.price)}
          </div>
          <div className="flex justify-between items-center text-xs mt-0.5 font-medium">
            <span>{apartment.area} м²</span>
            <span className="text-gray-400">{apartment.floor}/{apartment.maxFloor} эт.</span>
          </div>
        </div>
        
        <div className="mt-3 pt-2 border-t border-gray-50">
          <p className="text-[10px] text-gray-400 uppercase tracking-tighter font-bold truncate">
            {apartment.project}
          </p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-gray-500 font-medium">{apartment.deadline}</span>
            <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-bold" style={{ backgroundColor: 'var(--platform-secondary-bg)' }}>
              {apartment.finishType === 'whitebox' ? 'WhiteBox' : apartment.finishType === 'final' ? 'Чистовая' : 'Черновая'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
