import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

// Reusable Input Component
const InputField = ({ label, placeholder, type = "text" }) => (
  <div className="flex flex-col">
    <p className="text-center">{label}</p>
    <input
      type={type}
      placeholder={placeholder}
      className="p-2 rounded-full w-full"
    />
  </div>
);

// Reusable Select Component
const SelectField = ({ label, options }) => (
  <div className="flex flex-col">
    <p className="text-center">{label}</p>
    <select className="p-2 rounded-full bg-white">
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// Reusable Contact Info Component
const ContactInfo = ({ Icon, label, info }) => (
  <div className="flex flex-col">
    <span className="material-icons text-gray-600 mr-2 flex items-center gap-2">
      <Icon />
      {label}
    </span>
    <p className="text-gray-800 pl-6">{info}</p>
  </div>
);

const Profile = () => {
  // Define options for select fields
  const districts = ["Hojai", "Nagaon", "Guwahati"];
  const states = ["Assam", "Meghalaya", "West Bengal"];
  const countries = ["India", "Bangladesh", "Nepal"];

  const [logoFile, setLogoFile] = useState(null);
  const [schoolName, setSchoolName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolBoard, setSchoolBoard] = useState("");
  const [townCity, setTownCity] = useState("");
  const [district, setDistrict] = useState(districts[0]);
  const [state, setState] = useState(states[0]);
  const [country, setCountry] = useState(countries[0]);
  const [pinCode, setPinCode] = useState("");
  const [email, setEmail] = useState("");
  const [displayedProfile, setDisplayedProfile] = useState({
    logo: null,
    schoolName: "",
    tagLine: "",
    schoolBoard: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleLogoUpload = () => {
    // Trigger the file input click event
    document.getElementById("logo-input").click();
  };
  const handleSubmit = () => {
    // Create an object with the form data
    const updatedProfile = {
      logo: logoFile,
      schoolName:schoolName,
      tagLine,
      schoolBoard,
      address: `${address}, ${townCity}, ${district}, ${state}, ${country}, ${pinCode}`,
      phone,
      email,
    };

    // Set the state with the updated profile data (Assume you have state for these)
    setDisplayedProfile(updatedProfile);

    console.log("Form Submitted:", updatedProfile);
  };

  return (
    <div className="p-8 bg-pink-100">
      <div className="flex gap-4 bg-white rounded-3xl p-2">
        <div className="flex items-center space-x-2">
          <FaRegUserCircle className="text-gray-700" />
          <span className="text-gray-700 font-medium">Profile</span>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center mt-8">
        Update Profile
      </h1>

      <div className="grid grid-cols-3">
        {/* Left Side */}
        <div className="col-span-2">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-center">School Name</p>
              <div className="flex flex-col bg-white items-center rounded-lg p-4 border">
                <div className="w-24 h-24 bg-gray-200 rounded-lg">
                  {logoFile ? (
                    <img
                      src={URL.createObjectURL(logoFile)}
                      alt="Logo"
                      className="w-24 h-24 rounded-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="logo-input"
                    onChange={handleLogoChange}
                  />
                </div>
                <button
                  className="mt-2 text-blue-500"
                  onClick={handleLogoUpload}
                >
                  Change Logo
                </button>
              </div>
            </div>

            <div className="col-span-2 space-y-4">
              <InputField
                label="School Name"
                placeholder="Name of the School"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />
              <InputField
                label="Tag Line"
                placeholder="Tag Line (Optional)"
                value={tagLine}
                onChange={(e) => setTagLine(e.target.value)}
              />
              <InputField
                label="Address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="col-span-1 space-y-4">
              <InputField
                label="Phone No."
                placeholder="Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <SelectField
                label="School Board"
                options={["CBSE", "NEB", "SEE"]}
                value={schoolBoard}
                onChange={(e) => setSchoolBoard(e.target.value)}
              />
              <InputField
                label="Town/Village/City"
                placeholder="Town/Village/City"
                value={townCity}
                onChange={(e) => setTownCity(e.target.value)}
              />
            </div>
          </div>

          {/* Lower Row */}
          <div className="flex space-x-4 mt-4">
            <InputField
              label="Email"
              placeholder="xyzh@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <SelectField
              label="District"
              options={districts}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
            <SelectField
              label="State"
              options={states}
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <SelectField
              label="Country"
              options={countries}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <InputField
              label="Pin Code"
              placeholder="782435"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
          <div className="flex justify-center pt-10">
            <button
              className="bg-pink-500 p-2 px-6 rounded-full "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-span-1">
          <div className="max-w-xs mx-auto bg-white p-6 rounded-lg shadow-lg">
            {/* Logo Section */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-gray-200 rounded-md">
                {displayedProfile.logo && (
                  <img
                    src={URL.createObjectURL(displayedProfile.logo)}
                    alt="Logo"
                    className="w-24 h-24 rounded-md"
                  />
                )}
              </div>
            </div>

            {/* School Name */}
            <h2 className="text-xl font-bold text-center mb-2">
              {displayedProfile.schoolName || "XYZ Higher Secondary School"}
            </h2>

            {/* Tagline */}
            <p className="text-gray-600 text-center mb-4">
              {displayedProfile.tagLine ||
                "Lorem ipsum dolor sit amet consectetur. Feugiat id."}
            </p>
            {/* School Board */}
            <p className="text-gray-600 text-center mb-4">
              {displayedProfile.schoolBoard || "CBSE"}
            </p>
            <hr className="my-4" />

            {/* Contact Information */}
            <div className="space-y-3">
              <ContactInfo Icon={FaPhoneAlt} label="Phone" info="0123456789" />
              <ContactInfo
                Icon={MdOutlineMailOutline}
                label="Email"
                info="xyzh@gmail.com"
              />
              <ContactInfo
                Icon={CiLocationOn}
                label="Address"
                info="PHE Road, Near public health office, Rampur, Hojai, Assam, 782435"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
