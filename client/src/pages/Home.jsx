import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
const Home = () => {
  const [showQR, setShowQR] = useState(true);
  const { user } = useContext(UserContext);
  return (
    <div className="w-full min-h-screen relative flex flex-col  ">
      <div className="z-0 filter blur-[120px] opacity-50  bg-blue-500  rounded-full w-[700px] h-[700px] absolute left-[30%]" />
      <div className="z-0 filter blur-[120px] opacity-50  bg-violet-500  rounded-full w-[700px] h-[700px] absolute left-[5%] top-[10%]" />
      <div className="z-0 filter blur-[120px] opacity-50  bg-indigo-500  rounded-full w-[700px] h-[700px] absolute left-[0%] top-[20%]" />
      <div className="z-0 filter blur-[120px] opacity-50  bg-fuchsia-500  rounded-full w-[700px] h-[700px] absolute left-[-10%] top-[30%]" />
      <div className="z-0 filter blur-[120px] opacity-50  bg-pink-500  rounded-full w-[700px] h-[700px] absolute right-[5%] top-[10%]" />
      <div className="z-0 filter blur-[120px] opacity-50  bg-orange-500  rounded-full w-[700px] h-[700px] absolute right-[0%] top-[20%]" />

      <div className="z-10 w-full shrink-0 h-[500px] flex flex-col  items-center justify-center">
        <h1 className="font-bold text-6xl ">THE EMPOWERING PWDS</h1>
        <p className="w-1/2 text-center mt-4">
          is a web-based system that aims to empower persons with disabilities (PWDs) by providing
          them with a secure and convenient way to authenticate account.
        </p>
      </div>
      <div className="z-10 w-full flex items-center justify-center p-8">
        <div className="mockup-browser border bg-white w-3/4  ">
          <div className="mockup-browser-toolbar">
            <div className="input">https://pwd-kainakap.com</div>
          </div>
          <div className=" h-full   px-8 py-8 bg-base-200 flex flex-col gap-4">
            <div className="flex items-centr gap-4">
              <span className="shrink-0 flex flex-col gap-2">
                <img
                  src={showQR ? user.qr_code.secure_url : user.userFiles.profilePhotoUrl}
                  alt="qr_code"
                  className="w-[300px] h-[300px] col-span-2 rounded-md"
                />
                <span className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setShowQR(true)}
                    className="btn btn-md text-white shadow-md btn-info flex items-center justify-center">
                    Show QR Code
                  </button>
                  <button
                    onClick={() => setShowQR(false)}
                    className="btn btn-md text-white shadow-md btn-success flex items-center justify-center">
                    Show Profile Photo
                  </button>
                </span>
              </span>
              <div className="w-full">
                <ul className="grid grid-cols-4 gap-4  w-full">
                  <h1 className="w-full border-b col-span-4 font-bold text-2xl">
                    Personal Information
                  </h1>
                  <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                    First name: {user.firstName}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Middle name: {user.middleName}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Last name: {user.lastName}
                  </li>
                  <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                    Email: {user.email}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Age: {user.age}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Gender: {user.gender}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Birthdate: {user.birthdate}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Birthplace: {user.birthplace}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Religion: {user.religion}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Citizenship: {user.citizenship}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Civil Status: {user.civil}
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full">
              <ul className="grid grid-cols-4 gap-4  w-full">
                <h1 className="w-full border-b col-span-4 font-extrabold tracking-widest text-2xl mt-2">
                  Contact Information
                </h1>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Phone no.: {user.phone}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Landline: {user.landline}
                </li>
              </ul>
            </div>
            <div className="w-full">
              <ul className="grid grid-cols-4 gap-4  w-full">
                <h1 className="w-full border-b col-span-4 font-extrabold tracking-widest text-2xl mt-2">
                  Address Information
                </h1>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  House no.: {user.houseno}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Street: {user.street}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Baranggay: {user.baranggay}
                </li>
                {user.city && (
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    City: {user.city}
                  </li>
                )}
                {user.province && (
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Province: {user.province}
                  </li>
                )}
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Region: {user.region}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Zip code: {user.zipcode}
                </li>
              </ul>
            </div>
            <div className="w-full">
              <ul className="grid grid-cols-4 gap-4  w-full">
                <h1 className="w-full border-b col-span-4 font-extrabold tracking-widest text-2xl mt-2">
                  Education Information
                </h1>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Elementary school: {user.elementary}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md ">
                  Elementary school attainment:{" "}
                  {user.attain === "Select your school Attainment" ? "" : user.attain}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Junior Highschool: {user.highschool}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md ">
                  Junior Highschool attainment:{" "}
                  {user.attain === "Select your school Attainment" ? "" : user.attain1}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Senior Highschool: {user.senior}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md ">
                  Senior Highschool attainment:{" "}
                  {user.attain === "Select your school Attainment" ? "" : user.attain2}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  College: {user.college}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md ">
                  College attainment:{" "}
                  {user.attain === "Select your school Attainment" ? "" : user.attain3}
                </li>
              </ul>
            </div>
            <div className="w-full">
              <ul className="grid grid-cols-4 gap-4  w-full">
                <h1 className="w-full border-b col-span-4 font-extrabold tracking-widest text-2xl mt-2">
                  Employment Information
                </h1>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Current employment: {user.employment}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Occupation: {user.occupation}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Year's employed: {user.yearEmploy}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Skill's attain: {user.skill1}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Skill's attain: {user.skill2}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Year's employed: {user.yearUnemploy}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Skill's attain: {user.skill1_1}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Skill's attain: {user.skill2_1}
                </li>
              </ul>
            </div>
            <div className="w-full">
              <ul className="grid grid-cols-4 gap-4  w-full">
                <h1 className="w-full border-b col-span-4 font-extrabold tracking-widest text-2xl mt-2">
                  Medical Information
                </h1>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Blood: {user.blood}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Height: {user.height}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Weight: {user.weight}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Disability: {user.disability}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Visibility: {user.visibility}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Made you disabled: {user.made_disabled}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Curent status: {user.status}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Device using: {user.device}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Specific Device using: {user.specificDevice}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Medicine using: {user.medicine}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Specific medicine using: {user.specificMedicine}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Others: {user.others}
                </li>
              </ul>
            </div>

            <div className="w-full">
              <ul className="grid grid-cols-4 gap-4  w-full">
                <h1 className="w-full border-b col-span-4 font-extrabold tracking-widest text-2xl mt-2">
                  Person to contact incase of emergency
                </h1>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Lastname: {user.emergencyPerson?.lastName}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Firstname: {user.emergencyPerson?.firstName}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Middlename: {user.emergencyPerson?.middleName}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Suffice: {user.emergencyPerson?.suffix}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Age: {user.emergencyPerson?.age}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Gender: {user.emergencyPerson?.gender}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Relationship: {user.emergencyPerson?.relationship}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Religion: {user.emergencyPerson?.religion}
                </li>
                <h1 className="w-full border-b col-span-4 font-extrabold tracking-widest text-2xl mt-2">
                  Emergency Contact Information
                </h1>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Email: {user.emergencyPerson?.email}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Phone no.: {user.emergencyPerson?.phone}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Landline: {user.emergencyPerson?.landline}
                </li>
                <h1 className="w-full border-b col-span-4 font-extrabold tracking-widest text-2xl mt-2">
                  Home/Permanent Address
                </h1>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  House no.: {user.emergencyPerson?.houseno}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Street: {user.emergencyPerson?.street}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Baranggay: {user.emergencyPerson?.baranggay}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  District: {user.emergencyPerson?.district}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  City: {user.emergencyPerson?.city}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Province: {user.emergencyPerson?.province}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Zip code: {user.emergencyPerson?.zipcode}
                </li>
              </ul>
            </div>

            <div className="w-full">
              <ul className="grid grid-cols-4 gap-4 w-full">
                <h1 className="w-full border-b col-span-4 font-extrabold tracking-widest text-2xl mt-2">
                  User Documents
                </h1>
                <span>
                  <h1 className="font-extrabold text-lg">Valid ID</h1>
                  <img
                    src={user.userFiles.validIdUrl}
                    alt={user.userFiles.validIdUrl}
                    className="rounded-md  w-[300px] h-[150px] object-cover shadow-md"
                  />
                </span>
                <span>
                  <h1 className="font-extrabold text-lg">PWD ID</h1>
                  <img
                    src={user.userFiles.pwdIdUrl}
                    alt={user.userFiles.pwdIdUrl}
                    className="rounded-md  w-[300px] h-[150px] object-cover shadow-md"
                  />
                </span>
                <span>
                  <h1 className="font-extrabold text-lg">Brgy. Residence Certificate</h1>
                  <img
                    src={user.userFiles.brgyResidenceCertificateUrl}
                    alt={user.userFiles.brgyResidenceCertificateUrl}
                    className="rounded-md  w-[300px] h-[150px] object-cover shadow-md"
                  />
                </span>
                <span>
                  <h1 className="font-extrabold text-lg">Resume</h1>
                  <img
                    src={user.userFiles.resumeUrl}
                    alt={user.userFiles.resumeUrl}
                    className="rounded-md  w-[300px] h-[150px] object-cover shadow-md"
                  />
                </span>
                <span>
                  <h1 className="font-extrabold text-lg">Medical Certificate</h1>
                  <img
                    src={user.userFiles.medicalCertificateUrl}
                    alt={user.userFiles.medicalCertificateUrl}
                    className="rounded-md  w-[300px] h-[150px] object-cover shadow-md"
                  />
                </span>
                <span>
                  <h1 className="font-extrabold text-lg">Proof of disability</h1>
                  <img
                    src={user.userFiles.proofOfDisabilityUrl}
                    alt={user.userFiles.proofOfDisabilityUrl}
                    className="rounded-md  w-[300px] h-[150px] object-cover shadow-md"
                  />
                </span>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
