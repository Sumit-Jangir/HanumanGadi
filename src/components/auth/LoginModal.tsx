"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { loginSchema } from "@/lib/validation";
import useAuthStore from "@/lib/stores/authStore";

const LoginModal = () => {
  const { isLoginOpen, closeLogin, setToken } = useAuthStore();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      mobile: "",
    },
    validate: (values) => {
      const { error } = loginSchema.validate(values);
      if (error) {
        return { mobile: error.message };
      }
    },
    onSubmit: async (values, { setSubmitting }) => {
      setErrorMsg("");
      setSuccessMsg("");
      try {
        const formData = new FormData();
        formData.append("mobile", values.mobile);

        const response = await axios.post(
          "https://hanumangadi.com/hanumangadi/api1/loginAuthH",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data?.status) {
          setSuccessMsg(response.data.msg || "Logged in successfully!");
          setToken(response.data.data);

          setTimeout(() => {
            closeLogin();
            setSuccessMsg("");
            formik.resetForm();
          }, 1500);
        } else {
          setErrorMsg(response.data?.msg || "Login failed. Please try again.");
        }
      } catch (err: any) {
        setErrorMsg(err?.response?.data?.msg || "An error occurred. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Don't render the wrapper at all if not open, AnimatePresence handles the exit animation
  return (
    <AnimatePresence>
      {isLoginOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Blurred overlay background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLogin}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative z-10 mx-4 flex w-full max-w-[900px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={closeLogin}
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-gray-600 transition-colors hover:bg-black/20 hover:text-black md:right-4 md:top-4 md:bg-white/10 md:text-white md:hover:bg-white/20 md:hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Left Form Section */}
            <div className="flex w-full flex-col justify-center bg-[#f8e8dd] p-6 md:p-20 md:w-[60%] relative z-10">
              <div className="flex flex-col items-center justify-center mb-8 md:text-left">
                <div className="mb-6 flex justify-center md:justify-start">
                  <Image
                    src="/logo/logo.svg"
                    alt="Login Banner"
                    width={100}
                    height={100}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Login with your mobile number
                </p>
              </div>

              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                <div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium">
                      +91
                    </span>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      placeholder="Enter mobile number"
                      className={`w-full rounded-xl border bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 outline-none transition-all focus:bg-white focus:ring-2 ${formik.touched.mobile && formik.errors.mobile
                          ? "border-red-500 focus:ring-red-200"
                          : "border-[#61341c] focus:border-[#ed940b] focus:ring-[#ed940b]/20"
                        }`}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); // remove non-numbers
                        formik.setFieldValue("mobile", value);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobile}
                      maxLength={10}
                      inputMode="numeric"
                    />
                  </div>
                  {formik.touched.mobile && formik.errors.mobile && (
                    <p className="mt-1.5 text-sm font-medium text-red-500">
                      {formik.errors.mobile}
                    </p>
                  )}
                </div>

                {errorMsg && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
                    {errorMsg}
                  </div>
                )}

                {successMsg && (
                  <div className="rounded-lg bg-green-50 p-3 text-sm font-medium text-green-600">
                    {successMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#61341c] py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-[#4a2614] hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
                >
                  {formik.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>

            {/* Right Image Section */}
            <div className="relative hidden w-full md:block md:w-[40%]">
              <Image
                src="/banners/AstrologerLoginPage.png"
                alt="Login Banner"
                fill
                className="object-cover"
                priority
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-[#61341c] via-[#61341c]/40 to-transparent" /> */}

              {/* Decorative Circles matching the UI */}
              {/* <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5 blur-xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-white/5 blur-xl"></div> */}

              {/* <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                 <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                 </div>
                 <h2 className="mb-3 text-3xl font-bold tracking-tight">New Here?</h2>
                 <p className="text-sm opacity-90 leading-relaxed max-w-[250px]">
                  Join us today and explore premium spiritual offerings tailored for you.
                 </p>
                 <button 
                  onClick={() => {
                    closeLogin();
                    // Optional: open signup modal or redirect to signup
                  }}
                  className="mt-8 rounded-full border-2 border-white/60 bg-transparent px-8 py-2.5 text-sm font-bold tracking-wider text-white transition-all hover:bg-white hover:text-[#61341c]"
                 >
                   SIGN UP
                 </button>
              </div> */}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
