import React from 'react'
import {motion} from 'motion/react';

const AddButton = ({ onClick }) => {
  return (
    <motion.div
      animate={{
        y: -10,
      }}
      transition={{
        duration: 1,
        repeatType: "reverse",
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onClick={onClick}
      className="fixed h-20 w-20 rounded-full z-1 shimmer  border border-white/10 shadow-lg backdrop-filter backdrop-blur-md bottom-0 right-0 mb-5 mr-5 text-4xl flex items-center justify-center cursor-pointer max-md:h-15 max-md:w-15"
    >
      <i class="ri-add-large-line"></i>
    </motion.div>
  );
};

export default AddButton