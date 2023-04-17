import React from "react";
import ContentLoader from "react-content-loader";


const Catalog = () => {
    return (
      <div className="px-3 grid grid-cols-2 gap-y-20 gap-x-2">
            <BlogItem width={'100%'} height={'100%'} transform={'scale(1.5)'} />
            <BlogItem width={'100%'} height={'100%'} transform={'scale(1.5)'} />
            <BlogItem width={'100%'} height={'100%'} transform={'scale(1.5)'} />
            <BlogItem width={'100%'} height={'100%'} transform={'scale(1.5)'} />    
            <BlogItem width={'100%'} height={'100%'} transform={'scale(1.5)'} />    
            <BlogItem width={'100%'} height={'100%'} transform={'scale(1.5)'} />    
            <BlogItem width={'100%'} height={'100%'} transform={'scale(1.5)'} />    
            <BlogItem width={'100%'} height={'100%'} transform={'scale(1.5)'} />    
      </div>
    );
}
function BlogItem(props) {
    return (
        <ContentLoader viewBox="-100 -40 500 280" {...props}>
        <rect x="3" y="3" rx="10" ry="10" width="300" height="180" />
        <rect x="6" y="190" rx="0" ry="0" width="292" height="20" />
        <rect x="4" y="215" rx="0" ry="0" width="239" height="20" />
        <rect x="4" y="242" rx="0" ry="0" width="274" height="20" />
    </ContentLoader>
)};

export default Catalog;
