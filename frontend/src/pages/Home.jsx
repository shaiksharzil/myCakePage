import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { debounce } from "lodash";
import axios from "axios";
import { Helmet } from "react-helmet";

const Home = () => {
  const [urlAvailable, setUrlAvailable] = useState(null);
  const [urlError, setUrlError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const Url = import.meta.env.VITE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const button = e.target.querySelector(".custom-send-button");
    button.classList.add("active");
    setIsSending(true);

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      mobile: form.mobile.value,
      message: form.message.value,
    };

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(data.mobile)) {
      toast.error("Enter a valid 10-digit mobile number");
      button.classList.remove("active");
      setIsSending(false);
      return;
    }

    const sendEmail = async () => {
      const res = await fetch(`${Url}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");
      return res;
    };

    toast
      .promise(sendEmail(), {
        loading: "Sending your message...",
        success: () => {
          form.reset();
          return <b>Message sent successfully!</b>;
        },
        error: <b>Failed to send message. Try again.</b>,
      })
      .finally(() => {
        button.classList.remove("active");
        setIsSending(false);
      });
  };

  const checkUrlAvailability = debounce(async (value) => {
    if (!value) return;
    try {
      const res = await axios.get(
        `${Url}/api/auth/check-custom-url?customUrl=${value}`
      );
      setUrlAvailable(!res.data.exists);
    } catch (error) {
      setUrlAvailable(null);
    }
  }, 500);

  const validateCustomUrl = (value) => {
    if (!/^[a-z0-9-]+$/.test(value)) {
      return "Only lowercase letters, numbers, and hyphens allowed";
    }
    if (value.length < 3) {
      return "Must be at least 3 characters long";
    }
    return "";
  };

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      <Helmet>
        <title>MyCakePage</title>
        <meta
          name="description"
          content="A smart platform for bakers to showcase cakes, set prices, and receive WhatsApp orders via personalized CakePages."
        />
        <meta
          name="keywords"
          content="cakepage, mycakepage, cake website, bakery online, cakes, order cakes online, showcase cakes, cake flavors"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mycakepage.vercel.app/" />
        <script type="application/ld+json">
          {`
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MyCakePage",
    "url": "https://mycakepage.vercel.app",
    "description": "A digital cake gallery for bakers to display and sell cakes online via a unique CakePage."
  }
  `}
        </script>
      </Helmet>
      {/* Hero Section */}
      <Toaster />
      <section className="relative min-h-screen flex items-center justify-center px-6 max-md:px-2">
        <motion.div
          className="text-center max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl text-white/90 font-bold mb-4 ">
            Welcome to{" "}
            <span
              style={{ fontFamily: "Alagen" }}
              className="text-white shimmer-text"
            >
              MyCakePage
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-8">
            A smart and stunning digital cake gallery for bakers to beautifully
            showcase their creations, flavors, and prices—all in one
            personalized page. Customers can explore, sort by minimum order
            quantity, and order cakes directly via WhatsApp.
          </p>
          <div className="">
            <div className="flex items-center justify-center">
              <input
                type="text"
                placeholder="mycakepage/"
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  const error = validateCustomUrl(value);
                  setUrlError(error);
                  if (!error) checkUrlAvailability(value);
                }}
                className="bg-white/10 text-white/70 px-3 py-2 rounded outline-none border border-white/10"
              />
              <Link
                to="/signup"
                className="fancy-button border border-white px-2 break-inside-avoid py-2 ml-1 rounded-md"
              >
                <span className="font-semibold">Get CakePage</span>
              </Link>
            </div>
            {urlError && <p className="text-sm  text-red-400">{urlError}</p>}
            {!urlError && urlAvailable === false && (
              <p className="text-sm text-red-400">URL already taken</p>
            )}
            {!urlError && urlAvailable === true && (
              <p className="text-sm text-emerald-400">URL is available!</p>
            )}
          </div>
          <Tilt
            tiltMaxAngleX={-5}
            tiltMaxAngleY={-5}
            glareEnable={true}
            glareMaxOpacity={0.1}
            transitionSpeed={1000}
            className="mt-5 w-full shimmer max-w-sm mx-auto rounded-2xl bg-white/10 backdrop-blur-xl p-6 shadow-2xl border border-white/20"
          >
            <h3 className="text-2xl font-bold  mb-2 text-center">
              Start Your Cake Journey
            </h3>
            <p className="text-sm text-white/70 mb-4 text-center">
              Create your very own CakePage URL for customers to explore your
              cake designs, pricing, and bakery details.
            </p>
            <div className="flex justify-center">
              <Link
                to="/signup"
                className="custom-io-button w-50 font-semibold text-md"
              >
                Get started
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </Link>
            </div>
          </Tilt>
        </motion.div>
      </section>
      <section className="px-6 pt-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Why Choose <span style={{ fontFamily: "Alagen" }}>MyCakePage?</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10 max-sm:gap-5">
            <div className="p-6 hover:bg-white/20 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20">
              <h3 className="text-xl font-semibold mb-2">For Bakers</h3>
              <ul className="list-disc list-inside max-sm:text-xs  text-white/70 space-y-1">
                <li>Showcase categorized cake designs with images</li>
                <li>Set dynamic pricing per kg and per flavor</li>
                <li>Attach available flavors to each cake</li>
                <li>Set minimum order quantity (e.g. 0.5kg or 1kg)</li>
                <li>Share your unique CakePage URL with clients</li>
                <li>Receive direct WhatsApp orders</li>
                <li>Use QR codes to promote your CakePage</li>
              </ul>
            </div>

            <div className="p-6 hover:bg-white/20 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20">
              <h3 className="text-xl font-semibold mb-2">For Customers</h3>
              <ul className="list-disc list-inside max-sm:text-xs text-white/70 space-y-1">
                <li>Browse beautiful cakes by category</li>
                <li>Filter by quantity range (e.g., 0.5kg to 5kg)</li>
                <li>Filter by cake flavours (e.g., chocolate, vanilla, etc.)</li>
                <li>Sort cakes by price, quantity, or newest first</li>
                <li>View dynamic pricing per cake and per kg</li>
                <li>Include optional message or cake notes</li>
                <li>Order instantly via WhatsApp</li>
              </ul>
            </div>

            <div className="p-6 hover:bg-white/20 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20">
              <h3 className="text-xl font-semibold mb-2">Smart Admin Panel</h3>
              <ul className="list-disc list-inside max-sm:text-xs text-white/70 space-y-1">
                <li>Upload cakes and images via Cloudinary</li>
                <li>Manage cake categories and flavors</li>
                <li>Edit prices, descriptions, and stock on the go</li>
                <li>Preview your CakePage in real-time</li>
                <li>Track customer views and engagement</li>
              </ul>
            </div>

            <div className="p-6 hover:bg-white/20 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20">
              <h3 className="text-xl font-semibold mb-2">Join the Community</h3>
              <ul className="list-disc list-inside max-sm:text-xs text-white/70 space-y-1">
                <li>Perfect for home bakers and professionals</li>
                <li>Build your digital presence with ease</li>
                <li>Get discovered by cake lovers near you</li>
                <li>Turn your creativity into a cake business</li>
                <li>Be part of a growing cake-loving community</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="px-6 pt-20 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3  gap-8">
            {[
              {
                title: "1. Sign Up",
                description:
                  "Create your free account and enter your bakery name, address, and WhatsApp number.",
              },
              {
                title: "2. Build Your CakePage",
                description:
                  "Upload cake designs, set prices and flavors, categorize your cakes, and personalize your CakePage with a custom URL.",
              },
              {
                title: "3. Share & Grow",
                description:
                  "Promote your CakePage link and QR code. Let customers explore your cakes, sort by minimum order quantity, and order directly via WhatsApp.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="glass p-6 rounded-xl text-center bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="px-6 pt-20 bg-black max-md:px-2">
        <div className="max-w-xl mx-auto glass p-6 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="w-full p-3 rounded-xl bg-white/10  text-white/70 outline-none border border-white/10"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-white/10 text-white/70 outline-none border border-white/10"
            />
            <input
              type="mobile"
              name="mobile"
              required
              placeholder="Phone no"
              className="w-full p-3 rounded-xl bg-white/10 text-white/70 outline-none border border-white/10"
            />
            <textarea
              placeholder="Your Message"
              name="message"
              required
              className="w-full p-3 rounded-xl resize-none bg-white/10  text-white/70 outline-none border border-white/10"
              rows={4}
            />
            <button
              type="submit"
              disabled={isSending}
              className={`custom-send-button w-full text-xl font-semibold rounded-xl flex items-center justify-center ${
                isSending ? "active cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    />
                  </svg>
                </div>
              </div>
              <span className="ml-2">{isSending ? " " : "Send Message"}</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Home;
