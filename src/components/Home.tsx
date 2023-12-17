import React, { useState, useEffect } from "react";
import "./style.css";
import { getLimit } from "@controller/FirebaseController";

const Home: React.FC = () => {
  const [data, setData] = useState<any>(0); // Sesuaikan dengan tipe data yang diharapkan
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const angle = data / 22.744 - 90;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedData = await getLimit("1");
        setData(retrievedData);
        setIsLoading(false); // Setelah data diterima, berhenti loading
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Berhenti loading jika terjadi kesalahan
      }
    };

    const interval = setInterval(() => {
      fetchData(); // Mengambil data secara berkala
    }, 1000); // Contoh polling setiap 5 detik

    fetchData();

    return () => {
      clearInterval(interval); // Membersihkan interval saat komponen tidak lagi digunakan
    };
  }, []);
  function refreshData() {
    setIsLoading(true); // Berhenti loading jika terjadi kesalahan
  }

  return (
    <div className=" items-center flex justify-center p-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden border-r">
          <div className=" px-4 py-2 mb-6 leading-normal bg-grey-lighter flex flex-no-shrink">
            <h3 className="pl-2 text-left m-auto align-middle text-grey-darkest w-full">
              Detector Gas
            </h3>
            <button
              onClick={() => refreshData()}
              className="bg-grey-light float-right hover:bg-grey text-grey-darkest font-bold py-3 px-3 rounded-full inline-flex items-center"
            >
              <svg
                className="fill-current w-6 h-6 flex-no-shrink"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z" />
              </svg>
            </button>
          </div>
          <div className="items-center flex justify-center p-4">
            <div>
              <div className="speedometr">
                <div className="scale low"></div>
                <div className="scale middle"></div>
                <div className="scale hight"></div>
                <div
                  className="arrow"
                  style={{ transform: `rotate(${angle}deg)` }}
                ></div>
              </div>
              <div className="text-grey-darkest text-center text-base font-semibold pt-4 pb-0">
                {data} ppm
              </div>
            </div>
          </div>

          <div className="py-4 px-8 text-sm font-medium text-grey-darker bg-grey-lighter leading-normal">
            <p>Detector Gas is calculated by Sensor</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
