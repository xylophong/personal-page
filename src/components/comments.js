import React, { useEffect } from "react";

const COMMENTS_ID = "comments-container";

const Comments = (props) => {
  useEffect(() => {
    const toggleDark = document.documentElement.classList.contains("dark");

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "xylophong/personal-page");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", toggleDark? "icy-dark": "github-light");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.innerHTML = "";
    };
  }, []);

  return (
    <div id={COMMENTS_ID} className={ props.className } />
  );
};

export default Comments;