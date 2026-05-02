"use client";

import { useState } from "react";

export default function About() {
  const [count, setCount] = useState(4);

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
      <h1>About Us Page</h1>
    </div>
  );
}