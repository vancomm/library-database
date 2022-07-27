import RecordPage from '../components/RecordPage';
import { useAuth } from '../contexts/AuthContext';
import { ModelProvider } from '../contexts/ModelContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import BorrowModel from '../models/Borrow.model';
import BorrowService from '../services/Borrow.service';

export default function BorrowPage() {
  const { token } = useAuth();
  console.log(token);
  return (
    <ModelProvider model={BorrowModel}>
      <ServiceProvider service={BorrowService}>
        <RecordPage />
      </ServiceProvider>
    </ModelProvider>
  );
}
