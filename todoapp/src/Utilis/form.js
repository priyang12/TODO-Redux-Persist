import { useState } from 'react';

export const useForm = (intitialValue) => {
  const [values, setvalues] = useState(intitialValue);
  return [
    values,
    (e) => {
      setvalues({ ...values, [e.target.name]: e.target.value });
    },
    () => {
      console.log(intitialValue);
      setvalues({ ...intitialValue });
    },
  ];
};
