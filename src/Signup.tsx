import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Custom Password Strength Calculation
const calculatePasswordStrength = (password: string): number => {
  let strength = 0;

  // Length check
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;

  // Complexity checks
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  return Math.min(strength, 4);
};

// Password Strength Indicator Component
const PasswordStrengthIndicator: React.FC<{ password: string }> = ({ password }) => {
  const strength = calculatePasswordStrength(password);
  const strengthLabels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
  const strengthColors = ["red", "orange", "yellow", "green", "darkgreen"];

  return (
    <div className="mt-2" aria-live="polite">
      <div
        className={`h-2 rounded transition-all`}
        style={{
          width: `${(strength + 1) * 20}%`,
          backgroundColor: strengthColors[strength],
        }}
      />
      <p className="text-sm mt-1 text-gray-600">
        Strength: <span className="font-semibold">{strengthLabels[strength]}</span>
      </p>
    </div>
  );
};

// Signup Component
interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [password, setPassword] = useState("");

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  // Form submission handler
  const handleSubmit = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log(values);
    resetForm();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Create Your Account
        </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange }) => (
            <Form noValidate className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                    handleChange(e);
                  }}
                />
                <PasswordStrengthIndicator password={password} />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition"
              >
                Signup
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
