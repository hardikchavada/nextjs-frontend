"use client";

import { useState } from "react";

export default function Contact() {
  const [count, setCount] = useState(4);

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
      <h1>Contact Us Page - Updated</h1>
    </div>
  );
}