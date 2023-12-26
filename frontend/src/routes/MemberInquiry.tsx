import { useEffect, useState } from "react";
import InquiryForm from "../components/InquiryForm";
import InquiryResult from "../components/InquiryResult";
import ChevronLeftArrowSVG from "../components/svgs/ChevronLeftArrowSVG";
import ChevronRightArrowSVG from "../components/svgs/ChevronRightArrowSVG";
import { formData as data, inquiryData } from "../types";
import { handleInquiryAll, handleInquiryPagination } from "../axios/instance";
import { useErrorBoundary } from "react-error-boundary";

const dateConstructor = new Date();

const currentDateString = dateConstructor.toISOString().split("T")[0];

const prevYear = dateConstructor.getFullYear() - 1;

const baseDate = dateConstructor.setFullYear(prevYear);

const baseDateString = new Date(baseDate).toISOString().split("T")[0];

const initialValues = {
  id: "",
  phoneNo: "",
  username: "",
  joinFrom: baseDateString,
  joinTo: currentDateString,
};

export default function MemberInquiry() {
  const [data, setData] = useState<inquiryData[]>();

  const [formData, setFormData] = useState<data>(initialValues);

  const [currentPage, setCurrentPage] = useState(0);

  const [totalPage, setTotalPage] = useState(0);

  const [showExcelOptions, setShowExcel] = useState(false);

  const [showExcelDataOptions, setShowExcelData] = useState(false);

  const [excelOption, setExcelOption] = useState(0);

  const { showBoundary } = useErrorBoundary();

  const pageSize = 5;

  const inquire = async (values: data, page: number) => {
    return handleInquiryPagination(values, page, pageSize)
      .then((res) => res.data)
      .then((data) => {
        setData(data.userList);
        setTotalPage(data.pages);
      })
      .catch((error) => {
        console.log(error);
        showBoundary(error);
      });
  };

  const handleSubmit = (values: data) => {
    setFormData(values);
    inquire(values, 0);
  };

  const toExcel = async () => {
    let data = await downloadExcel();
    let csv = "";
    let headers = Object.keys(data[0]);
    csv += headers.join(",") + "\n";
    data.forEach((row: inquiryData) => {
      let data = headers.map((header) => JSON.stringify(row[header])).join(",");
      csv += data + "\n";
    });
    let blob = new Blob([csv], { type: "text/csv" });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadExcel = async () => {
    switch (excelOption) {
      case 0:
        return await handleInquiryAll(formData).then((res) => res.data);
      case 1:
        return await handleInquiryAll({
          id: "",
          username: "",
          phoneNo: "",
        })
          .then((res) => res.data)
          .catch(setError);
    }
  };

  useEffect(() => {
    inquire(initialValues, 0);
  }, []);

  const [error, setError] = useState<string[]>();

  return (
    <div className="mt-12 min-h-screen flex flex-col items-center">
      <p className="text-center font-bold text-3xl mb-10">Member Inquiry</p>
      <InquiryForm
        initialValues={formData}
        handleSubmit={handleSubmit}
        showExcel={() => setShowExcel((state) => !state)}
      />
      {error &&
        error.map((e) => (
          <p className="text-red-500" key={e}>
            {e}
          </p>
        ))}
      {data && data?.length !== 0 ? (
        <>
          <div className="flex flex-col items-center mb-1">
            <span className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {currentPage + 1 + " "}
              </span>
              of{" "}
              <span className="font-semibold text-gray-900">
                {totalPage + " "}
              </span>
              pages
            </span>
            <div className="inline-flex mt-2">
              <button
                className="flex items-center justify-center px-3 h-8 bg-gray-100 border border-r-0 border-1 border-gray-300 rounded-s hover:bg-gray-300 disabled:bg-gray-300 active:bg-gray-500"
                onClick={async () => {
                  setCurrentPage((state) => state - 1);
                  await inquire(formData, currentPage - 1);
                }}
                disabled={currentPage === 0}
              >
                <ChevronLeftArrowSVG className="w-5 h-5" />
              </button>
              <button
                className="flex items-center justify-center px-3 h-8 bg-gray-100 border border-1 border-gray-300 rounded-e hover:bg-gray-300 disabled:bg-gray-300 active:bg-gray-500"
                onClick={async () => {
                  setCurrentPage((state) => state + 1);
                  await inquire(formData, currentPage + 1);
                }}
                disabled={currentPage + 1 === totalPage}
              >
                <ChevronRightArrowSVG className="w-5 h-5" />
              </button>
            </div>
          </div>
          <InquiryResult data={data} />
          {showExcelOptions && (
            <div
              id="modalBackground"
              tabIndex={-1}
              onClick={(event) => {
                if ((event.target as HTMLElement).id === "modalBackground")
                  setShowExcel(false);
              }}
              className="bg-gray-600 bg-opacity-80 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Convert to Excel
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowExcel(false)}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="h-[5rem] grid grid-cols-2 md:grid-cols-3 p-4 md:p-5 space-y-4">
                    <span className="text-base leading-relaxed text-gray-500 mt-4 self-center">
                      Generate Excel using:
                    </span>
                    <div className="relative flex items-center">
                      <div
                        onClick={() => setShowExcelData((state) => !state)}
                        className="w-fit py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100"
                      >
                        {excelOption === 0 ? "Current Form" : "All Data"}
                      </div>
                      {showExcelDataOptions && (
                        <div className="absolute left-0 top-full z-10 bg-white divide-y divide-gray-100 w-44">
                          <ul className="text-sm text-gray-700 rounded-lg shadow">
                            <li>
                              <button
                                onClick={() => {
                                  setShowExcelData(false);
                                  setExcelOption(0);
                                }}
                                type="button"
                                className="inline-flex w-full h-full px-4 py-2 rounded-t-lg text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <div className="inline-flex items-center">
                                  Current Form
                                </div>
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => {
                                  setShowExcelData(false);
                                  setExcelOption(1);
                                }}
                                type="button"
                                className="inline-flex w-full px-4 py-2 rounded-b-lg text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <div className="inline-flex items-center">
                                  All Data
                                </div>
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-5 flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                    <button
                      type="button"
                      onClick={() => toExcel()}
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      To Excel
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowExcel(false)}
                      className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="font-bold text-5xl md:text-9xl text-gray-200 mt-5">
          No data
        </div>
      )}
    </div>
  );
}
