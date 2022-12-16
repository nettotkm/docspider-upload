import { trpc } from "../client";

interface Props {
  onClose: () => void;
  documentId: string;
  children?: React.ReactNode;
}

interface ModalProps extends Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  onDelete?: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className=" text-3xl font-semibold text-black-100">
                Delete #{props.data?.id}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => props.onClose()}
              >
                <span className="bg-transparent text-black-100 pl-4h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">{props.children}</div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-white rounded bg-red font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => (props.onDelete ? props.onDelete() : null)}
              >
                Deletar
              </button>
              <button
                className="text-blue border rounded border-blue  hover:bg-blue hover:text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => props.onClose()}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black-100"></div>
    </>
  );
};

export default function DeleteMyDocument(props: Props) {
  const { data } = trpc.document.useQuery(props.documentId);
  const mutation = trpc.deleteDocument.useMutation();

  async function deleteDocument() {
    try {
      if (data) {
        await mutation.mutate({ id: data?.id });
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!data) {
    return (
      <Modal {...props} data={data}>
        Loading...
      </Modal>
    );
  }

  if (mutation.data?.success) {
    window.location.href = "/my-documents";
  }

  return (
    <Modal {...props} data={data} onDelete={() => deleteDocument()}>
      <p className="my-4 text-slate-500 text-lg leading-relaxed">
        Tem certeza que deseja apagar o registro #{data.id} com o título{" "}
        <span className="italic">{data.title}</span> ? <br />
        Essa operação não pode ser desfeita !
      </p>
    </Modal>
  );
}
