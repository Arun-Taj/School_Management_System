import React, { useEffect, useState, useContext } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";
import satesDistrictsJSON from "../../Pages/SignUp&SignIn/statesDistricts.json";
import { use } from "react";

const base_url = import.meta.env.VITE_API_BASE_URL;
// Reusable Input Component
const InputField = ({ label, placeholder, onChange, type = "text" }) => (
  <div className="flex flex-col">
    <p className="text-center">{label}</p>
    <input
      type={type}
      placeholder={placeholder}
      className="p-2 rounded-full w-full"
      onChange={onChange}
    />
  </div>
);

// Reusable Select Component
// const SelectField = ({ label, options }) => (
//   <div className="flex flex-col">
//     <p className="text-center">{label}</p>
//     <select className="p-2 rounded-full bg-white" value={ }
//       onChange={(e) => setSelectedOption(e.target.value)}

//     >
//       {options.map((option, index) => (
//         <option key={index} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// Reusable Contact Info Component
const ContactInfo = ({ Icon, label, info }) => (
  <div className="flex flex-col">
    <span className="material-icons text-gray-600 mr-2 flex items-center gap-2 font-extrabold">
      <Icon />
      {label}
    </span>
    <p className="text-gray-800 pl-6">{info}</p>
  </div>
);

function getStates(jsonData) {
  return jsonData.states.map((stateObj) => stateObj.state);
}
function getDistrictsByState(jsonData, stateName) {
  const stateObj = jsonData.states.find(
    (stateObj) => stateObj.state === stateName
  );
  return stateObj ? stateObj.districts : []; // Return districts or empty array if state not found
}


let schoolId = null
let adminId = null

