import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={850}
    height={124}
    viewBox="0 0 850 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#e8e8e8"
    {...props}
  >
    <circle cx="29" cy="29" r="29" />
    <rect x="72" y="48" rx="3" ry="3" width="200" height="8" />
    <rect x="71" y="9" rx="3" ry="3" width="850" height="9" />
    <rect x="72" y="28" rx="3" ry="3" width="425" height="10" />
  </ContentLoader>
);

export default MyLoader;
