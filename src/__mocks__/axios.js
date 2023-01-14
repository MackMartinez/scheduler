// import mockAxios from "jest-mock-axios";

export default { 
  defaults: { baseURL: ""},
  get: jest.fn(() => {
    return Promise.resolve({  
      status: 200,
      statusText: "OK",
      data: []
    });
  })
};