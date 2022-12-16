import upload from "../assets/upload.png";
export default function Home() {
  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-x-2">
        <div className="col-start-4 col-span-6">
          <h1 className="text-3xl font-bold text-blue">
            Mais de 700 milhões de usuários registrados confiam na DocSpider's
            Document Uploader.
          </h1>
          <p className="mt-4 text-blue-100">
            Fácil de usar, confiável, privado e seguro. Não é à toa que Document
            Uploader é a melhor solução para armazenamento de documentos em
            nuvem.
          </p>
          <div className="">
            <img src={upload} alt="logo" className=" mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
