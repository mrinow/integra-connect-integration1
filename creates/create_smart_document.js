const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

module.exports = {
  display: {
    description: "Creates a smart document in Integra Connect",
    hidden: false,
    label: "Create Smart Document",
  },
  key: "create_smart_document",
  noun: "Document",
  operation: {
    inputFields: [
      {
        key: "document_name",
        label: "Document Name",
        type: "string",
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: "document_type",
        label: "Document Type",
        type: "string",
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: "metadata",
        label: "Document Metadata",
        type: "text",
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: "file",
        label: "File",
        type: "file",
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    perform: (z, bundle) => {
      const filePath = path.resolve(__dirname, "../../tester.pdf"); // Adjust the path according to your actual file location
      const form = new FormData();

      form.append("document_name", bundle.inputData.document_name);
      form.append("document_type", bundle.inputData.document_type);
      form.append("metadata", bundle.inputData.metadata);
      form.append("file", fs.createReadStream(filePath));
      const requestOptions = {
        url: "https://sb-container-dev.orangeflower-6613dbff.westus2.azurecontainerapps.io/document/register",
        method: "POST",
        body: form,
        headers: {
          // "Content-Type": "multipart/form-data",
          Accept: "*/*",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpbm93NEB5YWhvby5jb20iLCJ1c2VyaWQiOjgsInJvbGUiOiJhZG1pbiIsIm9yZ2FuaXphdGlvbklkIjpudWxsLCJpYXQiOjE3MjMxMjE0ODgsImV4cCI6MTcyMzEyNzQ4OH0.9LguZhfHjrV2z61S8hcKNnkkIQ-Ta0xZuN3y6LTeSBg",
          ...form.getHeaders(),
        },
      };

      z.console.log("Request Options:", requestOptions);

      return z.request(requestOptions).then((response) => {
        z.console.log("Response:", response);
        return z.JSON.parse(response.content);
      });
    },
  },
};
