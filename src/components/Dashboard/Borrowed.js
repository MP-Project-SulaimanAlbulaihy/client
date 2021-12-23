import React from "react";

const Borrowed = () => {
  return (
    <div>
      {/* {posts.length ? (
        posts
          .map((item) => {
            return ( */}
              <div  className="items_post">
                <img src='https://rapidapi.com/cdn/images?url=https://rapidapi-prod-apis.s3.amazonaws.com/479bb0d4-f442-4c61-8483-a4fc2abb1e88.png' wdith="90" height="90" alt=""/>
                <div className="items_post_text">
                  <h2>Some title here</h2>
                  <p>created at 2012/65/654 56416</p>
                </div>
                <div className="items_post_status">
                  <h2>Post</h2>
                </div>
              </div>

            {/* );
          })
          .reverse()
      ) : (
        <h1>Loading...</h1>
      )} */}
    </div>
  );
};

export default Borrowed;
