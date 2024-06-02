import React, { useEffect } from "react";

const Preloader = ({ switchScene }) => {
  useEffect(() => {
    setTimeout(() => {
      switchScene("menu");
    }, 2000);
  }, [switchScene]);

  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <div className="animate-spin text-4xl text-blue-600">
        <i className="fas fa-square"></i>
      </div>
      <div className="mt-4 text-gray-600">Loading assets...</div>
    </section>
  );
};

export default Preloader;
