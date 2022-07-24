import RecordPage from '../components/RecordPage';
import { ModelProvider } from '../contexts/ModelContext';
import { ServiceProvider } from '../contexts/ServiceContext';
import UserModel from '../models/User.model';
import UserService from '../services/User.service';

export default function UserPage() {
  return (
    <ModelProvider model={UserModel}>
      <ServiceProvider service={UserService}>
        <RecordPage />
      </ServiceProvider>
    </ModelProvider>
  );
}
