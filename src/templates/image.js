import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from  "../components/layout";

export default ({ data }) => {
    const { image } = data;

    return (
        <Layout>
            <div>
                <h1>{image.author}</h1>
                <Img fluid={image.file.childImageSharp.fluid} alt={image.author} />
            </div>
        </Layout>
    );
};

export const query = graphql`
    query($slug: String!) {
        image(slug: { eq: $slug }) {
            file {
                childImageSharp {
                  fluid(quality: 90, maxWidth: 1024) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            author
        }
    }
`;
