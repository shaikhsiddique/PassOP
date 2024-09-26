import React, { useState } from "react";
import { toast } from "react-toastify";
import { usePasswordContext } from '../context/PasswordContext';

const Passwords = () => {
  const { passwordArray, editPassword } = usePasswordContext();

  const [visibilityStates, setVisibilityStates] = useState(
    passwordArray.map(() => false)
  );

  // Function to toggle password visibility
  const showPassword = (index) => {
      setVisibilityStates((prevState) => {
      // Copy the previous state array
      const newVisibilityStates = [...prevState];
      // Toggle the visibility at the given index
      newVisibilityStates[index] = !newVisibilityStates[index];
      return newVisibilityStates;
    });
  };

  const deletePassword = (id) => {
    const updatedArray = passwordArray.filter(item => item.id !== id);
    console.log("items deleted", updatedArray);
    localStorage.setItem('passwords', JSON.stringify(updatedArray));
    window.location.reload();
  }

  const handleEditPassword = (password) => {
    editPassword(password);
  }

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        console.log("Text copied to clipboard (fallback)");
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }

      document.body.removeChild(textArea);
    }
  };

  const notify = (message) => {
    console.log(message);
    toast.success(message, {
      position: "top-center",
    });
  };

  return (
    <div className="passwords w-full h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        {passwordArray.map((password, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 p-6 rounded-lg shadow-md relative"
          >
            {/* Edit and Delete buttons */}
            <div className="absolute top-4 right-4 flex space-x-3">
              <span onClick={() => handleEditPassword(password)} className="text-yellow-500 cursor-pointer hover:text-yellow-700">
                <lord-icon
                  src="https://cdn.lordicon.com/wuvorxbv.json"
                  trigger="hover"
                  size="24px"
                ></lord-icon>
              </span>
              <span onClick={() => {deletePassword(password.id); notify("Password deleted successfully")}} className="text-red-600 cursor-pointer hover:text-red-800">
                <lord-icon
                  src="https://cdn.lordicon.com/drxwpfop.json"
                  trigger="hover"
                  state="morph-trash-in"
                  size="24px"
                ></lord-icon>
              </span>
            </div>

            {/* Password details */}
            <div className="space-y-4 mt-10">
              {/* URL Row */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="w-full sm:w-1/4 font-semibold text-gray-700 mb-1 sm:mb-0">URL:</span>
                <div className="w-full sm:w-3/4 flex items-center">
                  <span className="flex-1 break-all mr-2">{password.website}</span>
                  <span
                    onClick={() => {
                      copyToClipboard(password.website);
                      notify("URL Copied successfully");
                    }}
                    className="text-blue-600 cursor-pointer hover:text-blue-800 flex-shrink-0"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/wzwygmng.json"
                      trigger="hover"
                      size="24px"
                    ></lord-icon>
                  </span>
                </div>
              </div>

              {/* Username Row */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="w-full sm:w-1/4 font-semibold text-gray-700 mb-1 sm:mb-0">Username:</span>
                <div className="w-full sm:w-3/4 flex items-center">
                  <span className="flex-1 break-all mr-2">{password.username}</span>
                  <span
                    onClick={() => {
                      copyToClipboard(password.username);
                      notify("Username Copied successfully");
                    }}
                    className="text-blue-600 cursor-pointer hover:text-blue-800 flex-shrink-0"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/wzwygmng.json"
                      trigger="hover"
                      size="24px"
                    ></lord-icon>
                  </span>
                </div>
              </div>

              {/* Password Row */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="w-full sm:w-1/4 font-semibold text-gray-700 mb-1 sm:mb-0">Password:</span>
                <div className="w-full sm:w-3/4 flex items-center">
                  <span className="flex-1 break-all mr-2">
                    {visibilityStates[index] ? password.password : "••••••••"}
                  </span>
                  <span
                    onClick={() => showPassword(index)}
                    className="text-gray-600 cursor-pointer hover:text-gray-800 mr-2 flex-shrink-0"
                  >
                    {!visibilityStates[index] ? (
                      <i
                        className="fa-solid fa-eye"
                        style={{ fontSize: "20px" }}
                      ></i>
                    ) : (
                      <i
                        className="fa-solid fa-eye-slash"
                        style={{ fontSize: "20px" }}
                      ></i>
                    )}
                  </span>
                  <span
                    onClick={() => {
                      copyToClipboard(password.password);
                      notify("Password Copied successfully");
                    }}
                    className="text-blue-600 cursor-pointer hover:text-blue-800 flex-shrink-0"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/wzwygmng.json"
                      trigger="hover"
                      size="24px"
                    ></lord-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Passwords;
