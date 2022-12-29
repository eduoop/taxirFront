import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }