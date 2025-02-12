import React, { useEffect, useRef, useState } from "react";
import "./styles/cursor.css"; // Import the CSS file
import { useModalContext } from "../context/modal-context";

const Cursor = () => {
  const cursorRef = useRef(null);
  const { showModal, modalData } = useModalContext();
  const [hasDemo, setHasDemo] = useState(false);

  useEffect(() => {
    if (modalData && modalData.projectData) {
      const { demo } = modalData.projectData;
      setHasDemo(demo != null && demo !== "");
    } else {
      setHasDemo(false);
    }
  }, [modalData]);

  useEffect(() => {
    // Function to move the custom cursor
    const editCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }
    };

    // Add event listener for cursor movement
    window.addEventListener("mousemove", editCursor);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", editCursor);
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".hover-this"));

    const handleMouseOver = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add("hover-cursor");
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("hover-cursor");
      }
    };

    elements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners on component unmount
    return () => {
      elements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [showModal, hasDemo]);

  return <div className="cursor" ref={cursorRef}></div>;
};

export default Cursor;
