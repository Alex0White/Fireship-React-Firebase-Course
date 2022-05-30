import styles from '@styles/Post.module.css';
import PostContent from '@components/PostContent';
import HeartButton from '@components/HeartButton';
import AuthCheck from '@components/AuthCheck';
import Metatags from '@components/Metatags';
import { UserContext } from '@lib/context';
import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase";

import Link from "next/link";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useContext } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export async function getStaticProps({params}: { params: any}) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if(userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    //const postRef = doc(getFirestore(), userDoc.ref.path, 'posts', slug);
    post = postToJSON(await postRef.get());
    //post = postToJSON(await getDoc(postRef));
    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });
 
  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking',

  };
}

export default function Post(props: any) {
  const postRef: any = firestore.doc(props.path);
  //const postRef = doc(getFirestore(), props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  const { user: currentUser } = useContext(UserContext);

  return (
    <main className={styles.container}>
      <Metatags title={post.title} description={post.title} />

      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>

        <AuthCheck
          fallback={
            <Link passHref href="/enter">
              <button>💗 Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>

        {currentUser?.uid === post.uid && (
          <Link passHref href={`/admin/${post.slug}`}>
            <button className="btn-blue">Edit Post</button>
          </Link>
        )}
        
      </aside>
    </main>
  );
}
