"use client";
import { useHeading } from "../context/HeadingContext";


export default function Heading({ children }) {
    const { level } = useHeading();
  
    // Dynamically set the heading tag based on the context level
    const Tag = `h${level}`;
  
    return <Tag>{children}</Tag>;
  }