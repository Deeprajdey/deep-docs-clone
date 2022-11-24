import { useState } from "react";
import { db } from "../firebase";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { deleteDoc, doc } from "firebase/firestore";
import {
  EllipsisVerticalIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { Button, IconButton } from "@material-tailwind/react";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";

function DocumentRow({ id, filename, date }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [showModal, setShowModal] = useState(false);

  const delDocument = async () => {
    const userDocsRef = doc(db, "userDocs", session.user.email);
    const docsRef = doc(userDocsRef, "docs", id);
    await deleteDoc(docsRef);
    setShowModal(false);
  };

  const modal = (
    <Dialog
      size="lg"
      open={showModal}
      handler={() => setShowModal(false)}
      className="max-w-[90%] min-w-[90%] lg:max-w-[30%] lg:min-w-[30%]"
    >
      <DialogBody>Are you sure, you want to delete this Document?</DialogBody>
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
          onClick={delDocument}
          ripple={true}
        >
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );

  return (
    <div className="flex items-center">
      {/* MODAL */}
      {modal}
      <div
        onClick={() => router.push(`/doc/${id}`)}
        className="flex flex-grow items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"
      >
        <DocumentTextIcon className="text-blue-500 w-8" />
        <p className="flex-grow pl-5 w-10 pr-10 truncate">{filename}</p>
        <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>
      </div>

      <IconButton
        ripple={true}
        variant="outlined"
        onClick={() => setShowModal(true)}
        className="rounded-full hover:bg-white active:bg-gray-200 border-0 active:border-0 focus:ring-transparent"
      >
        <EllipsisVerticalIcon className="h-5 w-5 text-gray-700" />
      </IconButton>
    </div>
  );
}

export default DocumentRow;
