import Page from '../components/Page';
import TagModel from '../models/Tag.model';
import TagService from '../services/Tag.service';

export default function TagPage() {
  return (
    <Page
      service={TagService}
      model={TagModel}
    />
  );
}
