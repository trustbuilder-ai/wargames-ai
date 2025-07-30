import React from "react";
import { ProtectedCard } from "../components/ProtectedCard";
import "./Pages.css";

const Wargames = () => {
  return (
    <div className="page-content">
      <h1>Wargames</h1>
      <div className="lorem-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac
          diam sit amet quam vehicula elementum sed sit amet dui. Curabitur
          aliquet quam id dui posuere blandit.
        </p>
        <p>
          Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus
          magna justo, lacinia eget consectetur sed, convallis at tellus. Sed
          porttitor lectus nibh.
        </p>
        <p>
          Nulla quis lorem ut libero malesuada feugiat. Praesent sapien massa,
          convallis a pellentesque nec, egestas non nisi. Vivamus suscipit
          tortor eget felis porttitor volutpat.
        </p>
        <p>
          Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae;
          Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet
          ligula.
        </p>
      </div>

      <h2 style={{ marginTop: "40px" }}>Protected Content Example</h2>
      <ProtectedCard className="protected-section">
        <div className="lorem-content">
          <h3>Premium Wargames Content</h3>
          <p>
            This content is only visible to authenticated users. It contains
            advanced wargaming scenarios and strategic analysis that requires
            user authentication to access.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
        </div>
      </ProtectedCard>
    </div>
  );
};

export default Wargames;
