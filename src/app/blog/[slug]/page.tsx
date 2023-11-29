import { GraphQLClient, gql } from "graphql-request";
import styles from "./slug.module.css";

const graphcms = new GraphQLClient(
  "https://ap-south-1.cdn.hygraph.com/content/clipl48kd0vtf01ulh6004cmw/master"
);

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

// export async function getStaticPaths() {
//   const { posts }: any = await graphcms.request(SLUGLIST);
//   return {
//     paths: posts.map((post: any) => ({ params: { slug: post.slug } })),
//     fallback: false,
//   };
// }

// export async function getPost({ params }: any) {
//   const slug = params.slug;
//   const data: any = await graphcms.request(POST_QUERY, { slug });
//   const post = data.post;
//   return {
//     props: {
//       post,
//     },
//     revalidate: 10,
//   };
// }

const slug = ({ params }: any) => {
  // const post = use(getPost({ params }));
  return (
    <div className={styles.main}>
      {/* <h1>{post.props.post.title}</h1> */}

      {/* <img src={post.props.post.coverphoto.url} alt="" /> */}
      <div className={styles.meta}>
        {/* <p>{post.props.post.createdAt.split("T")[0]}</p> */}
        <p>.</p>
        {/* <p>{post.props.post.createdBy.name}</p> */}
      </div>
      {/* <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.props.post.content.html }}
      ></div> */}
    </div>
  );
};

export default slug;
