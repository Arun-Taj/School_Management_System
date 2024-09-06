import * as Yup from 'yup';

// Aadhar Number must be 12 digits, phone numbers should be 10 digits
const aadharRegExp = /^\d{12}$/;
const phoneRegExp = /^\d{10}$/;
// const zipRegExp = {
//     US: /^\d{5}(-\d{4})?$/,               // USA
//     CA: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,  // Canada
//     UK: /^([A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}|GIR 0AA)$/, // UK
//     DE: /^\d{5}$/,                        // Germany
//     FR: /^\d{5}$/,                        // France
//     AU: /^\d{4}$/,                        // Australia
//     IN: /^\d{6}$/,                        // India
//     IT: /^\d{5}$/,                        // Italy
//     BR: /^\d{5}-\d{3}$/,                  // Brazil
//     JP: /^\d{3}-\d{4}$/,                  // Japan
//     CN: /^\d{6}$/,                        // China
//     NL: /^\d{4} ?[A-Za-z]{2}$/,           // Netherlands
//     MX: /^\d{5}$/,                        // Mexico
//     ZA: /^\d{4}$/,                        // South Africa
//     RU: /^\d{6}$/,                        // Russia
//     NZ: /^\d{4}$/,                        // New Zealand
//     ES: /^\d{5}$/,                        // Spain
//     CH: /^\d{4}$/,                        // Switzerland
//     AR: /^\d{4}$/,                        // Argentina
//     KR: /^\d{5}$/                         // South Korea
//   };
//image should be less than or equal to 5MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const formValidationSchema = Yup.object().shape({
  // Employee information
  employeeFirstName: Yup.string().required(' First Name is required').min(2, 'Must be at least 2 characters'),
  employeeMiddleName: Yup.string(),
  employeeLastName: Yup.string().required('Last Name is required').min(2, 'Must be at least 2 characters'),
  gender: Yup.string().required('Gender is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),

  //File validation
  file: Yup.object().shape({
    file: Yup.mixed()
      .required("A photo is required")
      .test(
        "fileSize",
        "File size is too large",
        (value) => value && value.size <= FILE_SIZE
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  }),
  aadharNumber: Yup.string()
    .matches(aadharRegExp, 'Aadhar Number must be exactly 12 digits')
    .required('Aadhar number is required'),
//   motherTongue: Yup.string().required('Mother Tongue is required'),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  alternatePhoneNumber: Yup.string()
    .matches(phoneRegExp, 'Alternate Phone number must be exactly 10 digits')
    .nullable(),
    email: Yup.string().email('Invalid email address').required('Email is required'),
  selectRole: Yup.string().required('Role is required'),

  // Father's/Husband's information
  fatherFirstName: Yup.string().required('Father First Name is required').min(2, 'Must be at least 2 characters'),
  fatherMiddleName: Yup.string(),
  fatherLastName: Yup.string().required('Father Last Name is required').min(2, 'Must be at least 2 characters'),
  husbandFirstName: Yup.string().required('Husband First Name is required').min(2, 'Must be at least 2 characters'),
  husbandMiddleName: Yup.string(),
  husbandLastName: Yup.string().required('Husband Last Name is required').min(2, 'Must be at least 2 characters'),
  address1: Yup.string().required('Address is required').min(3, 'Must be at least 3 characters'),
  townVillageCity: Yup.string().required('Town/Village/City is required').min(2, 'Must be at least 2 characters'),
  district: Yup.string().required('District is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  zipCode: Yup.string()
    // .matches(zipRegExp, 'Invalid zip code format')
    .required('Zip Code is required'),

  // Mother's information


  // Same as Father/Mother checkbox
  
});
