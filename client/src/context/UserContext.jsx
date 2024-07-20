import { createContext, useState } from "react";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [newUser, setNewUser] = useState({
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

  return (
    <UserContext.Provider
      value={{ userId, setUserId, user, setUser, token, setToken, newUser, setNewUser }}>
      {children}
    </UserContext.Provider>
  );
};
