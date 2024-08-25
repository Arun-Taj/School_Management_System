import React, { useRef,useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoIosArrowDropleft } from "react-icons/io";

function AdminDetails() {
  const fileInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(null); // To store the uploaded image preview
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Form submitted successfully!");
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Preview the uploaded photo
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-pink-100 rounded-3xl p-8 w-full max-w-2xl">
        <h1 className="text-center text-xl font-semibold mb-6">
          Admin Details
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="w-full border rounded-3xl px-4 py-2"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Middle Name"
                className="w-full border rounded-3xl px-4 py-2"
                {...register("middleName")}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border rounded-3xl px-4 py-2"
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>
            <div>
              <select
                className="w-full border rounded-3xl px-4 py-2"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="" disabled selected>
                  Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <span className="text-red-500 text-sm">
                  {errors.gender.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="date"
                placeholder="Date of Birth"
                className="w-full border rounded-3xl px-4 py-2"
                {...register("dateOfBirth", {
                  required: "Date of Birth is required",
                })}
              />
              {errors.dateOfBirth && (
                <span className="text-red-500 text-sm">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Alternate Phone No."
                className="w-full border rounded-3xl px-4 py-2"
                {...register("alternatePhoneNo")}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Aadhaar Number"
                className="w-full border rounded-3xl px-4 py-2"
                {...register("aadhaarNumber", {
                  required: "Aadhaar Number is required",
                  pattern: {
                    value: /^[0-9]{12}$/,
                    message: "Invalid Aadhaar Number",
                  },
                })}
              />
              {errors.aadhaarNumber && (
                <span className="text-red-500 text-sm">
                  {errors.aadhaarNumber.message}
                </span>
              )}
            </div>
            <div className="relative col-span-1">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                {...register("uploadPhoto", { required: "Photo is required" })}
                onChange={handlePhotoChange}
              />
              <button
                type="button"
                onClick={handleUploadClick}
                className="w-full bg-white border rounded-3xl px-8 py-2 flex items-center justify-between"
              >
                Upload Photo <MdOutlineFileUpload />
              </button>
              {errors.uploadPhoto && (
                <span className="text-red-500 text-sm">{errors.uploadPhoto.message}</span>
              )}
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="mt-2 w-20 h-20 rounded-full object-cover"
                />
              )}
            </div>
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Address 1"
                className="w-full border rounded-3xl px-4 py-2"
                {...register("address1", { required: "Address is required" })}
              />
              {errors.address1 && (
                <span className="text-red-500 text-sm">
                  {errors.address1.message}
                </span>
              )}
            </div>
            <div className="col-span-1">
              <input
                type="text"
                placeholder="Town / Village / City"
                className="w-full border rounded-3xl px-4 py-2"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <span className="text-red-500 text-sm">
                  {errors.city.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <select
                className="w-full border rounded-3xl px-4 py-2"
                {...register("district", { required: "District is required" })}
              >
                <option value="" disabled selected>
                  District
                </option>
                <option value="jhapa">Jhapa</option>
                <option value="morang">Morang</option>
                <option value="kathmandu">Kathmandu</option>
                <option value="biratnagar">Biratnagar</option>
                <option value="other">Other</option>
              </select>
              {errors.district && (
                <span className="text-red-500 text-sm">
                  {errors.district.message}
                </span>
              )}
            </div>
            <div>
              <select
                className="w-full border rounded-3xl px-4 py-2"
                {...register("state", { required: "State is required" })}
              >
                <option value="" disabled selected>
                  State
                </option>
                <option value="koshi">Koshi</option>
                <option value="bagmati">Bagmati</option>
                <option value="other">Other</option>
              </select>
              {errors.state && (
                <span className="text-red-500 text-sm">
                  {errors.state.message}
                </span>
              )}
            </div>
            <div>
              <select
                className="w-full border rounded-3xl px-4 py-2"
                {...register("country", { required: "Country is required" })}
              >
                <option value="" disabled selected>
                  Country
                </option>
                <option value="nepal">Nepal</option>
                <option value="india">India</option>
                <option value="other">Other</option>
              </select>
              {errors.country && (
                <span className="text-red-500 text-sm">
                  {errors.country.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Pin Code"
                className="w-full border rounded-3xl px-4 py-2"
                {...register("pinCode", {
                  required: "Pin Code is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Invalid Pin Code",
                  },
                })}
              />
              {errors.pinCode && (
                <span className="text-red-500 text-sm">
                  {errors.pinCode.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Nationality"
                className="w-full border rounded-3xl px-4 py-2"
                {...register("nationality", {
                  required: "Nationality is required",
                })}
              />
              {errors.nationality && (
                <span className="text-red-500 text-sm">
                  {errors.nationality.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Religion"
                className="w-full border rounded-3xl px-4 py-2"
                {...register("religion", { required: "Religion is required" })}
              />
              {errors.religion && (
                <span className="text-red-500 text-sm">
                  {errors.religion.message}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                {...register("passportPhoto", { required: "Passport Photo is required" })}
                onChange={handlePhotoChange}
              />
              <button
                type="button"
                onClick={handleUploadClick}
                className="w-full bg-white border rounded-3xl px-8 py-2 flex items-center justify-between"
              >
                Passport Photo <MdOutlineFileUpload />
              </button>
              {errors.passportPhoto && (
                <span className="text-red-500 text-sm">{errors.passportPhoto.message}</span>
              )}
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="mt-2 w-20 h-20 rounded-full object-cover"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-purple-500 text-white py-2 rounded-3xl hover:bg-purple-600 transition"
          >
            Submit
          </button>
          <div className="mt-4 text-center">
            <IoIosArrowDropleft size={24} className="cursor-pointer" />
          </div>
        </form>
      </div>    
    </div>
  );
}

export default AdminDetails;
