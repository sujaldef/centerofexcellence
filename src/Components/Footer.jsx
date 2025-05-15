import React, { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToNewsletter, selectNewsletterState, resetNewsletterState } from "../redux/slices/newsletterSlice";

const Footer = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { status, message, error } = useSelector(selectNewsletterState);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.", { theme: "dark" });
      return;
    }
    dispatch(subscribeToNewsletter(email));
  };

  // Handle success and error notifications
  useEffect(() => {
    if (status === "succeeded" && message) {
      toast.success(message, { theme: "dark" });
      setEmail("");
      dispatch(resetNewsletterState());
    }
    if (status === "failed" && error) {
      toast.error(error, { theme: "dark" });
      dispatch(resetNewsletterState());
    }
  }, [status, message, error, dispatch]);

  return (
    <footer className="bg-dark text-white w-full pt-12 pb-6 px-4 sm:px-6 md:px-10">
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Center of Excellence</h3>
          <p className="text-gray text-sm">
            Empowering innovation through cutting-edge solutions and community engagement.
          </p>
          <div className="flex gap-4 flex-wrap">
            {[
              { Icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
              { Icon: FaTwitter, label: "Twitter", href: "https://twitter.com" },
              { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
              { Icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
            ].map(({ Icon, label, href }, i) => (
              <a
                key={i}
                href={href}
                aria-label={label}
                className="text-white hover:text-[var(--primary-color)] transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray text-sm">
            {[
              { label: "About Us", href: "/about" },
              { label: "coewebste@gmail.com", href: "mailto:coewebste@gmail.com" },
            ].map(({ label, href }, i) => (
              <li key={i}>
                <a
                  href={href}
                  className="hover:text-[var(--primary-color)] transition duration-200 break-words"
                  aria-label={label}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-gray text-sm">
            {[
              { label: "Blog", href: "/student/blogs" },
              { label: "Events", href: "/student/events" },
            ].map(({ label, href }, i) => (
              <li key={i}>
                <a
                  href={href}
                  className="hover:text-[var(--primary-color)] transition duration-200"
                  aria-label={label}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <p className="text-gray text-sm mb-4">
            Stay updated with our latest news and events.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-sub-dark p-2 rounded-xl border border-[var(--border-accent)]/50 text-white focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] transition duration-200"
              aria-label="Email for newsletter subscription"
            />
            <button
              type="submit"
              className="btn-primary px-4 py-2 w-full sm:w-auto"
              aria-label="Subscribe to newsletter"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-[var(--border-accent)]/50 pt-6 mt-10 gap-4 text-center md:text-left">
        <p className="text-sm text-gray">© 2025 Center of Excellence. All rights reserved.</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
          <a
            href="/privacy"
            className="text-gray hover:text-[var(--primary-color)] transition duration-200"
            aria-label="Privacy Policy"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-gray hover:text-[var(--primary-color)] transition duration-200"
            aria-label="Terms of Service"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;