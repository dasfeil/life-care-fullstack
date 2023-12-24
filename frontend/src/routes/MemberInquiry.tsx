import { useEffect, useState } from "react";
import InquiryForm from "../components/InquiryForm";
import InquiryResult from "../components/InquiryResult";
import ChevronLeftArrowSVG from "../components/svgs/ChevronLeftArrowSVG";
import ChevronRightArrowSVG from "../components/svgs/ChevronRightArrowSVG";
import { formData as data, inquiryData } from "../types";
import { handleInquiry } from "../axios/instance";
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

  const { showBoundary } = useErrorBoundary();

  const pageSize = 5;

  const inquire = async (values: data, page: number) => {
    return handleInquiry(values, page, pageSize)
      .then((res) => res.data)
      .then((data) => {
        setData(data.userList);
        setTotalPage(data.pages);
      })
      .catch((error) => {
        showBoundary(error);
      });
  };

  const handleSubmit = (values: data) => {
    setFormData(values);
    inquire(values, 0);
  };

  const toExcel = () => {};

  useEffect(() => {
    inquire(initialValues, 0);
  }, []);

  return (
    <div className="mt-12 min-h-screen flex flex-col items-center">
      <p className="text-center font-bold text-3xl mb-10">Member Inquiry</p>
      <InquiryForm
        initialValues={formData}
        handleSubmit={handleSubmit}
        toExcel={toExcel}
      />
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
        </>
      ) : (
        <div className="font-bold text-5xl md:text-9xl text-gray-200 mt-5">No data</div>
      )}
    </div>
  );
}
