import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [initialEmail, setInitialEmail] = useState("");

  // Fetch saved email from localStorage on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setInitialEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = (values: { email: string; password: string }) => {
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", values.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    console.log("Login Details:", values);
    // Handle login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Login to Your Account
        </h2>
        <Formik
          initialValues={{ email: initialEmail, password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {
             <Form className="space-y-4">
             <div>
               <label className="block text-gray-700 font-medium mb-1">Email</label>
               <Field
                 type="email"
                 name="email"
                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               />
               <ErrorMessage
                 name="email"
                 component="div"
                 className="text-red-500 text-sm mt-1"
               />
             </div>
             <div>
               <label className="block text-gray-700 font-medium mb-1">Password</label>
               <Field
                 type="password"
                 name="password"
                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               />
               <ErrorMessage
                 name="password"
                 component="div"
                 className="text-red-500 text-sm mt-1"
               />
             </div>
             <div className="flex items-center">
               <input
                 type="checkbox"
                 id="rememberMe"
                 checked={rememberMe}
                 onChange={() => setRememberMe(!rememberMe)}
                 className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
               />
               <label htmlFor="rememberMe" className="ml-2 text-gray-700 text-sm">
                 Remember Me
               </label>
             </div>
             <button
               type="submit"
               className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition"
             >
               Login
             </button>
           </Form>
          }
        </Formik>
      </div>
    </div>
  );
};

export default Login;
