import { useState } from 'react';
import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import cn from 'classnames';

export default function AsyncSelect({
  name, label, labelKey, fetchFn, placeholder, refProp, initialValue, multiple,
}) {
  const [field, meta, helper] = useField({
    name, label, type: 'text', multiple,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const setSingleSelections = (selected) => {
    const value = selected.length > 0
      ? selected[0].id
      : null;
    helper.setValue(value);
  };

  const setMultiSelections = (selected) => {
    const value = selected.length > 0
      ? selected.map(({ id }) => id)
      : null;
    helper.setValue(value);
  };

  return (
    <>
      <div className={cn({ 'is-invalid': !!meta.error && meta.touched })}>
        <AsyncTypeahead
          id={name}
          labelKey={labelKey}
          defaultInputValue={initialValue || ''}
          placeholder={placeholder}
          ref={refProp}
          onChange={multiple ? setMultiSelections : setSingleSelections}
          onSearch={async (query) => {
            setIsLoading(true);
            const res = await fetchFn(query);
            setOptions(res.records);
            setIsLoading(false);
          }}
          isLoading={isLoading}
          options={options}
          multiple={multiple}
          isInvalid={!!meta.error && meta.touched}
        />
      </div>
      <Form.Control.Feedback key={`fb-typeahead-${name}`} type="invalid">{meta.error}</Form.Control.Feedback>
    </>
  );
}
