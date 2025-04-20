# Api.TrainingApi

All URIs are relative to *http://localhost:8000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**trainingPlansItemsItemIdDelete**](TrainingApi.md#trainingPlansItemsItemIdDelete) | **DELETE** /training-plans/items/{item_id} | Удаление пункта плана
[**trainingPlansItemsItemIdOverridePost**](TrainingApi.md#trainingPlansItemsItemIdOverridePost) | **POST** /training-plans/items/{item_id}/override | Изменение пункта плана для конкретного спортсмена
[**trainingPlansPlanIdAssignPost**](TrainingApi.md#trainingPlansPlanIdAssignPost) | **POST** /training-plans/{plan_id}/assign | Назначить план спортсменам
[**trainingPlansPlanIdItemsPost**](TrainingApi.md#trainingPlansPlanIdItemsPost) | **POST** /training-plans/{plan_id}/items | Добавление пункта в план
[**trainingPlansPost**](TrainingApi.md#trainingPlansPost) | **POST** /training-plans | Создание тренировочного плана



## trainingPlansItemsItemIdDelete

> trainingPlansItemsItemIdDelete(itemId)

Удаление пункта плана

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TrainingApi();
let itemId = 56; // Number | 
apiInstance.trainingPlansItemsItemIdDelete(itemId, (error, data, response) => {
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
 **itemId** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## trainingPlansItemsItemIdOverridePost

> trainingPlansItemsItemIdOverridePost(itemId, trainingPlansItemsItemIdOverridePostRequest)

Изменение пункта плана для конкретного спортсмена

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TrainingApi();
let itemId = 56; // Number | 
let trainingPlansItemsItemIdOverridePostRequest = {"athlete_id":101,"custom_value":"2:00","custom_notes":"Увеличена длительность по состоянию"}; // TrainingPlansItemsItemIdOverridePostRequest | 
apiInstance.trainingPlansItemsItemIdOverridePost(itemId, trainingPlansItemsItemIdOverridePostRequest, (error, data, response) => {
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
 **itemId** | **Number**|  | 
 **trainingPlansItemsItemIdOverridePostRequest** | [**TrainingPlansItemsItemIdOverridePostRequest**](TrainingPlansItemsItemIdOverridePostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## trainingPlansPlanIdAssignPost

> trainingPlansPlanIdAssignPost(planId, trainingPlansPlanIdAssignPostRequest)

Назначить план спортсменам

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TrainingApi();
let planId = 56; // Number | 
let trainingPlansPlanIdAssignPostRequest = {"athlete_ids":[101,102,103],"start_date":"2025-04-22"}; // TrainingPlansPlanIdAssignPostRequest | 
apiInstance.trainingPlansPlanIdAssignPost(planId, trainingPlansPlanIdAssignPostRequest, (error, data, response) => {
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
 **planId** | **Number**|  | 
 **trainingPlansPlanIdAssignPostRequest** | [**TrainingPlansPlanIdAssignPostRequest**](TrainingPlansPlanIdAssignPostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## trainingPlansPlanIdItemsPost

> trainingPlansPlanIdItemsPost(planId, trainingPlansPlanIdItemsPostRequest)

Добавление пункта в план

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TrainingApi();
let planId = 56; // Number | 
let trainingPlansPlanIdItemsPostRequest = {"session_date":"2025-04-18","session_type_id":2,"format_type_id":1,"value":"01:30","notes":"Лёгкий кросс по парку"}; // TrainingPlansPlanIdItemsPostRequest | 
apiInstance.trainingPlansPlanIdItemsPost(planId, trainingPlansPlanIdItemsPostRequest, (error, data, response) => {
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
 **planId** | **Number**|  | 
 **trainingPlansPlanIdItemsPostRequest** | [**TrainingPlansPlanIdItemsPostRequest**](TrainingPlansPlanIdItemsPostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## trainingPlansPost

> trainingPlansPost(trainingPlansPostRequest)

Создание тренировочного плана

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TrainingApi();
let trainingPlansPostRequest = {"name":"Подготовка к сбору","description":"Базовый цикл подготовки"}; // TrainingPlansPostRequest | 
apiInstance.trainingPlansPost(trainingPlansPostRequest, (error, data, response) => {
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
 **trainingPlansPostRequest** | [**TrainingPlansPostRequest**](TrainingPlansPostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

