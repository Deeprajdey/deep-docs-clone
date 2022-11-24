import Head from "next/head";
import Image from "next/image";
import { DocumentRow, Header, Loading, Login } from "../components";
import { EllipsisVerticalIcon, FolderIcon } from "@heroicons/react/24/solid";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import {
  IconButton,
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { useSession, getSession } from "next-auth/react";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [snapshot] = useCollectionOnce(
    !session
      ? undefined
      : query(
          collection(doc(db, "userDocs", session?.user.email), "docs"),
          orderBy("timestamp", "desc")
        )
  );
  if (status === "loading") return <Loading />;
  if (status === "unauthenticated") return <Login />;

  const createDocument = async () => {
    if (!input) return;

    const userDocsRef = doc(db, "userDocs", session.user.email);
    await addDoc(collection(userDocsRef, "docs"), {
      filename: input,
      timestamp: serverTimestamp(),
    });

    setInput("");
    setShowModal(false);
  };

  const modal = (
    <Dialog
      size="lg"
      handler={() => setShowModal(false)}
      open={showModal}
      className="max-w-[90%] min-w-[90%] lg:max-w-[30%] lg:min-w-[30%]"
    >
      <DialogBody>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="outline-none w-full focus:ring-transparent border-none  shadow-lg text-black"
          placeholder="Enter Name of Document..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </DialogBody>
      <DialogFooter className="flex gap-5">
        <Button
          color="blue"
          variant="outlined"
          onClick={(e) => setShowModal(false)}
          ripple={true}
        >
          Cancel
        </Button>
        <Button
          color="blue"
          variant="filled"
          onClick={createDocument}
          ripple={true}
        >
          Create
        </Button>
      </DialogFooter>
    </Dialog>
  );

  return (
    <div>
      <Head>
        <title>Google Docs Clone</title>
        <meta name="description" content="Google Docs Clone" />
        <link
          rel="icon"
          href="https://img.icons8.com/bubbles/200/null/google-docs.png"
        />
      </Head>
      {/* HEADER */}
      <Header />
      {/* MODAL */}
      {modal}
      {/* SECTION-1 */}
      <section className="bg-[#f8f9fa] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <IconButton
              ripple={true}
              variant="text"
              className="rounded-full hover:bg-white active:bg-gray-200 hidden lg:block "
            >
              <EllipsisVerticalIcon className="h-auto w-5 text-gray-700 " />
            </IconButton>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
            >
              <Image
                src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
                width="100"
                height="0"
                className="h-auto w-full"
                alt="Icon"
              />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
      {/* SECTION-2 */}
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5 ">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <FolderIcon className="text-gray-700 w-5" />
          </div>

          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              filename={doc.data().filename}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
