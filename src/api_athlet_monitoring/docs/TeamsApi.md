# Api.TeamsApi

All URIs are relative to *http://localhost:8000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**teamsJoinPost**](TeamsApi.md#teamsJoinPost) | **POST** /teams/join | Запрос спортсмена на вступление в команду
[**teamsJoinRequestIdApprovePost**](TeamsApi.md#teamsJoinRequestIdApprovePost) | **POST** /teams/join/{request_id}/approve | Одобрение заявки на вступление в команду
[**teamsJoinRequestIdRejectPost**](TeamsApi.md#teamsJoinRequestIdRejectPost) | **POST** /teams/join/{request_id}/reject | Отклонение заявки на вступление в команду



## teamsJoinPost

> teamsJoinPost(teamsJoinPostRequest)

Запрос спортсмена на вступление в команду

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TeamsApi();
let teamsJoinPostRequest = {"team_id":42}; // TeamsJoinPostRequest | 
apiInstance.teamsJoinPost(teamsJoinPostRequest, (error, data, response) => {
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
 **teamsJoinPostRequest** | [**TeamsJoinPostRequest**](TeamsJoinPostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## teamsJoinRequestIdApprovePost

> teamsJoinRequestIdApprovePost(requestId)

Одобрение заявки на вступление в команду

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TeamsApi();
let requestId = 56; // Number | 
apiInstance.teamsJoinRequestIdApprovePost(requestId, (error, data, response) => {
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
 **requestId** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## teamsJoinRequestIdRejectPost

> teamsJoinRequestIdRejectPost(requestId)

Отклонение заявки на вступление в команду

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TeamsApi();
let requestId = 56; // Number | 
apiInstance.teamsJoinRequestIdRejectPost(requestId, (error, data, response) => {
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
 **requestId** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

