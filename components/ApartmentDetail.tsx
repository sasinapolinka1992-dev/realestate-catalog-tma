
import React, { useState } from 'react';
import { Apartment } from '../types';
import { SALES_PHONE } from '../constants';

interface ApartmentDetailProps {
  apartment: Apartment;
  onClose: () => void;
  onOpenLeadForm: () => void;
}

const ApartmentDetail: React.FC<ApartmentDetailProps> = ({ apartment, onClose, onOpenLeadForm }) => {
  const [activeImage, setActiveImage] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto pb-32" style={{ backgroundColor: 'var(--tg-theme-bg-color, #ffffff)' }}>
      {/* Top Bar / Navigation */}
      <div className="sticky top-0 z-10 p-4 flex justify-between items-center bg-white/80 backdrop-blur-md" style={{ backgroundColor: 'var(--tg-theme-bg-color, #ffffff)CC' }}>
        <button onClick={onClose} className="p-2 rounded-full bg-gray-100 active:bg-gray-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <span className="font-bold text-lg">Детали объекта</span>
        <div className="w-10"></div>
      </div>

      {/* Gallery */}
      <div className="relative">
        <img 
          src={apartment.gallery[activeImage]} 
          alt={apartment.title} 
          className="w-full aspect-video object-cover"
        />
        {apartment.gallery.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {apartment.gallery.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`w-2 h-2 rounded-full ${idx === activeImage ? 'bg-white w-4' : 'bg-white/50'} transition-all`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info Content */}
      <div className="p-5">
        <h1 className="text-2xl font-black mb-1" style={{ color: 'var(--tg-theme-text-color, #000000)' }}>
          {formatPrice(apartment.price)}
        </h1>
        <p className="text-gray-500 mb-6">{apartment.title}</p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-2xl" style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color, #f4f4f7)' }}>
            <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">Площадь</div>
            <div className="text-lg font-bold">{apartment.area} м²</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl" style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color, #f4f4f7)' }}>
            <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">Этаж</div>
            <div className="text-lg font-bold">{apartment.floor} из {apartment.maxFloor}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl" style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color, #f4f4f7)' }}>
            <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">Район</div>
            <div className="text-lg font-bold">{apartment.district}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl" style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color, #f4f4f7)' }}>
            <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">Проект</div>
            <div className="text-lg font-bold truncate">{apartment.project}</div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3">Описание</h3>
          <p className="text-gray-600 leading-relaxed" style={{ color: 'var(--tg-theme-text-color, #000000)' }}>
            {apartment.description}
          </p>
        </div>

        {/* Contacts Section */}
        <div className="p-5 rounded-3xl border-2 border-dashed border-gray-200 mb-8">
          <h4 className="font-bold mb-4">Связаться с отделом продаж</h4>
          <a href={`tel:${SALES_PHONE}`} className="flex items-center gap-3 text-blue-600 font-bold text-lg mb-2">
            <span className="p-2 bg-blue-50 rounded-lg">📞</span>
            {SALES_PHONE}
          </a>
          <p className="text-sm text-gray-400">Ежедневно с 09:00 до 21:00</p>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-20 flex gap-3">
        <button 
          onClick={onOpenLeadForm}
          className="flex-1 py-4 px-6 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all"
          style={{ backgroundColor: 'var(--tg-theme-button-color, #2481cc)' }}
        >
          Записаться на просмотр
        </button>
      </div>
    </div>
  );
};

export default ApartmentDetail;
