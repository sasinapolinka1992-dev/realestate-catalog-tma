
import React, { useState } from 'react';
import { LeadFormData } from '../types';

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void;
  onCancel: () => void;
  title?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, onCancel, title = "Забронировать или узнать больше" }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    comment: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-2xl w-full max-w-md" style={{ backgroundColor: 'var(--tg-theme-bg-color, #ffffff)' }}>
      <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--tg-theme-text-color, #000000)' }}>{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Ваше имя</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            style={{ 
              backgroundColor: 'var(--tg-theme-secondary-bg-color, #f4f4f7)',
              color: 'var(--tg-theme-text-color, #000000)',
              borderColor: 'rgba(0,0,0,0.1)'
            }}
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Иван Иванов"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Телефон</label>
          <input
            type="tel"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            style={{ 
              backgroundColor: 'var(--tg-theme-secondary-bg-color, #f4f4f7)',
              color: 'var(--tg-theme-text-color, #000000)',
              borderColor: 'rgba(0,0,0,0.1)'
            }}
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="+7 (___) ___-__-__"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Комментарий (необязательно)</label>
          <textarea
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all h-24"
            style={{ 
              backgroundColor: 'var(--tg-theme-secondary-bg-color, #f4f4f7)',
              color: 'var(--tg-theme-text-color, #000000)',
              borderColor: 'rgba(0,0,0,0.1)'
            }}
            value={formData.comment}
            onChange={(e) => setFormData({...formData, comment: e.target.value})}
            placeholder="Интересует рассрочка или ипотека..."
          />
        </div>
        
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 rounded-xl font-medium text-gray-500 bg-gray-100 active:bg-gray-200"
            style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color, #f4f4f7)' }}
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-[2] px-4 py-3 rounded-xl font-bold text-white bg-blue-600 active:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
            style={{ backgroundColor: 'var(--tg-theme-button-color, #2481cc)' }}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Отправить'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
