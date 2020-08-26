exports.resolvers = {
  Query: {
    getAllForms: async (root, { id }, { Form }) => {
      const allForms = await Form.find();
      return allForms;
    },
    getForm: async (root, { id }, { Form }) => {
      console.log("get Form api called id", id);
      const getForm = await Form.findById(id);
      if (!getForm) {
        throw new Error("Data not available");
      }
      console.log("getForm", getForm);
      return getForm;
    },
    getAllFormResponses: async (root, { formId }, { Form, FormResponse }) => {
      const getForm = await Form.findById(formId);
      if (!getForm) {
        throw new Error("Data not available");
      }
      const getFormResponses = await FormResponse.find({ formId });
      if (!getFormResponses) {
        throw new Error("Data not available");
      }
      console.log("getForm", getForm);
      getFormResponses.formData = getForm;
      return getFormResponses;
    },
    getFormResponse: async (root, { id }, { Form, FormResponse }) => {
      const getFormResponses = await FormResponse.findById(id);
      if (!getFormResponses) {
        throw new Error("Data not available");
      }
      const getForm = await Form.findById(getFormResponses.formId);
      if (!getForm) {
        throw new Error("Data not available");
      }
      console.log("getForm", getForm);
      getFormResponses.formData = getForm;
      return getFormResponses;
    },
  },
  Mutation: {
    createForm: async (root, { formData }, { Form }) => {
      console.log("create form called", formData);
      const form = await new Form({ formData }).save();
      if (!form) {
        throw new Error("Some issue saving form");
      }
      return form;
    },
    addFormResponse: async (
      root,
      { formId, formResponseData },
      { FormResponse }
    ) => {
      console.log("addFormResponse", formId, formResponseData);
      const formResponse = await new FormResponse({
        formId,
        formResponseData,
      }).save();
      if (!formResponse) {
        throw new Error("Some issue saving form response");
      }
      return formResponse;
    },
  },
};
