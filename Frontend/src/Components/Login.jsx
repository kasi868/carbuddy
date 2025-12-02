import React from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useLoginMutation } from '../services/apiService';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 sm:px-6">
      <div className="w-full max-w-md sm:max-w-sm border border-yellow-500 shadow-[0_0_10px_#facc15] rounded-lg p-6 sm:p-8 bg-[#1a1a1a]">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-yellow-500 mb-6">Login</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.email) errors.email = 'Required';
            if (!values.password) errors.password = 'Required';
            return errors;
          }}
          onSubmit={async (values) => {
            console.log(values)
            try {


           const res = await loginUser(values).unwrap();
    console.log("🚀 Login response:", res);

    // ✅ Directly pull from res
    const token = res.token;
    const userId = res.userId;  // should now be string
    const email = res.email;
    const role = res.role;

    if (!token) {
      alert("No token returned from server!");
      return;
    }

    // ✅ Save to localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);

    window.dispatchEvent(new Event("storage"));

    // ✅ Redirect
    if (role === "admin") {
      navigate("/dashboard/admindashboard",{replace:true});
    } else if (role === "employee") {
      navigate("/dashboard/empdashboard",{replace:true});
    } else {
      navigate("/profilepage",{replace:true});
      window.location.reload();
    }
  
 

            } catch (err) {
              console.error("Login error:", err);
              alert("Login failed");
            }
          }}
        >
          {() => (
            <Form className="space-y-5 sm:space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-white font-semibold text-sm mb-1">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="w-full bg-[#111] text-white border border-gray-600 rounded px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-white font-semibold text-sm mb-1">Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Your password"
                  className="w-full bg-[#111] text-white border border-gray-600 rounded px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-500 text-black font-semibold py-2 sm:py-3 rounded hover:bg-yellow-400 transition"
              >
                Login
              </button>

              {/* Signup Link */}
              <p className="text-xs sm:text-sm text-center text-white mt-4">
                Don't have an account?{' '}
                <Link to="/register" className="text-yellow-400 hover:underline">
                  Sign up
                </Link>
              </p>
               {/* <p className='text-center'>
              <Link to="/ForgotPasswordModal" className="align-center text-yellow-400 hover:underline">
                  forgot password?
                </Link> </p> */}
              <p className='text-center'>
              <Link to="/Forgot" className="align-center text-yellow-400 hover:underline">
                  forgot password?
                </Link> </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
