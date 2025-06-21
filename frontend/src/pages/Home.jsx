import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { debounce } from "lodash";
import axios from "axios";

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
      toast.error("Enter a valid 10-digit mobile number", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
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
      .promise(
        sendEmail(),
        {
          loading: "Sending your message...",
          success: () => {
            form.reset();
            return <b>Message sent successfully!</b>;
          },
          error: <b>Failed to send message. Try again.</b>,
        },
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      )
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
            A next-gen cake gallery where bakers showcase stunning designs in
            personalized portfolios. Customers can easily browse, filter by
            flavors or themes, and connect with their favorite bakers in just a
            few clicks.
          </p>
          <div className="">
            <input
              type="text"
              placeholder="mycakepage/"
              onChange={(e) => {
                const value = e.target.value.toLowerCase();
                // setCustomURL(value);
                const error = validateCustomUrl(value);
                setUrlError(error);
                if (!error) checkUrlAvailability(value);
              }}
              className="bg-white/10 text-white/70 px-3  max-md:px-0 py-2 rounded outline-none border border-white/10"
            />
            <Link
              to={"/signup"}
              className=" py-3 px-2 ml-2 bg-white max-md:px-1 hover:text-white rounded-md shimmer text-white/70 border border-white/10 font-bold cursor-pointer"
            >
              Claim your CakePage
            </Link>
            {urlError && (
              <p className="text-sm  text-red-400">
                {urlError}
              </p>
            )}
            {!urlError && urlAvailable === false && (
              <p className="text-sm text-red-400">
                URL already taken
              </p>
            )}
            {!urlError && urlAvailable === true && (
              <p className="text-sm text-emerald-400">
                URL is available!
              </p>
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
              Create, share, and celebrate your cake artistry with a unique
              CakePage URL.
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
          initial={{ opacity: 0, y: 50}}
          whileInView={{ opacity: 1, y: 0}}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Why Choose <span style={{ fontFamily: "Alagen" }}>MyCakePage?</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <Tilt
              tiltMaxAngleX={-5}
              tiltMaxAngleY={-5}
              glareEnable={true}
              glareMaxOpacity={0.1}
              transitionSpeed={1000}
              className="p-6 hover:scale-105 shimmer rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"
            >
              <h3 className="text-xl font-semibold mb-2">For Bakers</h3>
              <p className="text-white/70">
                Showcase your baking talent with a professional digital
                portfolio. Effortlessly upload and categorize your cake designs
                by type, flavor, and theme. Share your personalized CakePage URL
                with customers to receive direct inquiries and build your brand
                online.
              </p>
            </Tilt>
            <Tilt
              tiltMaxAngleX={-5}
              tiltMaxAngleY={-5}
              glareEnable={true}
              glareMaxOpacity={0.1}
              transitionSpeed={1000}
              className="p-6 hover:scale-105 shimmer rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"
            >
              <h3 className="text-xl font-semibold mb-2">For Customers</h3>
              <p className="text-white/70">
                Discover delicious cakes from local bakers. Explore a wide range
                of categories and flavors, view prices, and place orders—all
                from the convenience of the baker's unique CakePage. Get
                inspired and find the perfect cake for any celebration.
              </p>
            </Tilt>
            <Tilt
              tiltMaxAngleX={-5}
              tiltMaxAngleY={-5}
              glareEnable={true}
              glareMaxOpacity={0.1}
              transitionSpeed={1000}
              className="p-6 hover:scale-105 rounded-2xl shimmer bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"
            >
              <h3 className="text-xl font-semibold mb-2">Smart Admin Panel</h3>
              <p className="text-white/70">
                Easily manage your cake catalog with our smart admin panel.
                Upload high-quality images directly to Cloudinary, organize your
                listings, track customer views and engagement, and make updates
                on the go. Save time and stay in control.
              </p>
            </Tilt>
            <Tilt
              tiltMaxAngleX={-5}
              tiltMaxAngleY={-5}
              glareEnable={true}
              glareMaxOpacity={0.1}
              transitionSpeed={1000}
              className="p-6 hover:scale-105 rounded-2xl shimmer bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"
            >
              <h3 className="text-xl font-semibold mb-2">Join the Community</h3>
              <p className="text-white/70">
                Join a vibrant and growing network of bakers and dessert lovers.
                Whether you're a home baker, professional, or simply someone who
                loves cake, there's a place for you here. Sign up today and turn
                your passion into opportunity.
              </p>
            </Tilt>
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
                  "Create your free account in seconds and become part of the MyCakePage community. Whether you're a professional baker or a passionate hobbyist, you're welcome here!",
              },
              {
                title: "2. Build Your CakePage",
                description:
                  "Upload beautiful cake designs, categorize them by flavor or event type, and customize your CakePage with a unique link that reflects your brand.",
              },
              {
                title: "3. Share & Grow",
                description:
                  "Promote your custom CakePage URL across social platforms, receive direct customer inquiries, track views, and watch your baking business thrive.",
              },
            ].map((step, index) => (
              <Tilt
                tiltMaxAngleX={-5}
                tiltMaxAngleY={-5}
                glareEnable={true}
                glareMaxOpacity={0.1}
                transitionSpeed={1000}
                key={index}
                className="glass p-6 rounded-xl shimmer text-center bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-300">{step.description}</p>
              </Tilt>
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
              className="w-full p-3 rounded-xl bg-white/10 shimmer  text-white/70 outline-none border border-white/10"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-white/10 shimmer text-white/70 outline-none border border-white/10"
            />
            <input
              type="mobile"
              name="mobile"
              required
              placeholder="Phone no"
              className="w-full p-3 rounded-xl bg-white/10 shimmer text-white/70 outline-none border border-white/10"
            />
            <textarea
              placeholder="Your Message"
              name="message"
              required
              className="w-full p-3 rounded-xl resize-none shimmer bg-white/10  text-white/70 outline-none border border-white/10"
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
