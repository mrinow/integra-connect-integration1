const zapier = require("zapier-platform-core");
const path = require("path");

// Use this to make test calls into your app:
const App = require("../../index");
const appTester = zapier.createAppTester(App);

// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("creates.create_smart_document", () => {
  it("should run", async () => {
    const bundle = {
      authData: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpbm93NEB5YWhvby5jb20iLCJ1c2VyaWQiOjgsInJvbGUiOiJhZG1pbiIsIm9yZ2FuaXphdGlvbklkIjpudWxsLCJpYXQiOjE3MjMxMjE0ODgsImV4cCI6MTcyMzEyNzQ4OH0.9LguZhfHjrV2z61S8hcKNnkkIQ-Ta0xZuN3y6LTeSBg",
      },
      inputData: {
        document_name: "Test Document",
        document_type: "Type A",
        metadata: '{"integra_id":"f1b7b3d2-bd67-4461-b86a-687c02cc8c23"}',
        file: path.resolve(__dirname, "../../tester.pdf"),
      },
    };

    // console.log("Bundle:", bundle); // Debug log to check bundle content

    const results = await appTester(
      App.creates["create_smart_document"].operation.perform,
      bundle
    );

    console.log("Results:", results); // Debug log to check results

    expect(results).toBeDefined();
    // TODO: add more assertions
  });
});
