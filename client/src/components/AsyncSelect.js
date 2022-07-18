import { useState } from 'react';
import { useField } from 'formik';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

export default function AsyncSelect({
  name, label, fetchFn, placeholder,
}) {
  const [field, meta, helper] = useField({ name, label });
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = async (query) => {
    setIsLoading(true);
    const res = await fetchFn(query);
    console.log(res);
    setOptions(res.records);
    setIsLoading(false);
  };

  const filterBy = () => true;

  return (
    <AsyncTypeahead
      id={name}
      onChange={(selected) => {
        const value = selected.length > 0 ? selected[0].id : '';
        helper.setValue(value);
      }}
      labelKey="name"
      filterBy={filterBy}
      isLoading={isLoading}
      onSearch={handleSearch}
      options={options}
      placeholder={placeholder}
    />
  );
}
