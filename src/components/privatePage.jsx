import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivatePage(props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/login");

    setLoading(true);
  }, []);
  return <>{loading && props.children}</>;
}
