import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useRequestPasswordResetMutation } from "../services/forgotApi";

function Forgot() {
  const navigate = useNavigate();
  const [requestPasswordReset] = useRequestPasswordResetMutation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md border border-yellow-500 shadow-[0_0_10px_#facc15] rounded-lg p-6 bg-[#1a1a1a]">
        <h2 className="text-center text-2xl font-bold text-yellow-500 mb-6">
          Reset Password
        </h2>

        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) errors.password = "Password is required";
            if (!values.confirmPassword) errors.confirmPassword = "Confirm Password is required";
            else if (values.password !== values.confirmPassword)
              errors.confirmPassword = "Passwords do not match";
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const payload = {
                email: values.email,
                password: values.password,
              };

              const res = await requestPasswordReset(payload).unwrap();
              alert(res?.message || "Password reset successfully.");
              resetForm();
              navigate("/login");
            } catch (err) {
              console.error("Forgot password error:", err);
              alert(
                err?.data?.message || "Failed to reset password. Try again."
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-white font-bold text-sm mb-1">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full bg-black text-white border border-white-600 rounded px-3 py-2 focus:outline-none focus:border-white"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-white font-bold text-sm mb-1">
                  New Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full bg-black text-white border border-white-600 rounded px-3 py-2 focus:outline-none focus:border-white"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-white font-bold text-sm mb-1">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full bg-black text-white border border-white-600 rounded px-3 py-2 focus:outline-none focus:border-white"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-black font-semibold py-2 rounded hover:bg-yellow-400 transition"
              >
                {isSubmitting ? "Processing..." : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-center text-white mt-4">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-yellow-400 hover:underline"
          >
            Go back to Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Forgot;
