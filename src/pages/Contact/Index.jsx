"use client";

import React from "react";
import { motion } from "framer-motion";
import logo from "../../../public/logo.png"; // Make sure the path is correct

const Contact = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#01010f] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-6xl bg-gray-800/20 backdrop-blur-lg border border-gray-700/30 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row gap-8"
      >
        {/* Left Panel: Info */}
        <div className="flex-1 flex flex-col items-center text-center lg:text-left lg:items-start gap-4">
          <img
            src={logo}
            alt="47Billion COE"
            className="w-40 h-auto object-contain mb-4 mt-2"
          />

          <h3 className="text-2xl font-bold text-gray-100">
            47Billion Center of Excellence
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            The Center of Excellence (COE) by 47Billion is a student-led tech
            innovation hub aimed at fostering creativity, collaboration, and
            career growth. It empowers students through real-world exposure and
            professional guidance in the tech domain.
          </p>

          <div className="mt-4">
            <h4 className="text-lg font-semibold text-purple-400 mb-2">
              Top Events
            </h4>
            <ul className="text-sm text-gray-200 space-y-1">
              <li>
                <span className="font-medium text-purple-300">Quasar 2.0:</span>{" "}
                Annual tech fest celebrating innovation.
              </li>
              <li>
                <span className="font-medium text-purple-300">
                  Tech Roadies:
                </span>{" "}
                A thrilling inter-college coding competition.
              </li>
              <li>
                <span className="font-medium text-purple-300">
                  Donation Drive:
                </span>{" "}
                Social outreach for community welfare.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Panel: Contact Form */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-100 text-center mb-6">
            Contact Us
          </h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 w-full px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-300"
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                required
                className="mt-1 w-full px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
                placeholder="+91 123 456 7890"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 w-full px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                className="mt-1 w-full px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
                placeholder="Your message here..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full px-3 py-2 rounded-full text-sm font-semibold bg-[#AB47BC] text-white shadow-md hover:bg-gradient-to-r hover:from-[#8E24AA] hover:to-[#4A148C] hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-[#AB47BC] cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
