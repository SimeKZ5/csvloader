import { useQuery } from "@tanstack/react-query";
import { getLicensesApi } from "../api/getLicences";

interface LicenceData {
  id: string;
  name: string;
  licenseUsed: boolean;
  machineId: string;
  date: Date;
  license: string;
}

const useGetLicence = () => {
  const { data: licenceData, isLoading: licenceDataLoading } = useQuery<
    LicenceData[],
    Error
  >({
    queryKey: ["licenceData"],
    queryFn: () => getLicensesApi(),
  });

  return { licenceData, licenceDataLoading };
};

export default useGetLicence;
