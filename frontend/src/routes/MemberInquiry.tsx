import InquiryForm from "../components/InquiryForm";

export default function MemberInquiry() {
  
  return (
    <div className="mt-12 min-h-screen flex flex-col items-center">
      <p className="text-center font-bold text-3xl mb-10">Member Inquiry</p>
      <InquiryForm/>
    </div>
  );
}
