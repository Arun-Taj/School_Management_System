// src/components/StateDistrictSelect.js
import React, { useState, useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';
import statesDistricts from './statesDistricts.json';  // Import the JSON file

const StateDistrictSelect = ({ setFieldValue, selectedState, selectedDistrict }) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    setStates(statesDistricts.states);  // Load states from JSON file
  }, []);

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setFieldValue('state', selectedState);
    setFieldValue('district', '');  // Reset district when state changes

    const foundState = states.find((state) => state.state === selectedState);
    setDistricts(foundState ? foundState.districts : []);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Field
          as="select"
          name="state"
          className="w-full bg-white border border-[#5011DD] rounded-3xl px-4 py-2"
          onChange={handleStateChange}
          value={selectedState}
        >
          <option value="" disabled>
            State
          </option>
          {states.map((state, index) => (
            <option key={index} value={state.state}>
              {state.state}
            </option>
          ))}
        </Field>
        <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <Field
          as="select"
          name="district"
          className="w-full bg-white border border-[#5011DD] rounded-3xl px-4 py-2"
          value={selectedDistrict}
          disabled={!districts.length}
        >
          <option value="" disabled>
            District
          </option>
          {districts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </Field>
        <ErrorMessage name="district" component="div" className="text-red-500 text-sm mt-1" />
      </div>
    </div>
  );
};

export default StateDistrictSelect;
