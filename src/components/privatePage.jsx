import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivatePage(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/login");
  }, []);
  return <>{props.children}</>;
}
