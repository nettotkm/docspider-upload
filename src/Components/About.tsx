import logo from "../assets/logo.png";

interface ModalProps {
  onClose: () => void;
}

export default function Modal(props: ModalProps) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <div className="pt-4 sm:flex sm:items-center">
                <img src={logo} alt="logo" className="h-[2.25rem]" />
              </div>
              <h3 className="pt-4 text-3xl font-semibold text-blue-100">
                DocSpider's Document Uploader
              </h3>
              <button
                className=" ml-auto bg-transparent border-0 text-black-100  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => props.onClose()}
              >
                <span className="bg-transparent text-black-100 pl-4 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                <span className="block">Version: 1.74.0 (Universal) </span>
                <span className="block">
                  Commit: 5235c6bb189b60b01b1f49062f4ffa42384f8c91
                </span>
                <span className="block">Date: 2022-12-05T16:43:37.594Z</span>
                <span className="block">Electron: 19.1.8 </span>
                <span className="block">Chromium: 102.0.5005.167 </span>
                <span className="block">Node.js: 16.14.2</span>
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-blue hover:bg-blue border hover:text-white rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => props.onClose()}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black-100"></div>
    </>
  );
}