const Profile = () => {
  const { api } = useContext(AuthContext);
  const navigate = useNavigate();
  // Define options for select fields

  const countries = ["India"];
  const [states, setStates] = useState(getStates(satesDistrictsJSON));
  const [districts, setDistricts] = useState([]);

  const [logoFile, setLogoFile] = useState(null);
  const [schoolName, setSchoolName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolBoard, setSchoolBoard] = useState('')
  const [schoolBoards, setSchoolBoards] = useState([
    "CBSE",
    "SEBA",
    "AHSEC",
    "OTHERS",
  ]);
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

  useEffect(() => {
    setStates(getStates(satesDistrictsJSON));
  }, []);
  useEffect(() => {
    setDistricts(getDistrictsByState(satesDistrictsJSON, state));
  }, [state]);

  useEffect(() => {
    const getSchoolData = async () => {
      try {
        const response = await api.get("/school_info/");
        // console.log(response.data);
        const school_data = response.data.school;
        const admin_user = response.data.admin;

        schoolId = school_data.id;
        adminId = admin_user.id

        setSchoolName(school_data.school_name);
        setSchoolBoard(school_data.school_board);
        setTagLine(school_data.tag_line);
        setPhone(school_data.phone);
        setAddress(school_data.address);
        setTownCity(school_data.town_village_city);
        setEmail(admin_user.email);
        setPinCode(school_data.pincode);
        setLogoFile(`${base_url}/${school_data.photo}`);
        setState(school_data.state);
        setDistrict(school_data.district);


        setDisplayedProfile({
          logo: school_data.photo,
          schoolName: school_data.school_name,
          tagLine: school_data.tag_line,
          schoolBoard: school_data.school_board.toUpperCase(),
          address: `${school_data.address}, ${school_data.town_village_city}, ${school_data.district}, ${school_data.state}, ${school_data.country}, ${school_data.pincode}`,
          phone: admin_user.phone_number,
          email: admin_user.email,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getSchoolData();
  }, [api]);

  const handleLogoChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const file_url = URL.createObjectURL(file);
      setLogoFile(file_url);
    }
  };

  const handleLogoUpload = (e) => {
    e.preventDefault()
    // Trigger the file input click event
    document.getElementById("logo-input").click();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");


    const formData = new FormData(e.currentTarget);
    formData.append("school_id", schoolId);
    formData.append("admin_id", adminId);
    formData.append("school_name", schoolName);

    formData.append("tag_line", tagLine);
    formData.append("pincode", pinCode);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("town_village_city", townCity);

    // console.log(formData.get("address"));



    // console.log("Form Submitted:", updatedProfile);

    const sendToServer = async () => {
      try {
        const response = await api.post("/update_school_info/", formData);
        // console.log(response.data);
        alert("Profile updated successfully!");
        navigate("/dashboard");

      } catch (error) { }


    }
    sendToServer()


    // Create an object with the form data
    const updatedProfile = {
      logo: logoFile,
      schoolName: schoolName,
      tagLine,
      schoolBoard,
      address: `${address}, ${townCity}, ${district}, ${state}, ${country}, ${pinCode}`,
      phone,
      email,
    };

    // Set the state with the updated profile data (Assume you have state for these)
    setDisplayedProfile(updatedProfile);


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
          <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-center">School Logo</p>
                <div className="flex flex-col bg-white items-center rounded-lg p-4 border">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg">
                    {logoFile ? (
                      <img
                        src={logoFile}
                        alt="Logo"
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="logo-input"
                      name="photo"
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
                  placeholder={schoolName}
                  value={schoolName}
                  name="schoolName"
                  onChange={(e) => setSchoolName(e.target.value)}
                />
                <InputField
                  label="Tag Line"
                  placeholder={tagLine}
                  value={tagLine}
                  name="tag_line"
                  onChange={(e) => setTagLine(e.target.value)}
                />
                <InputField
                  label="Address"
                  placeholder={address}
                  value={address}
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="col-span-1 space-y-4">
                <InputField
                  label="Phone No."
                  placeholder={phone}
                  type="tel"
                  value={phone}
                  name="phone_number"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="flex flex-col">
                  <p className="text-center">School Board</p>
                  <select className="p-2 rounded-full bg-white" value={schoolBoard}
                    onChange={(e) => setSchoolBoard(e.target.value)}
                    name="school_board"

                  >
                    {schoolBoards.map((option, index) => (
                      <option key={index} value={option}>
                        {option.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <InputField
                  label="Town/Village/City"
                  placeholder={townCity}
                  value={townCity}
                  name="town_village_city"
                  onChange={(e) => setTownCity(e.target.value)}
                />
              </div>
            </div>

            {/* Lower Row */}
            <div className="flex space-x-4 mt-4">
              <InputField
                label="Email"
                placeholder={email}
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="flex flex-col">
                <p className="text-center">Country</p>
                <select className="p-2 rounded-full bg-white" value={countries}
                  onChange={(e) => setCountry(e.target.value)}
                  name="country"

                >
                  {countries.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <p className="text-center">State</p>
                <select className="p-2 rounded-full bg-white" value={state}
                  name="state"
                  onChange={(e) => {
                    const newState = e.target.value;
                    setState(newState);

                  }}
                >
                  {states.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <p className="text-center">District</p>
                <select className="p-2 rounded-full bg-white" value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  name="district"
                >
                  {districts.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <InputField
                label="Pin Code"
                placeholder={pinCode}
                value={pinCode}
                name="pincode"
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="flex justify-center pt-10">
              <button
                className="bg-pink-500 p-2 px-6 rounded-full "
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>

        {/* Right Side */}
        <div className="col-span-1">
          <div className="max-w-xs mx-auto bg-white p-6 rounded-lg shadow-lg">
            {/* Logo Section */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-gray-200 rounded-md">
                {displayedProfile.logo && (
                  <img
                    src={`${base_url}/${displayedProfile.logo}`}
                    alt="Logo"
                    className="w-24 h-24 rounded-md object-cover"
                  />
                )}
              </div>
            </div>

            {/* School Name */}
            <h2 className="text-xl font-bold text-center mb-2">
              {displayedProfile.schoolName}
            </h2>

            {/* Tagline */}
            <p className="text-gray-600 text-center mb-4">
              {displayedProfile.tagLine}
            </p>
            {/* School Board */}
            <p className="text-gray-600 text-center mb-4">
              {displayedProfile.schoolBoard}
            </p>
            <hr className="my-4" />

            {/* Contact Information */}
            <div className="space-y-3">
              <ContactInfo
                Icon={FaPhoneAlt}
                label="Phone"
                info={displayedProfile.phone}
              />
              <ContactInfo
                Icon={MdOutlineMailOutline}
                label="Email"
                info={displayedProfile.email}
              />
              <ContactInfo
                Icon={CiLocationOn}
                label="Address"
                info={displayedProfile.address}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
