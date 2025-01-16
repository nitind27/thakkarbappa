import React, { createContext, useContext, useState } from 'react';

type FilterContextType = {
  filterData: string;
  setFilterData: React.Dispatch<React.SetStateAction<string>>;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filterData, setFilterData] = useState<string>('');
  return (
    <FilterContext.Provider value={{ filterData, setFilterData }}>
      {children}
    </FilterContext.Provider>
  );
};
