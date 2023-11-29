import { GraphQLClient } from "graphql-request";
import styles from "./blog.module.css";

const graphcms = new GraphQLClient(
  "https://ap-south-1.cdn.hygraph.com/content/clipl48kd0vtf01ulh6004cmw/master"
);

// export async function getPosts() {
//   const { posts }: any = await graphcms.request(QUERY);
//   return {
//     props: {
//       posts,
//     },
//     revalidate: 10,
//   };
// }

const Blog = () => {
  // const posts = use(getPosts());
  // console.log(posts);
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.blogContainer}>
          {/* {posts.props.posts.map((post: any) => (
            <BlogCard
              key={post.id}
              title={post.title}
              coverphoto={post.coverphoto.url}
              createdAt={post.createdAt}
              createdBy={post.createdBy.name}
              excerpt={post.excerpt}
              slug={post.slug}
            />
          ))} */}
        </div>
      </main>
    </div>
  );
};

export default Blog;
