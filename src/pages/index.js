import React from "react";
import { Link, graphql  } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Img from "gatsby-image";

const IndexPage = ({ data }) => {
  const { allImage } = data;

  console.log(allImage);

  return (
    <Layout>
      <Seo title="Home" />
      <h1>Images list</h1>
      <div>
        {allImage.nodes.map(image => {
          return (
            <div>
              <Link to={image.slug}>
                <Img
                  fixed={image.file.childImageSharp.fixed}
                  alt={image.slug}
                />
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  );
};

export default IndexPage

export const query = graphql`
query {
  allImage {
    nodes {
      file {
        childImageSharp {
          fixed(width: 400, height: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      slug
    }
  }
}
`;
