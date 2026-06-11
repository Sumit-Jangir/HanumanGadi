"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Joi from "joi";
import { useLanguageStore } from "@/lib/stores/languageStore";
import CartItemRow from "@/components/cart-page/CartItemRow";
import OrderSummary from "@/components/cart-page/OrderSummary";
import { useCartStore } from "@/lib/stores/cartStore";
import { createOrderApi } from "@/services/order";
import { toast } from "sonner";

const content = {
  en: {
    bannerAlt: "Shopping Cart - Hanumangadi",
    price: "Price",
    quantity: "Quantity",
    remove: "Remove item",
    emptyTitle: "Your cart is empty",
    emptyDesc: "Explore our sacred Yantras and add something meaningful.",
    shopNow: "Continue Shopping",
    onlinePayment: "Online Payment",
    codPayment: "Cash on Delivery",
    form: {
      title: "Billing Details",
      gotra: "Gotra For Yantra Pooja",
      name: "Name",
      email: "Email Address",
      phone: "Phone Number",
      country: "Country",
      state: "State",
      city: "City",
      zipcode: "Zipcode",
      address: "Address",
      placeOrder: "Save & Place Order",
      placeholders: {
        gotra: "Enter Gotra",
        name: "Enter Your Name",
        email: "Enter Your Email",
        phone: "Enter Phone Number",
        country: "Enter Country",
        state: "Enter State",
        city: "Enter City",
        zipcode: "Enter 6 Digit Zipcode",
        address: "Enter Full Address",
      },
    },
    validation: {
      gotra: "Gotra is required",
      name: "Name is required",
      email: "Valid email is required",
      phone: "Valid 10 digit phone number is required",
      country: "Country is required",
      state: "State is required",
      city: "City is required",
      zipcode: "Zipcode must be 6 digits",
      address: "Address is required",
    },
    summary: {
      title: "Order Summary",
      subtotal: "Estimated Subtotal",
      shipping: "Shipping",
      codCharges: "COD Charges",
      orderTotal: "Order Total",
      codTotal: "COD Advance",
      checkout: "Proceed to Checkout",
      codNote: "Cash on delivery charges apply at checkout.",
    },
    toast: {
      formError: "Please complete all required billing fields.",
      notLoggedIn: "Please login first to place your order.",
      orderFailed: "Something went wrong. Please try again.",
    },
  },
  hi: {
    bannerAlt: "शॉपिंग कार्ट - हनुमानगढ़ी",
    price: "कीमत",
    quantity: "मात्रा",
    remove: "आइटम हटाएं",
    emptyTitle: "आपकी कार्ट खाली है",
    emptyDesc: "हमारे पवित्र यंत्र देखें और अपनी कार्ट में जोड़ें।",
    shopNow: "खरीदारी जारी रखें",
    onlinePayment: "ऑनलाइन भुगतान",
    codPayment: "कैश ऑन डिलीवरी",
    form: {
      title: "बिलिंग विवरण",
      gotra: "यंत्र पूजा के लिए गोत्र",
      name: "नाम",
      email: "ईमेल पता",
      phone: "फोन नंबर",
      country: "देश",
      state: "राज्य",
      city: "शहर",
      zipcode: "पिन कोड",
      address: "पता",
      placeOrder: "सेव करें और ऑर्डर करें",
      placeholders: {
        gotra: "गोत्र दर्ज करें",
        name: "अपना नाम दर्ज करें",
        email: "अपना ईमेल दर्ज करें",
        phone: "फोन नंबर दर्ज करें",
        country: "देश दर्ज करें",
        state: "राज्य दर्ज करें",
        city: "शहर दर्ज करें",
        zipcode: "6 अंकों का पिन कोड दर्ज करें",
        address: "पूरा पता दर्ज करें",
      },
    },
    validation: {
      gotra: "गोत्र आवश्यक है",
      name: "नाम आवश्यक है",
      email: "सही ईमेल आवश्यक है",
      phone: "सही 10 अंकों का फोन नंबर आवश्यक है",
      country: "देश आवश्यक है",
      state: "राज्य आवश्यक है",
      city: "शहर आवश्यक है",
      zipcode: "पिन कोड 6 अंकों का होना चाहिए",
      address: "पता आवश्यक है",
    },
    summary: {
      title: "ऑर्डर सारांश",
      subtotal: "अनुमानित उप-योग",
      shipping: "शिपिंग",
      codCharges: "COD शुल्क",
      orderTotal: "कुल राशि",
      codTotal: "COD अग्रिम",
      checkout: "चेकआउट पर जाएं",
      codNote: "कैश ऑन डिलीवरी शुल्क चेकआउट पर लागू होगा।",
    },
    toast: {
      formError: "कृपया सभी आवश्यक बिलिंग फ़ील्ड भरें।",
      notLoggedIn: "ऑर्डर करने के लिए पहले लॉगिन करें।",
      orderFailed: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
    },
  },
};

