import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { db } from "../firebase";
import { session, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { convertToRaw, convertFromRaw } from "draft-js";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
// import { Editor } from "react-draft-wysiwyg";
import { doc, setDoc } from "firebase/firestore";

const Editor = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((module) => module.Editor);
  },
  { ssr: false }
);

const TextEditor = () => {
  const { data: session } = useSession();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();
  const { id } = router.query;
  const [snapshot] = useDocumentOnce(
    doc(doc(db, "userDocs", session.user.email), "docs", id)
  );

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
    }
  }, [snapshot]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDoc(
      doc(doc(db, "userDocs", session.user.email), "docs", id),
      {
        editorState: convertToRaw(editorState.getCurrentContent()),
      },
      {
        merge: true,
      }
    );
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 bg-white shadow-lg max-w-[90%] mx-auto mb-12 border p-10 h-screen"
      />
    </div>
  );
};

export default TextEditor;
