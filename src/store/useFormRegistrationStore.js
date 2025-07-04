import { produce } from "immer";
import { create } from "zustand";

const initialFormData = {
  name: "",
  weights: "",
  contact_number: "",
  contact_number_ioe: "",
  agreements: [],
};

const useFormRegistrationStore = create((set) => ({
  formData: { ...initialFormData },
  setField: (field, value) =>
    set(
      produce((state) => {
        state.formData[field] = value;
      })
    ),
  setAgreements: (agreements) =>
    set(
      produce((state) => {
        state.formData.agreements = agreements;
      })
    ),
  resetForm: () =>
    set(
      produce((state) => {
        state.formData = { ...initialFormData };
      })
    ),
}));

export default useFormRegistrationStore;