const initialBillingValues = {
  gotra: "",
  name: "",
  email: "",
  phone: "",
  country: "",
  state: "",
  city: "",
  zipcode: "",
  address: "",
};

const allBillingFieldsTouched = Object.fromEntries(
  Object.keys(initialBillingValues).map((key) => [key, true])
) as Record<keyof typeof initialBillingValues, boolean>;

export default function CartPage() {
  const language = useLanguageStore((s) => s.language);
  const t = content[language];

  const {
    cartItems,
    fetchCart,
    addToCart,
    removeFromCart,
    totalCod,
    totalOnline,
    isLoading,
  } = useCartStore();

  const [paymentMode, setPaymentMode] = useState<"online" | "cod">("online");

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const billingSchema = useMemo(
    () =>
      Joi.object({
        gotra: Joi.string().trim().required().messages({
          "string.empty": t.validation.gotra,
          "any.required": t.validation.gotra,
        }),
        name: Joi.string().trim().required().messages({
          "string.empty": t.validation.name,
          "any.required": t.validation.name,
        }),
        email: Joi.string()
          .trim()
          .email({ tlds: { allow: false } })
          .required()
          .messages({
            "string.empty": t.validation.email,
            "string.email": t.validation.email,
            "any.required": t.validation.email,
          }),
        phone: Joi.string()
          .trim()
          .pattern(/^[6-9]\d{9}$/)
          .required()
          .messages({
            "string.empty": t.validation.phone,
            "string.pattern.base": t.validation.phone,
            "any.required": t.validation.phone,
          }),
        country: Joi.string().trim().required().messages({
          "string.empty": t.validation.country,
          "any.required": t.validation.country,
        }),
        state: Joi.string().trim().required().messages({
          "string.empty": t.validation.state,
          "any.required": t.validation.state,
        }),
        city: Joi.string().trim().required().messages({
          "string.empty": t.validation.city,
          "any.required": t.validation.city,
        }),
        zipcode: Joi.string()
          .trim()
          .pattern(/^\d{6}$/)
          .required()
          .messages({
            "string.empty": t.validation.zipcode,
            "string.pattern.base": t.validation.zipcode,
            "any.required": t.validation.zipcode,
          }),
        address: Joi.string().trim().required().messages({
          "string.empty": t.validation.address,
          "any.required": t.validation.address,
        }),
      }),
    [t]
  );

  const validateBillingForm = (values: typeof initialBillingValues) => {
    const { error } = billingSchema.validate(values, {
      abortEarly: false,
      allowUnknown: false,
    });

    const errors: Partial<Record<keyof typeof initialBillingValues, string>> = {};

    if (error) {
      error.details.forEach((detail) => {
        const key = detail.path[0] as keyof typeof initialBillingValues;
        errors[key] = detail.message;
      });
    }

    return errors;
  };

  const subtotal = cartItems.reduce((acc, item) => {
    return (
      acc +
      (Number(item.totalPrice) ||
        Number(item.price) * Number(item.quantity || 1) ||
        0)
    );
  }, 0);

  const hasShaadiYagya = cartItems.some(
    (item) => item.name?.toLowerCase() === "shaadi yagya"
  );

  useEffect(() => {
    if (hasShaadiYagya && paymentMode === "cod") {
      setPaymentMode("online");
    }
  }, [hasShaadiYagya, paymentMode]);

  const selectedSummary =
    paymentMode === "cod" && !hasShaadiYagya ? totalCod : totalOnline;

  const shipping = Number(selectedSummary?.shipping || 0);

  const orderTotal =
    Number(selectedSummary?.totalPayAmount || 0) || subtotal + shipping;

  const codCharges =
    paymentMode === "cod" && !hasShaadiYagya
      ? cartItems.reduce((acc, item) => acc + Number(item.codCharges || 0), 0)
      : 0;

  const handleQtyChange = async (slug: string, qty: number) => {
    if (qty < 1) return;
    const item = cartItems.find((i) => i.slug === slug);
    if (!item) return;
    await addToCart(item.slug, String(qty));
  };

  const handleRemove = async (slug: string) => {
    const item = cartItems.find((i) => i.slug === slug);
    if (!item) return;
    await removeFromCart(item.slug, String(item.quantity || 1));
  };

  const handlePlaceOrder = async (values: typeof initialBillingValues) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token")?.replace(/"/g, "") : "";
      if (!token) {
        toast.error(t.toast.notLoggedIn);
        return;
      }
      const payload = {
        gotra: values.gotra,
        name: values.name,
        phone_number: values.phone,
        email: values.email,
        city: values.city,
        country: values.country,
        state: values.state,
        pincode: values.zipcode,
        address: values.address,
        payment_mode: paymentMode === "cod" ? "1" : "2",
        cod_advance: paymentMode === "cod" ? String(codCharges) : "0",
        yagya: "",
      };
      const res = await createOrderApi(payload);
      if (res?.status && res?.paymentUrl) {
        window.location.href = res.paymentUrl;
      } else {
        toast.error(res?.msg || t.toast.orderFailed);
      }
    } catch (err: any) {
      toast.error(err?.message || t.toast.orderFailed);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white/60 px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-brand-brown focus:ring-2 focus:ring-brand-brown/10";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";
  const errorClass = "mt-1 text-xs font-medium text-red-500";

  const FieldLabel = ({ children }: { children: ReactNode }) => (
    <label className={labelClass}>
      {children}
      <span className="text-red-500"> *</span>
    </label>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="theme-page max-w-[1900px] mx-auto overflow-x-hidden "
    >
      <section className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="m-3 md:m-0"
        >
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-full h-auto rounded-2xl md:rounded-none overflow-hidden shadow-lg md:shadow-none"
          >
            <Image
              src="/banners/AstrologerAboutYantra.png"
              alt={t.bannerAlt}
              width={1920}
              height={600}
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-10 md:py-16 px-4 max-w-7xl mx-auto">
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="theme-card relative p-12 text-center"
          >
            <div className="absolute -inset-2 rounded-3xl bg-brand-cream blur-2xl opacity-60 -z-10" />

            <p className="text-2xl font-bold text-gray-800">{t.emptyTitle}</p>
            <p className="mt-2 text-gray-500">{t.emptyDesc}</p>

            <Link
              href="/shop"
              className="btn-gradient-slide mt-8 inline-flex items-center justify-center px-8 py-3"
            >
              {t.shopNow}
            </Link>
          </motion.div>
        ) : (
          <Formik
            initialValues={initialBillingValues}
            validate={validateBillingForm}
            onSubmit={handlePlaceOrder}
          >
            {({ isSubmitting, validateForm, setTouched, submitForm }) => (
              <Form>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10"
                >
                  <div className="flex-1 min-w-0">
                    <div className="relative">
                      <motion.div
                        className="pointer-events-none absolute -inset-2 rounded-3xl bg-brand-cream blur-2xl opacity-50 -z-10"
                        animate={{ opacity: [0.35, 0.55, 0.35] }}
                        transition={{
                          repeat: Infinity,
                          duration: 5,
                          ease: "easeInOut",
                        }}
                      />

                      <div className="space-y-5">
                        <AnimatePresence mode="popLayout">
                          {cartItems.map((item) => (
                            <CartItemRow
                              key={item.slug}
                              item={item}
                              labels={{
                                price: t.price,
                                quantity: t.quantity,
                                remove: t.remove,
                              }}
                              onQtyChange={handleQtyChange}
                              onRemove={handleRemove}
                            />
                          ))}
                        </AnimatePresence>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="mt-6 rounded-2xl border border-brand-brown/20 bg-white p-4 shadow-sm md:p-6"
                      >
                        <h2 className="text-2xl font-bold text-brand-brown">
                          {t.form.title}
                        </h2>
                        <div className="mt-2 h-1 w-16 rounded-full bg-brand-brown" />

                        <div className="mt-5 space-y-3">
                          <div>
                            <FieldLabel>{t.form.gotra}</FieldLabel>
                            <Field
                              name="gotra"
                              className={inputClass}
                              placeholder={t.form.placeholders.gotra}
                            />
                            <ErrorMessage
                              name="gotra"
                              component="p"
                              className={errorClass}
                            />
                          </div>

                          <div>
                            <FieldLabel>{t.form.name}</FieldLabel>
                            <Field
                              name="name"
                              className={inputClass}
                              placeholder={t.form.placeholders.name}
                            />
                            <ErrorMessage
                              name="name"
                              component="p"
                              className={errorClass}
                            />
                          </div>

                          <div>
                            <FieldLabel>{t.form.email}</FieldLabel>
                            <Field
                              name="email"
                              type="email"
                              className={inputClass}
                              placeholder={t.form.placeholders.email}
                            />
                            <ErrorMessage
                              name="email"
                              component="p"
                              className={errorClass}
                            />
                          </div>

                          <div>
                            <FieldLabel>{t.form.phone}</FieldLabel>
                            <Field
                              name="phone"
                              className={inputClass}
                              placeholder={t.form.placeholders.phone}
                              maxLength={10}
                            />
                            <ErrorMessage
                              name="phone"
                              component="p"
                              className={errorClass}
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                              <FieldLabel>{t.form.country}</FieldLabel>
                              <Field
                                name="country"
                                className={inputClass}
                                placeholder={t.form.placeholders.country}
                              />
                              <ErrorMessage
                                name="country"
                                component="p"
                                className={errorClass}
                              />
                            </div>

                            <div>
                              <FieldLabel>{t.form.state}</FieldLabel>
                              <Field
                                name="state"
                                className={inputClass}
                                placeholder={t.form.placeholders.state}
                              />
                              <ErrorMessage
                                name="state"
                                component="p"
                                className={errorClass}
                              />
                            </div>

                            <div>
                              <FieldLabel>{t.form.city}</FieldLabel>
                              <Field
                                name="city"
                                className={inputClass}
                                placeholder={t.form.placeholders.city}
                              />
                              <ErrorMessage
                                name="city"
                                component="p"
                                className={errorClass}
                              />
                            </div>

                            <div>
                              <FieldLabel>{t.form.zipcode}</FieldLabel>
                              <Field
                                name="zipcode"
                                className={inputClass}
                                placeholder={t.form.placeholders.zipcode}
                                maxLength={6}
                              />
                              <ErrorMessage
                                name="zipcode"
                                component="p"
                                className={errorClass}
                              />
                            </div>
                          </div>

                          <div>
                            <FieldLabel>{t.form.address}</FieldLabel>
                            <Field
                              as="textarea"
                              name="address"
                              rows={4}
                              className={inputClass}
                              placeholder={t.form.placeholders.address}
                            />
                            <ErrorMessage
                              name="address"
                              component="p"
                              className={errorClass}
                            />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    className="w-full lg:sticky lg:top-24 lg:w-[380px] flex-shrink-0"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="flex gap-4 mb-6">
                      <button
                        type="button"
                        className={`flex-1 py-3 rounded-xl font-semibold border transition-colors ${
                          paymentMode === "online"
                            ? "bg-brand-brown text-white border-brand-brown"
                            : "bg-white text-brand-brown border-brand-brown/40"
                        }`}
                        onClick={() => setPaymentMode("online")}
                      >
                        {t.onlinePayment}
                      </button>

                      <button
                        type="button"
                        className={`flex-1 py-3 rounded-xl font-semibold border transition-colors ${
                          paymentMode === "cod" && !hasShaadiYagya
                            ? "bg-brand-brown text-white border-brand-brown"
                            : "bg-white text-brand-brown border-brand-brown/40"
                        } ${
                          hasShaadiYagya ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={() => {
                          if (!hasShaadiYagya) setPaymentMode("cod");
                        }}
                        disabled={hasShaadiYagya}
                      >
                        {t.codPayment}
                      </button>
                    </div>

                    <OrderSummary
                      subtotal={subtotal}
                      shipping={shipping}
                      orderTotal={orderTotal}
                      labels={t.summary}
                      onCheckout={() => {}}
                      codCharges={codCharges}
                      paymentMode={paymentMode}
                    />

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={async () => {
                        const errors = await validateForm();
                        if (Object.keys(errors).length > 0) {
                          setTouched(allBillingFieldsTouched);
                          toast.error(t.toast.formError);
                          return;
                        }
                        submitForm();
                      }}
                      className="mt-5 w-full rounded-2xl bg-brand-brown px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {t.form.placeOrder}
                    </button>
                  </motion.div>
                </motion.div>
              </Form>
            )}
          </Formik>
        )}
      </section>
    </motion.div>
  );
}