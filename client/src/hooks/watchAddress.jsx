import { useEffect } from "react";
import getZipCode from "./getZipCode";
import {
  fetchRegion,
  fetchBarangaysByCity,
  fetchBarangaysByProvince,
  fetchCitiesByProvince,
  fetchCitiesByRegion,
  fetchProviceByRegion,
} from "../context/actions/addressAction";

const WatchAddress = ({
  watchCity,
  watchProvince,
  watchRegion,
  selectedBaranggay,
  selectedCity,
  setBarangays,
  setCities,
  setProvinces,
  zipCode,
  setZipCode,
  setRegions,
}) => {
  useEffect(() => {
    fetchRegion({ setRegions });
  }, []);
  useEffect(() => {
    if (watchRegion) {
      fetchProviceByRegion({ regionCode: watchRegion, setProvinces });
      fetchCitiesByRegion({ regionCode: watchRegion, setCities });
    }
  }, [watchRegion]);

  useEffect(() => {
    if (watchProvince) {
      fetchCitiesByProvince({ provinceCode: watchProvince, setCities });
    }
  }, [watchProvince]);

  useEffect(() => {
    if (watchCity) {
      fetchBarangaysByCity({ cityCode: watchCity, setBarangays });
    } else if (watchProvince) {
      fetchBarangaysByProvince({ provinceCode: watchProvince, setBarangays });
    }
  }, [watchCity, watchProvince]);

  useEffect(() => {
    if (!zipCode) {
      let foundZipCode = getZipCode.reverse(selectedBaranggay);
      if (!foundZipCode) {
        const trimmedCity = selectedCity.split("City of ");
        if (trimmedCity) {
          foundZipCode = getZipCode.reverse(trimmedCity[1]);
        } else {
          foundZipCode = getZipCode.reverse(selectedCity);
        }
      }

      if (foundZipCode) {
        setZipCode(foundZipCode);
      } else {
        setZipCode("");
      }
    }
  }, [zipCode, selectedCity, selectedBaranggay]);
};
export default WatchAddress;
