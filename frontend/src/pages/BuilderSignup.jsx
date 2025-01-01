import { useForm } from "react-hook-form";
import { Card, Button, TextInput, Label } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function BuilderSignup() { 
  const { register, handleSubmit, formState: { errors  } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    setLoading(true); 
    setErrorMessage("");
    setSuccessMessage(""); 
  
    try {
      const response = await fetch("https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/signup-Builder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.text();
      if (!response.ok) {
        if (response.status === 400) {
          if (result.includes("Email already exists")) {
            setErrorMessage("Email already exists. Please try logging in.");
          } else {
            setErrorMessage("Invalid input. Please check your form.");
          }
        } else if (response.status === 500) {
          setErrorMessage("Server error. Please try again later.");
        } else {
          setErrorMessage(`Error: ${response.statusText}`);
        }
        setLoading(false);
        return; 
      }
      setSuccessMessage("Profile created successfully!");
      navigate("/sign-in-builder");
  
    } catch (error) {
      console.error("Error Creating Builder:", error.message);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 pt-[10vh] pb-[5vh] overflow-y-hidden">
      <div id="login" className="bg-gradient-to-bl from-blue-500 to-purple-800 h-[10vh] fixed top-0 left-0 right-0">
        <h3 className="text-white text-4xl p-5 font-bold">Build Hub</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto py-10">
        <div className="first order-2 md:order-1">
          <Card className="w-full shadow-xl">
            <h2 className="text-3xl font-bold text-[#1B293B] mb-6">Builder Sign Up</h2>

            {/* Show error message if exists */}
            {errorMessage && (
              <div className="text-red-500 text-sm  mb-4">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
              {/* First Name and Last Name */}
              <div className="flex w-full space-x-4">
                <div className="w-1/2">
                  <Label htmlFor="firstName" value="First Name" />
                  <TextInput
                    id="firstName"
                    {...register("firstName", { required: true })}
                    placeholder="First Name"
                  />
                  {errors.firstName && <span className="text-red-500">First Name is required</span>}
                </div>
                <div className="w-1/2">
                  <Label htmlFor="lastName" value="Last Name" />
                  <TextInput
                    id="lastName"
                    {...register("lastName", { required: true })}
                    placeholder="Last Name"
                  />
                  {errors.lastName && <span className="text-red-500">Last Name is required</span>}
                </div>
              </div>

              {/* Email and Password */}
              <div className="flex w-full space-x-4">
                <div className="w-1/2">
                  <Label htmlFor="email" value="Email" />
                  <TextInput
                    id="email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    type="email"
                    placeholder="Email"
                  />
                  {errors.email && <span className="text-red-500">Valid email is required</span>}
                </div>
                <div className="w-1/2 relative">
                  <Label htmlFor="password" value="Password" />
                  <TextInput
                    id="password"
                    {...register("password", { required: true })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                  </button>
                  {errors.password && <span className="text-red-500">Password is required</span>}
                </div>
              </div>

              {/* Business Name and CNIC */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Label htmlFor="businessName" value="Business Name" />
                  <TextInput
                    id="businessName"
                    {...register("businessname", { required: true })}
                    placeholder="Business Name"
                  />
                  {errors.businessname && <span className="text-red-500">Business name is required</span>}
                </div>
                <div className="w-1/2">
                  <Label htmlFor="cnic" value="CNIC" />
                  <TextInput
                    id="cnic"
                    type="text"
                    placeholder="XXXXX-XXXXXXX-X"
                    {...register("cnic", {
                      required: true,
                      pattern: /^[0-9]{5}-[0-9]{7}-[0-9]$/,
                      onChange: (e) => {
                        let value = e.target.value.replace(/[^0-9]/g, "");
                        if (value.length > 13) value = value.slice(0, 13);
                        if (value.length > 12)
                          value = value.slice(0, 12) + "-" + value.slice(12);
                        if (value.length > 5)
                          value = value.slice(0, 5) + "-" + value.slice(5);
                        e.target.value = value;
                      },
                    })}
                  />
                  {errors.cnic && (
                    <span className="text-red-500">
                      Please enter a valid 13-digit CNIC
                    </span>
                  )}
                </div>
              </div>
              {/* Phone Number and city */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Label htmlFor="phoneNumber" value="Phone Number" />
                  <TextInput
                    id="phoneNumber"
                    {...register("phoneno", { required: true })}
                    type="tel"
                    placeholder="Phone Number"
                  />
                  {errors.phoneno && <span className="text-red-500">Phone number is required</span>}
                </div>
                <div className="w-1/2">
                  <Label htmlFor="city" value="city" />
                  <TextInput
                    id="city"
                    {...register("city", { required: true })}
                    type="text"
                    placeholder="City"
                  />
                  {errors.city && <span className="text-red-500">city is required</span>}
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create Profile
                </Button>
              </div>
            </form>
          </Card>
        </div>
        <div className="second order-1 md:order-2">
          <img
            src="assets/images/signin.jpg"
            alt=""
            className="rounded-lg shadow-xl w-[95%] h-auto object-cover"
          />
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-500 to-purple-800 fixed bottom-0 left-0 right-0 h-[5vh]"></div>
    </div>
  );

}

export default BuilderSignup;
