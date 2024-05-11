import type { Types } from "@/types";

import Button from "@ui/button";
import { ModalProvider, Modal, ModalCloseButton } from "@ui/modal";

function CommentDeleteModal({
  onCancel,
  onConfirm,
}: Types.CommentDeleteModalProps) {
  return (
    <Modal>
      <h3 className="text-xl font-bold text-slate-700">Delete comment</h3>
      <p className="text-gray-500 my-3.5">
        Are you sure you want to delete this comment? This will be remove the
        comment and can&apos;t be undone.
      </p>
      {/* Modal action buttons */}
      <div className="mt-4">
        <ModalCloseButton asChild>
          <Button onClick={onCancel} className="mr-3.5">
            No, Cancel
          </Button>
        </ModalCloseButton>
        <ModalCloseButton asChild>
          <Button onClick={onConfirm} variant="danger">
            Yes, Delete
          </Button>
        </ModalCloseButton>
      </div>
    </Modal>
  );
}

const CommentDeleteModalProvider = ModalProvider;

export { CommentDeleteModal, CommentDeleteModalProvider };
