const test = async (z, bundle) => {
  const options = {
    url: "https://sb-container-dev.orangeflower-6613dbff.westus2.azurecontainerapps.io/auth/login/",
    method: "POST",
    headers: {},
    params: {},
    body: {
      username: "rinow4@yahoo.com",
      password: "dfadfsfdfas",
    },
    removeMissingValuesFrom: {
      body: false,
      params: false,
    },
  };

  return z.request(options).then((response) => {
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    //  return results;
    //  authToken: results.authToken
    bundle.authData.auth_token = results.authToken;
    return {
      authToken: results.authToken,
    };
  });
};

module.exports = {
  type: "basic",
  test: test,
  fields: [
    {
      computed: false,
      key: "username",
      required: true,
      label: "Connect Username",
      type: "string",
    },
    {
      computed: false,
      key: "password",
      required: true,
      label: "Connect Password",
      type: "password",
    },
    {
      computed: true,
      key: "auth_token",
      required: false,
      label: "Authorization Token",
      type: "string",
    },
  ],
  basicConfig: {},
};
