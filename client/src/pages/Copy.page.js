import Page from '../components/Page';
import CopyModel from '../models/Copy.model';
import CopyService from '../services/Copy.service';

export default function CopyPage() {
  return (
    <Page model={CopyModel} service={CopyService} />
  );
}
