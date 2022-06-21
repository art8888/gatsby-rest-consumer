const fetch = require("node-fetch");
const path = require("path");
const slugify = require("slugify");

exports.sourceNodes = async ({
    actions,
    createNodeId,
    createContentDigest
}) => {
    const { createNode } = actions;
    const response = await fetch("https://picsum.photos/v2/list?limit=10");
    const data = await response.json();

    for (const result of data) {
        const nodeId = createNodeId(`${result.id}`);
        const nodeContent = JSON.stringify(result);
        const node = Object.assign({}, result, {
            id: nodeId,
            originalId: result.id,
            parent: null,
            children: [],
            internal: {
                type: "Image",
                content: nodeContent,
                contentDigest: createContentDigest(result)
            }
        });

        createNode(node);
    }
};

exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
        Image: {
            slug: {
              resolve: source => {
                    return slugify(`${source.author} ${source.originalId}`,  {
                        lower: true
                    });
                }
            }
        }
    };

    createResolvers(resolvers);
};

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;

    const typeDefs = `
        type Image implements Node {
            slug: String!
        }
    `;

    createTypes(typeDefs);
}

exports.createPages = async({ graphql, actions }) => {
    const { createPage } = actions;

    const images = await graphql(`
        query {
            allImage {
                nodes {
                    slug
                }
            }
        }
    `);

    images.data.allImage.nodes.forEach(image => {
      createPage({
            path: image.slug,
            component: path.resolve("./src/templates/image.js"),
            context: {
                slug: image.slug
            }
      });
    });
};
