import { DocumentTextIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { db } from "../../firebase";
import { getSession, signOut, useSession } from "next-auth/react";

import { useRouter } from "next/router";
import { Login, TextEditor } from "../../components";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { Button } from "@material-tailwind/react";

function Doc() {
  const { data: session } = useSession();
  if (!session) return <Login />;

  const router = useRouter();
  const { id } = router.query;

  const [snapshot, loadingSnapshot] = useDocumentOnce(
    doc(doc(db, "userDocs", session.user.email), "docs", id)
  );

  if (!loadingSnapshot && !snapshot?.data()?.filename) {
    router.replace("/");
  }

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span onClick={() => router.push("/")} className="cursor-pointer">
          <DocumentTextIcon className="h-10 text-blue-700" />
        </span>
        <div className="flex-grow px-5">
          <h2 className="">{snapshot?.data()?.filename}</h2>
          <div className="hidden lg:flex items-center text-sm space-x-3 -ml-1 h-8 text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>

        <Button
          color="blue"
          variant="filed"
          ripple={true}
          className="hidden md:flex h-10 items-center gap-3 mr-3"
        >
          <UserGroupIcon className="w-5" />
          SHARE
        </Button>
        <img
          className="rounded-full cursor-pointer h-10 ml-2"
          src={session?.user?.image}
          alt="user"
          onClick={signOut}
        />
      </header>

      <TextEditor />
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
