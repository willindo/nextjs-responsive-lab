"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-16  dark:bg-gray-900">
      <div className=" mx-auto text-center px-6">
        <h2 className=" font-bold text-[#154114] dark:text-white mb-6">
          Contact Me
        </h2>

        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          {/* Address */}
          <div className="flex items-center justify-center gap-3">
            <MapPin className="w-5 h-5 text-blue-500" />
            <p>
              Badsha Noordeen, Kolparambil House, P O Kizhupillikara,
              Thrissur, Kerala, India – 680702
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center justify-center gap-3">
            <Mail className="w-5 h-5 text-red-500" />
            <a
              href="mailto:badshanoordeen@gmail.com"
              className="hover:underline"
            >
              badshanoordeen@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-center gap-3">
            <Phone className="w-5 h-5 text-green-500" />
            <a href="tel:+919061464906" className="hover:underline">
              +91 90614 64906 (Mobile & WhatsApp)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
