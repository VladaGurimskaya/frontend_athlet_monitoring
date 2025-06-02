# Api.TeamsApi

All URIs are relative to *http://localhost:8000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**teamAthleteRemovePost**](TeamsApi.md#teamAthleteRemovePost) | **POST** /team/athlete-remove | Удаление спортсмена из команды
[**teamAthleteTeamStatusGet**](TeamsApi.md#teamAthleteTeamStatusGet) | **GET** /team/athlete-team-status | Заявка на вступление в команду
[**teamsAllAthletesGet**](TeamsApi.md#teamsAllAthletesGet) | **GET** /teams/all-athletes | Список всех спортсменов
[**teamsAthletesPost**](TeamsApi.md#teamsAthletesPost) | **POST** /teams/athletes | Список спортсменов в команде
[**teamsCoachesPost**](TeamsApi.md#teamsCoachesPost) | **POST** /teams/coaches | Список тренеров в команде
[**teamsCreatePost**](TeamsApi.md#teamsCreatePost) | **POST** /teams/create | Создание команды
[**teamsGet**](TeamsApi.md#teamsGet) | **GET** /teams | Список команд
[**teamsJoinPost**](TeamsApi.md#teamsJoinPost) | **POST** /teams/join | Запрос спортсмена на вступление в команду
[**teamsJoinRequestIdApprovePost**](TeamsApi.md#teamsJoinRequestIdApprovePost) | **POST** /teams/join/{request_id}/approve | Одобрение заявки на вступление в команду
[**teamsJoinRequestIdRejectPost**](TeamsApi.md#teamsJoinRequestIdRejectPost) | **POST** /teams/join/{request_id}/reject | Отклонение заявки на вступление в команду
[**teamsJoinsListGet**](TeamsApi.md#teamsJoinsListGet) | **GET** /teams/joins-list | Список заявок на вступление в команды
[**teamsJoinsListTeamIdGet**](TeamsApi.md#teamsJoinsListTeamIdGet) | **GET** /teams/joins-list/{team_id} | Список заявок на вступление в команду



## teamAthleteRemovePost

> teamAthleteRemovePost(athleteProfileRequest)

Удаление спортсмена из команды

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TeamsApi();
let athleteProfileRequest = new Api.AthleteProfileRequest(); // AthleteProfileRequest | 
apiInstance.teamAthleteRemovePost(athleteProfileRequest, (error, data, response) => {
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
 **athleteProfileRequest** | [**AthleteProfileRequest**](AthleteProfileRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## teamAthleteTeamStatusGet

> TeamAthleteStatusResponse teamAthleteTeamStatusGet()

Заявка на вступление в команду

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TeamsApi();
apiInstance.teamAthleteTeamStatusGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**TeamAthleteStatusResponse**](TeamAthleteStatusResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## teamsAllAthletesGet

> AllAthletesResponse teamsAllAthletesGet()

Список всех спортсменов

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TeamsApi();
apiInstance.teamsAllAthletesGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**AllAthletesResponse**](AllAthletesResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## teamsAthletesPost

> TeamGetAthletesResponse teamsAthletesPost(teamRequest)

Список спортсменов в команде

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TeamsApi();
let teamRequest = new Api.TeamRequest(); // TeamRequest | 
apiInstance.teamsAthletesPost(teamRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **teamRequest** | [**TeamRequest**](TeamRequest.md)|  | 

### Return type

[**TeamGetAthletesResponse**](TeamGetAthletesResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## teamsCoachesPost

> TeamGetCoachesResponse teamsCoachesPost(teamRequest)

Список тренеров в команде

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TeamsApi();
let teamRequest = new Api.TeamRequest(); // TeamRequest | 
apiInstance.teamsCoachesPost(teamRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **teamRequest** | [**TeamRequest**](TeamRequest.md)|  | 

### Return type

[**TeamGetCoachesResponse**](TeamGetCoachesResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## teamsCreatePost

> teamsCreatePost(teamCreateRequest)

Создание команды

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TeamsApi();
let teamCreateRequest = new Api.TeamCreateRequest(); // TeamCreateRequest | 
apiInstance.teamsCreatePost(teamCreateRequest, (error, data, response) => {
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
 **teamCreateRequest** | [**TeamCreateRequest**](TeamCreateRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## teamsGet

> TeamResponse teamsGet()

Список команд

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TeamsApi();
apiInstance.teamsGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**TeamResponse**](TeamResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## teamsJoinPost

> teamsJoinPost(teamJoinRequest)

Запрос спортсмена на вступление в команду

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TeamsApi();
let teamJoinRequest = new Api.TeamJoinRequest(); // TeamJoinRequest | 
apiInstance.teamsJoinPost(teamJoinRequest, (error, data, response) => {
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
 **teamJoinRequest** | [**TeamJoinRequest**](TeamJoinRequest.md)|  | 

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


## teamsJoinsListGet

> TeamJoinsListResponse teamsJoinsListGet()

Список заявок на вступление в команды

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TeamsApi();
apiInstance.teamsJoinsListGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**TeamJoinsListResponse**](TeamJoinsListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## teamsJoinsListTeamIdGet

> TeamJoinsListResponse teamsJoinsListTeamIdGet(teamId)

Список заявок на вступление в команду

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.TeamsApi();
let teamId = 56; // Number | 
apiInstance.teamsJoinsListTeamIdGet(teamId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **teamId** | **Number**|  | 

### Return type

[**TeamJoinsListResponse**](TeamJoinsListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

