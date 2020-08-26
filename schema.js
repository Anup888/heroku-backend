exports.typeDefs = `


type Form{
    _id:ID
    formData:String
    createdDate:String
}
type FormResponse{
    _id:ID
    formData:Form
    createdDate:String
    formResponseData:String
    formId:ID
}

type Query{
    getAllForms:[Form]
    getForm(id:ID):Form
    getAllFormResponses(formId:ID):[FormResponse]
    getFormResponse(id:ID):FormResponse
}

type Mutation{
    createForm(formData:String!):Form
    addFormResponse(formResponseData:String,formId:ID):FormResponse
}
`;
