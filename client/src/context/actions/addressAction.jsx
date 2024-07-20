import axios from "../../api/axios";

export const fetchRegion = async ({ setRegions }) => {
  try {
    const res = await axios.get("https://psgc.gitlab.io/api/regions/");
    setRegions(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchProviceByRegion = async ({ regionCode, setProvinces }) => {
  try {
    const res = await axios.get(`https://psgc.gitlab.io/api/regions/${regionCode}/provinces`);
    setProvinces(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCitiesByProvince = async ({ provinceCode, setCities }) => {
  try {
    const res = await axios.get(
      `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities`
    );
    setCities(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCitiesByRegion = async ({ regionCode, setCities }) => {
  try {
    const res = await axios.get(
      `https://psgc.gitlab.io/api/regions/${regionCode}/cities-municipalities`
    );
    setCities(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchBarangaysByCity = async ({ cityCode, setBarangays }) => {
  try {
    const res = await axios.get(
      `https://psgc.gitlab.io/api/cities-municipalities/${cityCode}/barangays`
    );
    setBarangays(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchBarangaysByProvince = async ({ provinceCode, setBarangays }) => {
  try {
    const res = await axios.get(`https://psgc.gitlab.io/api/provinces/${provinceCode}/barangays`);
    setBarangays(res.data);
  } catch (error) {
    console.log(error);
  }
};
