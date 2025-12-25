
import React, { useState, useEffect, useMemo } from 'react';
import { usePlatform } from './hooks/usePlatform';
import { Apartment, Page, Promotion, LeadFormData } from './types';
import { MOCK_APARTMENTS, MOCK_PROMOS, COLLECTIONS, MANAGER_USERNAME, PLAN7_IFRAME_URL } from './constants';
import ApartmentCard from './components/ApartmentCard';
import ApartmentDetail from './components/ApartmentDetail';
import LeadForm from './components/LeadForm';

const App: React.FC = () => {
  const { platform, showAlert, showBackButton, hideBackButton } = usePlatform();
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);

  // Filters
  const [priceMax, setPriceMax] = useState<number>(15000000);
  const [areaMin, setAreaMin] = useState<number>(20);
  const [roomsFilter, setRoomsFilter] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredApartments = useMemo(() => {
    let result = [...MOCK_APARTMENTS];
    if (currentPage === Page.Collections && activeCollectionId) {
      const col = COLLECTIONS.find(c => c.id === activeCollectionId);
      if (col) result = result.filter(col.filter);
    }
    result = result.filter(apt => apt.price <= priceMax && apt.area >= areaMin);
    if (roomsFilter.length > 0) {
      result = result.filter(apt => roomsFilter.includes(apt.rooms));
    }
    return result;
  }, [currentPage, activeCollectionId, priceMax, areaMin, roomsFilter]);

  useEffect(() => {
    if (selectedApartment || selectedPromo || isLeadFormOpen || showFilters || activeCollectionId) {
      showBackButton(() => {
        if (isLeadFormOpen) setIsLeadFormOpen(false);
        else if (selectedApartment) setSelectedApartment(null);
        else if (selectedPromo) setSelectedPromo(null);
        else if (showFilters) setShowFilters(false);
        else if (activeCollectionId) setActiveCollectionId(null);
      });
    } else {
      hideBackButton();
    }
  }, [selectedApartment, selectedPromo, isLeadFormOpen, showFilters, activeCollectionId]);

  const handleLeadSubmit = (data: LeadFormData) => {
    setIsLeadFormOpen(false);
    showAlert('Заявка отправлена! Менеджер скоро свяжется с вами.');
  };

  const handleChatRedirect = () => {
    if (platform === 'tg') {
      window.location.href = `tg://resolve/?domain=${MANAGER_USERNAME}`;
    } else {
      window.location.href = `https://vk.me/public_developer`; 
    }
  };

  const renderHome = () => (
    <div className="pb-24">
      <div className="p-4 bg-white sticky top-0 z-30 shadow-sm" style={{backgroundColor: 'var(--platform-bg)'}}>
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
          {[0, 1, 2, 3].map(room => (
            <button 
              key={room}
              onClick={() => {
                if (roomsFilter.includes(room)) setRoomsFilter(roomsFilter.filter(r => r !== room));
                else setRoomsFilter([...roomsFilter, room]);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border-2 transition-all ${roomsFilter.includes(room) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 border-gray-50 text-gray-500'}`}
            >
              {room === 0 ? 'Студия' : `${room}к`}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
           <div className="flex-1 bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-2" style={{backgroundColor: 'var(--platform-secondary-bg)'}}>
             <span className="text-[10px] font-bold text-gray-400 uppercase">Цена до</span>
             <span className="text-sm font-bold">{(priceMax / 1000000).toFixed(1)} млн</span>
           </div>
           <button 
              onClick={() => setShowFilters(true)}
              className="px-4 bg-blue-600 text-white rounded-xl font-bold text-xs"
              style={{backgroundColor: 'var(--platform-button)'}}
           >
              Фильтры
           </button>
        </div>
      </div>

      <div className="px-4 mt-4 grid grid-cols-2 gap-3">
        {filteredApartments.map(apt => (
          <ApartmentCard key={apt.id} apartment={apt} onClick={setSelectedApartment} />
        ))}
      </div>
    </div>
  );

  const renderInteractive = () => (
    <div className="fixed inset-0 top-0 bottom-[72px] bg-white z-10">
      <iframe 
        src={PLAN7_IFRAME_URL} 
        title="Interactive Plan"
        className="w-full h-full border-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--platform-bg, #ffffff)', color: 'var(--platform-text, #000000)' }}>
      {currentPage === Page.Home && renderHome()}
      {currentPage === Page.Interactive && renderInteractive()}
      
      {currentPage === Page.Promos && (
        <div className="p-4 space-y-4 pb-24">
          <h2 className="text-2xl font-black mb-4">Акции</h2>
          {MOCK_PROMOS.map(promo => (
            <div key={promo.id} onClick={() => setSelectedPromo(promo)} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm" style={{backgroundColor: 'var(--platform-bg)'}}>
              <img src={promo.imageUrl} className="w-full h-48 object-cover" alt={promo.title} />
              <div className="p-5">
                <h3 className="text-lg font-bold mb-1">{promo.title}</h3>
                <p className="text-sm text-gray-500">{promo.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {currentPage === Page.Collections && (
        <div className="p-4 pb-24">
          <h2 className="text-2xl font-black mb-6">{activeCollectionId ? COLLECTIONS.find(c => c.id === activeCollectionId)?.title : 'Подборки'}</h2>
          <div className="space-y-4">
            {!activeCollectionId && COLLECTIONS.map(col => (
              <div key={col.id} onClick={() => setActiveCollectionId(col.id)} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-5 shadow-sm" style={{backgroundColor: 'var(--platform-bg)'}}>
                <div className="text-4xl">{col.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{col.title}</h3>
                  <p className="text-sm text-gray-400">{col.description}</p>
                </div>
              </div>
            ))}
            {activeCollectionId && (
              <div className="grid grid-cols-2 gap-3">
                {filteredApartments.map(apt => <ApartmentCard key={apt.id} apartment={apt} onClick={setSelectedApartment} />)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center py-3 z-40 safe-bottom" style={{backgroundColor: 'var(--platform-bg)F2'}}>
        <button onClick={() => { setCurrentPage(Page.Home); setActiveCollectionId(null); }} className={`flex flex-col items-center gap-1 transition-colors ${currentPage === Page.Home ? 'text-blue-600' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span className="text-[10px] font-bold">Список</span>
        </button>
        <button onClick={() => setCurrentPage(Page.Interactive)} className={`flex flex-col items-center gap-1 transition-colors ${currentPage === Page.Interactive ? 'text-blue-600' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
          <span className="text-[10px] font-bold">На плане</span>
        </button>
        <button onClick={() => setCurrentPage(Page.Promos)} className={`flex flex-col items-center gap-1 transition-colors ${currentPage === Page.Promos ? 'text-blue-600' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
          <span className="text-[10px] font-bold">Акции</span>
        </button>
        <button onClick={handleChatRedirect} className="flex flex-col items-center gap-1 text-gray-400">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
          <span className="text-[10px] font-bold">Связь</span>
        </button>
      </nav>

      {/* Overlays */}
      {selectedApartment && <ApartmentDetail apartment={selectedApartment} onClose={() => setSelectedApartment(null)} onOpenLeadForm={() => setIsLeadFormOpen(true)} />}
      {isLeadFormOpen && <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"><LeadForm onSubmit={handleLeadSubmit} onCancel={() => setIsLeadFormOpen(false)} /></div>}
      
      {showFilters && (
        <div className="fixed inset-0 z-[70] bg-white flex flex-col" style={{backgroundColor: 'var(--platform-bg)'}}>
          <div className="p-4 border-b flex justify-between items-center">
            <button onClick={() => setShowFilters(false)} className="text-blue-600 font-bold">Закрыть</button>
            <h3 className="font-bold">Фильтры</h3>
            <div className="w-10"></div>
          </div>
          <div className="p-6 space-y-8 overflow-y-auto">
             <div>
               <label className="text-xs font-black uppercase text-gray-400 mb-4 block">Цена до: {priceMax.toLocaleString()} ₽</label>
               <input type="range" min="3000000" max="25000000" step="100000" value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-blue-600" />
             </div>
             <div>
               <label className="text-xs font-black uppercase text-gray-400 mb-4 block">Мин. площадь: {areaMin} м²</label>
               <input type="range" min="20" max="150" step="1" value={areaMin} onChange={(e) => setAreaMin(Number(e.target.value))} className="w-full accent-blue-600" />
             </div>
             <button onClick={() => setShowFilters(false)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl" style={{backgroundColor: 'var(--platform-button)'}}>Применить</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
