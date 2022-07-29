import { useState } from 'react';
import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import cn from 'classnames';

export default function AsyncSelect({
  name, label, labelKey, fetchFn, placeholder, refProp, initialValue, multiple,
}) {
  const [field, meta, helper] = useField({
    name, label, type: 'text',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  return (
    <>
      <div className={cn({ 'is-invalid': !!meta.error && meta.touched })}>
        <AsyncTypeahead
          id={name}
          labelKey={labelKey}
          placeholder={placeholder}
          ref={refProp}
          onChange={helper.setValue}
          onSearch={async (query) => {
            setIsLoading(true);
            const res = await fetchFn(query);
            setOptions(res.records);
            setIsLoading(false);
          }}
          isLoading={isLoading}
          options={options}
          multiple={multiple}
          defaultSelected={initialValue}
          isInvalid={!!meta.error && meta.touched}
        />
      </div>
      <Form.Control.Feedback key={`fb-typeahead-${name}`} type="invalid">{meta.error}</Form.Control.Feedback>
    </>
  );
}
