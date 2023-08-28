import { useCallback, createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Loader from '../components/Loader';


export const LoaderContext = createContext({loading: false,setLoading:(val:boolean) => {
  return
}});
LoaderContext.displayName = 'LoaderContext';

function LoaderProvider({children}:{children:ReactNode}) {
  const [loading,setLoading] = useState(false);

  const updateStatus = (updatedVal:boolean) => {
    setLoading(updatedVal);
  }
  const props = {
    loading:loading,
    setLoading:updateStatus
  }
  return (
    <LoaderContext.Provider
      value={props}
    >
      <Loader>
      {children}
      </Loader>
    </LoaderContext.Provider>
  );
}
function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error(`useLoader must be used within a LoaderProvider`);
  }
  return context;
}
export { LoaderProvider, useLoader };
