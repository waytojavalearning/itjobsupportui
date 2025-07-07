import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="text-center py-24 px-4">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Get Instant IT Job Support
      </motion.h1>
      <motion.p
        className="text-lg text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        We provide expert support in Java, Spring Boot, Microservices, AWS, React, Angular and more.
      </motion.p>
    </div>
  );
}
