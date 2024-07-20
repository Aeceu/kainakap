const Home = () => {
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
        <div className="mockup-browser border bg-white w-3/4 ">
          <div className="mockup-browser-toolbar">
            <div className="input">https://pwd-kainakap.com</div>
          </div>
          <div className=" h-[1000px]  px-8 py-8 bg-base-200 flex flex-col gap-4">
            {/* <div className="flex items-centr gap-4">
              <img
                src={state.user?.qr_code.secure_url}
                alt="qr_code"
                className="w-[300px] h-[300px] col-span-2 rounded-md"
              />
              <div className="w-full">
                <ul className="grid grid-cols-4 gap-4  w-full">
                  <h1 className="w-full border-b col-span-4 font-bold text-2xl">
                    Personal Information
                  </h1>
                  <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                    First name: {state.user?.firstName}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Middle name: {state.user?.middleName}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Last name: {state.user?.lastName}
                  </li>
                  <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                    Email: {state.user?.email}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Age: {state.user?.age}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Gender: {state.user?.gender}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Birthdate: {state.user?.birthdate}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Birthplace: {state.user?.birthplace}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Religion: {state.user?.religion}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Citizenship: {state.user?.citizenship}
                  </li>
                  <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                    Civil Status: {state.user?.civil}
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full">
              <ul className="grid grid-cols-4 gap-4  w-full">
                <h1 className="w-full border-b col-span-4 font-bold text-2xl">
                  Contact Information
                </h1>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Phone no.: {state.user?.phone}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Landline: {state.user?.landline}
                </li>
              </ul>
            </div>
            <div className="w-full">
              <ul className="grid grid-cols-4 gap-4  w-full">
                <h1 className="w-full border-b col-span-4 font-bold text-2xl">
                  Address Information
                </h1>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  House no.: {state.user?.houseno}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Street: {state.user?.street}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Baranggay: {state.user?.baranggay}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  District: {state.user?.district}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  City: {state.user?.city}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Province: {state.user?.province}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Zip code: {state.user?.zipcode}
                </li>
              </ul>
            </div>
            <div className="w-full">
              <ul className="grid grid-cols-4 gap-4  w-full">
                <h1 className="w-full border-b col-span-4 font-bold text-2xl">
                  Education Information
                </h1>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Elementary school: {state.user?.elementary}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md ">
                  Elementary school attainment:{" "}
                  {state.user?.attain === "Select your school Attainment" ? "" : state.user?.attain}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Junior Highschool: {state.user?.highschool}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md ">
                  Junior Highschool attainment:{" "}
                  {state.user?.attain === "Select your school Attainment"
                    ? ""
                    : state.user?.attain1}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Senior Highschool: {state.user?.senior}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md ">
                  Senior Highschool attainment:{" "}
                  {state.user?.attain === "Select your school Attainment"
                    ? ""
                    : state.user?.attain2}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  College: {state.user?.college}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md ">
                  College attainment:{" "}
                  {state.user?.attain === "Select your school Attainment"
                    ? ""
                    : state.user?.attain3}
                </li>
              </ul>
            </div>
            <div className="w-full">
              <ul className="grid grid-cols-4 gap-4  w-full">
                <h1 className="w-full border-b col-span-4 font-bold text-2xl">
                  Employment Information
                </h1>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Current employment: {state.user?.employment}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Occupation: {state.user?.occupation}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Year's employed: {state.user?.yearEmploy}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Skill's attain: {state.user?.skill1}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Skill's attain: {state.user?.skill2}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Year's employed: {state.user?.yearUnemploy}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Skill's attain: {state.user?.skill1_1}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Skill's attain: {state.user?.skill2_1}
                </li>
              </ul>
            </div>
            <div className="w-full">
              <ul className="grid grid-cols-4 gap-4  w-full">
                <h1 className="w-full border-b col-span-4 font-bold text-2xl">
                  Medical Information
                </h1>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Blood: {state.user?.blood}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Height: {state.user?.height}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Weight: {state.user?.weight}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Disability: {state.user?.disability}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Visibility: {state.user?.visibility}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Made you disabled: {state.user?.made_disabled}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Curent status: {state.user?.status}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Device using: {state.user?.device}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Specific Device using: {state.user?.specificDevice}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Medicine using: {state.user?.medicine}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Specific medicine using: {state.user?.specificMedicine}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Others: {state.user?.others}
                </li>
              </ul>
            </div>
            <div className="w-full">
              <ul className="grid grid-cols-4 gap-4  w-full">
                <h1 className="w-full border-b col-span-4 font-bold text-2xl">
                  Person to contact incase of emergency
                </h1>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Lastname: {state.user?.emergencyPerson?.lastName}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Firstname: {state.user?.emergencyPerson?.firstName}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Middlename: {state.user?.emergencyPerson?.middleName}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Suffice: {state.user?.emergencyPerson?.suffix}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Age: {state.user?.emergencyPerson?.age}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Gender: {state.user?.emergencyPerson?.gender}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Relationship: {state.user?.emergencyPerson?.relationship}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Religion: {state.user?.emergencyPerson?.religion}
                </li>
                <h1 className="w-full border-b col-span-4 font-bold text-2xl">
                  Emergency Contact Information
                </h1>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Email: {state.user?.emergencyPerson?.email}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Phone no.: {state.user?.emergencyPerson?.phone}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Landline: {state.user?.emergencyPerson?.landline}
                </li>
                <h1 className="w-full border-b col-span-4 font-bold text-2xl">
                  Home/Permanent Address
                </h1>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  House no.: {state.user?.emergencyPerson?.houseno}
                </li>
                <li className="px-4 py-2 h-max col-span-2 w-full bg-white rounded-md shadow-md">
                  Street: {state.user?.emergencyPerson?.street}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Baranggay: {state.user?.emergencyPerson?.baranggay}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  District: {state.user?.emergencyPerson?.district}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  City: {state.user?.emergencyPerson?.city}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Province: {state.user?.emergencyPerson?.province}
                </li>
                <li className="px-4 py-2 h-max col-span-1 w-full bg-white rounded-md shadow-md">
                  Zip code: {state.user?.emergencyPerson?.zipcode}
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
