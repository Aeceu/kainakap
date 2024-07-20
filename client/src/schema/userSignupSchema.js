import { z } from "zod";

export const stepOneSchema = z
  .object({
    firstName: z.string().min(1, "Required"),
    middleName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    suffix: z.string().optional(),
    age: z.string().min(1, "Required"),
    birthdate: z.string().min(1, "Required"),
    birthplace: z.string().min(1, "Required"),
    gender: z.enum(["Male", "Female", "Others"], { message: "Required" }),
    religion: z.enum(
      [
        "Roman Catholic",
        "Catholic",
        "Iglesia ni Cristo",
        "Born again",
        "Dating Daan",
        "Baptist",
        "Islam",
      ],
      { message: "Required" }
    ),
    citizenship: z.string().min(1, "Required"),
    civil: z.enum(["Single", "Married", "Legally Separated", "Widowed", "Solo Parent"], {
      message: "Required",
    }),
    email: z.string().email().min(1, "Required"),
    phone: z.string().min(1, "Required"),
    landline: z.string().optional(),
    password: z
      .string()
      .min(8, "Password should atleast 8 characters!")
      .max(20, "Password should less than 20 characters!"),
    repassword: z
      .string()
      .min(8, "Password should atleast 8 characters!")
      .max(20, "Password should less than 20 characters!"),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Password doesn't match!",
    path: ["repassword"],
  });

export const stepTwoSchema = z.object({
  region: z.string().min(2, "Select your region"),
  province: z.string().min(2, "Select your province").optional(),
  city: z.string().min(2, "Select your city").optional(),
  baranggay: z.string().min(2, "Select your baranggay"),
  houseno: z.string().min(1, "type your houseno"),
  street: z.string().min(1, "type your street"),
  zipcode: z.string().min(1, "Select your zipcode"),
});

export const stepThreeSchema = z.object({
  firstName: z.string().min(1, "Required"),
  middleName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  suffix: z.string().optional(),
  age: z.string().min(1, "Required"),
  gender: z.enum(["Male", "Female", "Others"], { message: "Required" }),
  relationship: z.string().min(1, "Required"),
  religion: z.enum(
    [
      "Roman Catholic",
      "Catholic",
      "Iglesia ni Cristo",
      "Born again",
      "Dating Daan",
      "Baptist",
      "Islam",
    ],
    { message: "Required" }
  ),

  email: z.string().email().min(1, "Required"),
  phone: z.string().min(1, "Required"),
  landline: z.string().optional(),

  region: z.string().min(2, "Select your region"),
  province: z.string().min(2, "Select your province").optional(),
  city: z.string().min(2, "Select your city").optional(),
  baranggay: z.string().min(2, "Select your baranggay"),
  houseno: z.string().min(1, "type your houseno"),
  street: z.string().min(1, "type your street"),
  zipcode: z.string().min(1, "Select your zipcode"),
});

export const stepFourSchema = z.object({
  elementary: z.string().optional(),
  attain: z.string().optional(),
  highschool: z.string().optional(),
  attain1: z.string().optional(),
  senior: z.string().optional(),
  attain2: z.string().optional(),
  college: z.string().optional(),
  attain3: z.string().optional(),
});

export const stepFiveSchema = z
  .object({
    employment: z.enum(["Student", "Employed", "Unemployed"], { message: "Required" }),
    occupation: z.string().optional(),
    yearEmploy: z.string().optional(),
    skill1: z.string().optional(),
    skill2: z.string().optional(),
    yearUnemploy: z.string().optional(),
    skill3: z.string().optional(),
    skill4: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.employment === "Employed") {
        return data.yearEmploy && data.skill1 && data.skill2;
      }
      if (data.employment === "Unemployed") {
        return data.yearUnemploy && data.skill3 && data.skill4;
      }
      if (data.employment === "Student") {
        return true;
      }
      return false;
    },
    {
      message: "Please provide the necessary fields based on employment status",
      path: ["employment"],
    }
  );

export const stepSixSchema = z.object({
  blood: z.enum(["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"], { message: "Required" }),
  height: z.string().min(2, "Required"),
  weight: z.string().min(2, "Required"),
  visibility: z.enum(["Visible", "Not Visible"], { message: "Required" }),
  disability: z.string().min(1, "Required"),
  made_disabled: z.enum(["Inborn", "Sickness", "Accident"], { message: "Required" }),
  status: z.enum(["Good Condition", "Required Assistance", "Confine to bed"], {
    message: "Required",
  }),
  device: z.string().min(2, "Required"),
  specificDevice: z.string().optional(),
  medicine: z.string().min(2, "Required"),
  specificMedicine: z.string().optional(),
  others: z.string().optional(),
});

export const userSignIn = z.object({
  email: z.string().email("Enter your email address."),
  password: z
    .string({ message: "Enter your password." })
    .min(6, "Password should atleast 6 characters.")
    .max(20, "Password should less than 20 characters."),
});
