import React from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-100 py-6 mt-10 border-t border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-500 mb-3">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-700">
            PRS Technology Software and Services
          </span>. All rights reserved.
        </p>

        <div className="flex justify-center gap-6 mt-2">

          <a
            href="mailto:prstechno08@gmail.com"
            className="text-gray-500 hover:text-red-600 transition"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://wa.me/916360760238"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-green-600 transition"
          >
            <MessageCircle size={20} />
          </a>
          <a
            href="tel:+916360760238"
            className="text-gray-500 hover:text-indigo-600 transition"
          >
            <Phone size={20} />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
