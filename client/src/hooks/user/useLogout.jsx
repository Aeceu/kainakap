import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "../../api/axios";

export const useUserLogout = () => {
  const navigate = useNavigate();
  const { setUser, setToken, setUserId, setNewUser, setFiles, setidData, setRegistrationStatus } =
    useContext(UserContext);
  const logout = async () => {
    try {
      const res = await axios.get("/user/logout", {
        withCredentials: true,
      });
      setUser(null);
      setToken(null);
      setUserId("");
      setNewUser({
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        age: "",
        birthdate: null,
        birthplace: "",
        gender: "",
        religion: "",
        citizenship: "",
        civil: "",
        email: "",
        phone: "",
        landline: "",
        password: "",

        region: "",
        province: undefined,
        city: undefined,
        baranggay: "",
        houseno: "",
        street: "",
        zipcode: "",

        emergencyPerson: {
          firstName: "",
          middleName: "",
          lastName: "",
          suffix: "",
          age: "",
          gender: "",
          relationship: "",
          religion: "",
          email: "",
          phone: "",
          landline: "",
          region: "",
          province: undefined,
          city: undefined,
          baranggay: "",
          houseno: "",
          street: "",
          zipcode: "",
        },

        elementary: undefined,
        attain: undefined,
        highschool: undefined,
        attain1: undefined,
        senior: undefined,
        attain2: undefined,
        college: undefined,
        attain3: undefined,

        employment: undefined,
        occupation: undefined,
        yearEmploy: undefined,
        skill1: undefined,
        skill2: undefined,
        yearUnemploy: undefined,
        skill3: undefined,
        skill4: undefined,

        blood: undefined,
        height: "",
        weight: "",
        visibility: undefined,
        disability: undefined,
        made_disabled: undefined,
        status: undefined,
        device: undefined,
        specificDevice: undefined,
        medicine: undefined,
        specificMedicine: "",
        others: "",
      });
      setFiles({
        valid_id: "",
        profilePhoto: "",
        resume: "",
        pwd_id: "",
        baranggay_residence_certificate: "",
        medical_certificate: "",
        proof_of_disability: "",
      });
      setidData("");
      setRegistrationStatus("");
      console.log(res.data);
      navigate("/auth/user/login");
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};
