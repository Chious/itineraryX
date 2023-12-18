import { AuthProvider } from '../contexts/AuthContext';
import { TripInfoProvider } from '../contexts/TripInfoContext';
import { RoutesInfoProvider } from '../contexts/RoutesInfoContext';
import { CurrentTargetProvider } from '../contexts/CurrentTargetContext';

export function EditPageProvider({ children }) {
  return (
    <AuthProvider>
      <TripInfoProvider>
        <RoutesInfoProvider>
          <CurrentTargetProvider>{children}</CurrentTargetProvider>
        </RoutesInfoProvider>
      </TripInfoProvider>
    </AuthProvider>
  );
}
