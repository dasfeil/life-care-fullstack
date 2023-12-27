import { InquiryData as data } from "../types";

type Props = {
  data: data[];
};

export default function InquiryResult({ data }: Props) {
  return (
    <>
      <div className="w-full md:w-[90%]">
        <div className="border border-1 mx-1 rounded-md">
          <div className="relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Membership Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Join date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((data) => (
                    <tr
                      className="odd:bg-white even:bg-gray-50 border-b"
                      key={data.userNo}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {data.userNo}
                      </th>
                      <td className="px-6 py-4">{data.id}</td>
                      <td className="px-6 py-4">{data.username}</td>
                      <td className="px-6 py-4">{data.phoneNo}</td>
                      <td className="px-6 py-4">{data.email}</td>
                      <td className="px-6 py-4">{data.joinDate}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
