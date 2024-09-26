import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Passwords from "./Passwords";
import { v4 as uuidv4 } from "uuid";
import { usePasswordContext } from "../context/PasswordContext";

function Manager() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { addPassword, updatePassword, editingPassword } = usePasswordContext();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editingPassword) {
      setValue("website", editingPassword.website);
      setValue("username", editingPassword.username);
      setValue("password", editingPassword.password);
    }
  }, [editingPassword, setValue]);

  const showPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const onSubmit = (data) => {
    if (editingPassword) {
      const updatedPassword = {
        ...editingPassword,
        website: data.website,
        username: data.username,
        password: data.password,
      };
      updatePassword(updatedPassword);
      notify("Password Updated");
    } else {
      const newPassword = {
        website: data.website,
        username: data.username,
        password: data.password,
        id: uuidv4(),
      };
      addPassword(newPassword);
      notify("Your Password Saved");
    }
    reset();
  };

  const notify = (message) => {
    toast.success(message, {
      position: "top-right",
    });
  };

  return (
    <div className="absolute top-50 left-0 z-[-2] h-screen w-screen bg-gradient-to-b from-green-50 to-white overflow-x-hidden">
      <div className="container mx-auto max-w-lg mt-20 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide flex items-center justify-center space-x-2">
          <span className="text-green-700">&lt;</span>
          <span className="text-gray-900">Pass</span>
          <span className="text-green-700">OP &gt;</span>
        </h1>

        <h3 className="text-center py-2">Your own password manager</h3>
        <div className="text-white flex flex-col space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Website URL input */}
            <div className="w-full py-4">
              <input
                type="text"
                className="w-full p-4 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter website URL"
                {...register("website", {
                  required: "Website URL is required",
                  minLength: {
                    value: 5,
                    message: "Website URL must be at least 5 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Website URL cannot exceed 100 characters",
                  },
                  pattern: {
                    value:/^(https?:\/\/)?(([\w\d-]+\.)+[\w\d]{2,}|localhost)(:\d+)?(\/.*)?$/i,
                    message: "Please enter a valid URL",
                  },
                })}
              />
              {errors.website && (
                <p className="text-red-500 text-center text-sm mt-1">
                  {errors.website.message}
                </p>
              )}
            </div>

            {/* Username and Password Inputs */}
            <div className="flex space-x-4 pb-4">
              {/* Username Input */}
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="w-full p-4 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 2,
                      message: "Username must be at least 2 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Username cannot exceed 20 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z0-9_@ ]+$/i,
                      message:
                        "Username can only contain letters, numbers, spaces, underscores, and @",
                    },
                  })}
                />
                {errors.username && (
                  <p className="text-red-500 text-center text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative w-full">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full p-4 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <span
                  onClick={showPassword}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white cursor-pointer"
                >
                  {/* Use Font Awesome Eye icons */}
                  <i
                    className={`fas  ${
                      passwordVisibility ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
                {errors.password && (
                  <p className="text-red-500 text-center text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-400 w-full py-3 border rounded-full text-black flex items-center justify-center space-x-2"
            >
              <lord-icon
                src="https://cdn.lordicon.com/zrkkrrpl.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#121331,secondary:#ffffff"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
              <span className="font-bold text-lg">
                {editingPassword ? "Update Password" : "Add Password"}
              </span>
            </button>
          </form>
        </div>
      </div>
      <Passwords />
    </div>
  );
}

export default Manager;
