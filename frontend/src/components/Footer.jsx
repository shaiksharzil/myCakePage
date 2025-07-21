import React, { useRef } from "react";
import InstagramIcon from "../icons/InstagramIcon";
import GithubIcon from "../icons/GithubIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import { Link } from "react-router-dom";

const Footer = () => {
  const instaRef = useRef();
  const githubRef = useRef();
  const linkedInRef = useRef();

  return (
    <footer className="border-t-2 border-white/10 w-full text-white mt-5">
      <p className="text-center mt-2 max-sm:text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <Link to={"/"}
          style={{ fontFamily: "Alagen" }}
          className="cursor-pointer text-emerald-400"
        >
          MyCakePage
        </Link>{" "}
        — Made with ❤️ for cake lovers.
      </p>
      <p className="text-center mt-2 max-sm:text-sm">
        Designed & Developed By{" "}
        <a
          href="https://shaik-sharzil.netlify.app/"
          className="text-emerald-400 cursor-pointer"
        >
          Shaik Sharzil
        </a>
      </p>
      <div className="flex items-center justify-center gap-2 mt-2 pb-4">
        <a
          onMouseEnter={() => instaRef.current?.startLoop()}
          onMouseLeave={() => instaRef.current?.stopAndReset()}
          href="https://www.instagram.com/shaik_sharzil/?utm_source=qr&igsh=Nm5sd2Q2czJmMmo%3D#"
        >
          <InstagramIcon ref={instaRef} />
        </a>
        <a
          href="https://github.com/shaiksharzil/"
          className="flex items-center text-white/70 hover:text-white transition"
          onMouseEnter={() => githubRef.current?.startLoop()}
          onMouseLeave={() => githubRef.current?.stopAndReset()}
        >
          <GithubIcon ref={githubRef} />
        </a>
        <a
          href="https://www.linkedin.com/in/shaik-sharzil/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          className="flex items-center text-white/70 hover:text-white transition"
          onMouseEnter={() => linkedInRef.current?.startLoop()}
          onMouseLeave={() => linkedInRef.current?.stopAndReset()}
        >
          <LinkedInIcon ref={linkedInRef} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
