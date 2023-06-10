import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { Link } from "next/link";

const useStyles1 = makeStyles((theme) => ({
  containerType1: {
    position: "relative",
  },
  containerPaper: {
    minHeight: "500px",
    display: "flex",
  },
}));

const Box1 = (props1) => {
    const { title, content, btnLink, btnText } = props1 || {};
    return (
      <div>
        <div>test</div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
          fugit! Dignissimos ea at deleniti, placeat officia consequatur esse in
          facilis repudiandae. Eaque rem officia atque accusantium ullam natus
          sunt deleniti.
        </div>
        <div>
          <Link href="/events">
            <Button variant="text">test</Button>
          </Link>
        </div>
      </div>
    );
  };

const CreativeBox = (props) => {
  const { type } = props || {};
  
  if (type === "box1") {
    return <Box1 />;
  }

  return <div></div>;
};

export default CreativeBox;
