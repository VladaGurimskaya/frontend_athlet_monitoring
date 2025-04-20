# Api.BiometricsApi

All URIs are relative to *http://localhost:8000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**biometricsPost**](BiometricsApi.md#biometricsPost) | **POST** /biometrics | Ввод биометрических данных спортсменом



## biometricsPost

> biometricsPost(biometricInput)

Ввод биометрических данных спортсменом

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.BiometricsApi();
let biometricInput = new Api.BiometricInput(); // BiometricInput | 
apiInstance.biometricsPost(biometricInput, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **biometricInput** | [**BiometricInput**](BiometricInput.md)|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

