import { firestore, auth, increment } from '@lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
//import { doc, getFirestore, writeBatch } from "firebase/firestore";

export default function Heart({ postRef }: any) {

    const uid: any = auth?.currentUser?.uid;
    //auth.currentUser.
    const heartRef = postRef.collection('hearts').doc(uid);
    //const heartRef = doc(getFirestore(), postRef.path, 'hearts', uid);
    const [heartDoc]: any = useDocument(heartRef);

    const addHeart = async () => {
        const uid = auth.currentUser.uid;
        //const batch = writeBatch(getFirestore());
        const batch = firestore.batch();

        batch.update(postRef, { heartCount: increment(1) });
        batch.set(heartRef, { uid });

        await batch.commit();
    };

    const removeHeart = async () => {
        //const batch = writeBatch(getFirestore());
        const batch = firestore.batch();

        batch.update(postRef, { heartCount: increment(-1) });
        batch.delete(heartRef);

        await batch.commit();
    };
    
    return heartDoc?.exists() ? (
        <button onClick={removeHeart}>💔 Unheart</button>
    ) : (
        <button onClick={addHeart}>💗 Heart</button>
    );
}