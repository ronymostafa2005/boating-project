"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { HOME2_INSTAGRAM_IMAGES, HOME2_INSTAGRAM_URL } from "@/data/home2";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { MOTION_EASE } from "@/lib/motionVariants";

function InstagramIcon() {
  return (
    <svg
      className="h-7 w-7 text-white"
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden
    >
      <path d="M50,99c-9.7,0-19.2-2.9-27.2-8.3c-8.1-5.4-14.3-13-18-22c-3.7-9-4.7-18.8-2.8-28.3 c1.9-9.5,6.6-18.2,13.4-25.1S30.9,3.8,40.4,1.9C49.9,0,59.8,1,68.8,4.7c9,3.7,16.6,10,22,18C96.1,30.8,99,40.3,99,50 c0,13-5.2,25.4-14.4,34.6C75.4,93.8,63,99,50,99z M50,4.3C41,4.3,32.1,7,24.6,12c-7.5,5-13.4,12.2-16.8,20.5 c-3.5,8.4-4.4,17.5-2.6,26.4c1.8,8.9,6.1,17,12.5,23.4c6.4,6.4,14.5,10.7,23.4,12.5c8.9,1.8,18.1,0.9,26.4-2.6 C75.8,88.8,83,82.9,88,75.4c5-7.5,7.7-16.4,7.7-25.4c0-12.1-4.8-23.7-13.4-32.3C73.7,9.1,62.1,4.3,50,4.3z" />
      <path d="M50,31.1c6.1,0,6.9,0,9.3,0.1c1.5,0,2.9,0.3,4.3,0.8c1,0.4,1.9,1,2.7,1.7c0.8,0.8,1.3,1.7,1.7,2.7 c0.5,1.4,0.8,2.8,0.8,4.3c0.1,2.4,0.1,3.2,0.1,9.3c0,6.1,0,6.9-0.1,9.3c0,1.5-0.3,2.9-0.8,4.3c-0.4,1-1,1.9-1.7,2.7 c-0.8,0.8-1.7,1.3-2.7,1.7c-1.4,0.5-2.8,0.8-4.3,0.8c-2.4,0.1-3.2,0.1-9.3,0.1c-6.1,0-6.9,0-9.3-0.1c-1.5,0-2.9-0.3-4.3-0.8 c-1-0.4-1.9-1-2.6-1.7c-0.8-0.7-1.3-1.6-1.7-2.6c-0.5-1.4-0.8-2.8-0.8-4.3c-0.1-2.4-0.1-3.2-0.1-9.3c0-6.1,0-6.9,0.1-9.3 c0-1.5,0.3-2.9,0.8-4.3c0.4-1,1-1.9,1.7-2.6c0.7-0.8,1.6-1.4,2.6-1.7c1.4-0.5,2.8-0.8,4.3-0.8C43.1,31.2,43.9,31.2,50,31.1 M50,27 c-6.3,0-7,0-9.5,0.1c-1.9,0-3.8,0.4-5.6,1.1c-1.5,0.6-2.9,1.5-4.1,2.7c-1.2,1.2-2.1,2.5-2.7,4.1c-0.7,1.8-1,3.7-1.1,5.6 C27,43,27,43.8,27,50.1c0,6.3,0,7,0.1,9.5c0,1.9,0.4,3.8,1.1,5.6c0.6,1.5,1.5,2.9,2.7,4.1c1.2,1.2,2.5,2.1,4.1,2.7 c1.8,0.7,3.7,1,5.6,1.1c2.5,0.1,3.2,0.1,9.5,0.1c6.3,0,7,0,9.5-0.1c1.9,0,3.8-0.4,5.6-1.1c1.5-0.6,2.9-1.5,4.1-2.7 c1.2-1.2,2.1-2.5,2.7-4.1c0.7-1.8,1-3.7,1.1-5.6c0.1-2.5,0.1-3.2,0.1-9.5c0-6.3,0-7-0.1-9.5c0-1.9-0.4-3.8-1.1-5.6 c-0.6-1.5-1.5-2.9-2.7-4.1c-1.2-1.2-2.5-2.1-4.1-2.7c-1.8-0.7-3.7-1-5.6-1.1C57,27.1,56.3,27,50,27z" />
      <path d="M50,38.2c-2.3,0-4.6,0.7-6.6,2c-1.9,1.3-3.5,3.1-4.4,5.3c-0.9,2.2-1.1,4.5-0.7,6.8c0.5,2.3,1.6,4.4,3.2,6.1 c1.7,1.7,3.8,2.8,6.1,3.2c2.3,0.5,4.7,0.2,6.8-0.7c2.2-0.9,4-2.4,5.3-4.4c1.3-1.9,2-4.2,2-6.6c0-3.1-1.2-6.1-3.5-8.4 C56.2,39.4,53.1,38.2,50,38.2z M50,57.7c-1.5,0-3-0.4-4.3-1.3c-1.3-0.8-2.2-2-2.8-3.4c-0.6-1.4-0.7-2.9-0.4-4.4 c0.3-1.5,1-2.9,2.1-3.9c1.1-1.1,2.4-1.8,3.9-2.1c1.5-0.3,3-0.1,4.4,0.4c1.4,0.6,2.6,1.6,3.4,2.8c0.8,1.3,1.3,2.7,1.3,4.3 c0,2-0.8,4-2.2,5.4C54,56.9,52,57.7,50,57.7z" />
      <path d="M65.1,37.7c0,0.5-0.2,1.1-0.5,1.5c-0.3,0.5-0.7,0.8-1.2,1c-0.5,0.2-1.1,0.3-1.6,0.2c-0.5-0.1-1-0.4-1.4-0.8 c-0.4-0.4-0.6-0.9-0.8-1.4c-0.1-0.5-0.1-1.1,0.2-1.6c0.2-0.5,0.6-0.9,1-1.2c0.5-0.3,1-0.5,1.5-0.5c0.4,0,0.7,0.1,1.1,0.2 c0.3,0.1,0.6,0.3,0.9,0.6c0.3,0.3,0.5,0.6,0.6,0.9C65,37,65.1,37.4,65.1,37.7z" />
    </svg>
  );
}

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: MOTION_EASE },
  },
};

export function InstagramSection() {
  return (
    <motion.section
      className="home2-instagram overflow-hidden"
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      aria-label="Instagram gallery"
    >
      <div className="home2-instagram-track">
        {HOME2_INSTAGRAM_IMAGES.map((src, index) => (
          <a
            key={src}
            href={HOME2_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="home2-instagram-item group"
            aria-label={`Instagram photo ${index + 1}`}
          >
            <Image
              src={src}
              alt=""
              fill
              className="home2-instagram-item__img object-cover"
              sizes="(max-width: 480px) 50vw, (max-width: 767px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, (max-width: 1540px) 16vw, 12vw"
              quality={IMAGE_QUALITY}
              loading="lazy"
            />
            <span className="home2-instagram-item__overlay" aria-hidden>
              <span className="home2-instagram-item__icon">
                <InstagramIcon />
              </span>
            </span>
          </a>
        ))}
      </div>
    </motion.section>
  );
}
