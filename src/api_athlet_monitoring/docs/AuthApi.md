# Api.AuthApi

All URIs are relative to *http://localhost:8000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authAthleteProfilePost**](AuthApi.md#authAthleteProfilePost) | **POST** /auth/athlete-profile | Профиль спортсмена
[**authAthleteTeamPost**](AuthApi.md#authAthleteTeamPost) | **POST** /auth/athlete-team | Команда спортсмена
[**authCancelInvitePost**](AuthApi.md#authCancelInvitePost) | **POST** /auth/cancel-invite | Отмена инвайта
[**authChangePasswordPost**](AuthApi.md#authChangePasswordPost) | **POST** /auth/change-password | Смена пароля пользователя
[**authCreateInviteCodePost**](AuthApi.md#authCreateInviteCodePost) | **POST** /auth/create-invite-code | Создание инвайта для врача или тренера
[**authGetAllInvitesGet**](AuthApi.md#authGetAllInvitesGet) | **GET** /auth/get-all-invites | Все инвайты
[**authGetInviteDetailsPost**](AuthApi.md#authGetInviteDetailsPost) | **POST** /auth/get-invite-details | Информация о приглашении
[**authLoginPost**](AuthApi.md#authLoginPost) | **POST** /auth/login | Авторизация
[**authRegisterAthletePost**](AuthApi.md#authRegisterAthletePost) | **POST** /auth/register/athlete | Регистрация спортсмена
[**authRegisterInvitePost**](AuthApi.md#authRegisterInvitePost) | **POST** /auth/register/invite | Регистрация по инвайт-коду (для тренеров и врачей)



## authAthleteProfilePost

> AthleteProfileResponse authAthleteProfilePost(athleteProfileRequest)

Профиль спортсмена

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
let athleteProfileRequest = new Api.AthleteProfileRequest(); // AthleteProfileRequest | 
apiInstance.authAthleteProfilePost(athleteProfileRequest, (error, data, response) => {
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
 **athleteProfileRequest** | [**AthleteProfileRequest**](AthleteProfileRequest.md)|  | 

### Return type

[**AthleteProfileResponse**](AthleteProfileResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authAthleteTeamPost

> AthleteTeamResponse authAthleteTeamPost(athleteProfileRequest)

Команда спортсмена

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
let athleteProfileRequest = new Api.AthleteProfileRequest(); // AthleteProfileRequest | 
apiInstance.authAthleteTeamPost(athleteProfileRequest, (error, data, response) => {
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
 **athleteProfileRequest** | [**AthleteProfileRequest**](AthleteProfileRequest.md)|  | 

### Return type

[**AthleteTeamResponse**](AthleteTeamResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authCancelInvitePost

> authCancelInvitePost(inviteCancelRequest)

Отмена инвайта

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
let inviteCancelRequest = new Api.InviteCancelRequest(); // InviteCancelRequest | 
apiInstance.authCancelInvitePost(inviteCancelRequest, (error, data, response) => {
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
 **inviteCancelRequest** | [**InviteCancelRequest**](InviteCancelRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authChangePasswordPost

> authChangePasswordPost(authChangePasswordPostRequest)

Смена пароля пользователя

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
let authChangePasswordPostRequest = {"old_password":"oldPass123","new_password":"newSecurePass456"}; // AuthChangePasswordPostRequest | 
apiInstance.authChangePasswordPost(authChangePasswordPostRequest, (error, data, response) => {
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
 **authChangePasswordPostRequest** | [**AuthChangePasswordPostRequest**](AuthChangePasswordPostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authCreateInviteCodePost

> InviteCreateResponse authCreateInviteCodePost(inviteCreateRequest)

Создание инвайта для врача или тренера

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
let inviteCreateRequest = new Api.InviteCreateRequest(); // InviteCreateRequest | 
apiInstance.authCreateInviteCodePost(inviteCreateRequest, (error, data, response) => {
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
 **inviteCreateRequest** | [**InviteCreateRequest**](InviteCreateRequest.md)|  | 

### Return type

[**InviteCreateResponse**](InviteCreateResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authGetAllInvitesGet

> InviteAllResponse authGetAllInvitesGet()

Все инвайты

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
apiInstance.authGetAllInvitesGet((error, data, response) => {
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

[**InviteAllResponse**](InviteAllResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## authGetInviteDetailsPost

> InviteDetailsResponse authGetInviteDetailsPost(inviteDetailsRequest)

Информация о приглашении

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
let inviteDetailsRequest = new Api.InviteDetailsRequest(); // InviteDetailsRequest | 
apiInstance.authGetInviteDetailsPost(inviteDetailsRequest, (error, data, response) => {
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
 **inviteDetailsRequest** | [**InviteDetailsRequest**](InviteDetailsRequest.md)|  | 

### Return type

[**InviteDetailsResponse**](InviteDetailsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authLoginPost

> LoginResponse authLoginPost(loginRequest)

Авторизация

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
let loginRequest = new Api.LoginRequest(); // LoginRequest | 
apiInstance.authLoginPost(loginRequest, (error, data, response) => {
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
 **loginRequest** | [**LoginRequest**](LoginRequest.md)|  | 

### Return type

[**LoginResponse**](LoginResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authRegisterAthletePost

> authRegisterAthletePost(athleteRegisterRequest)

Регистрация спортсмена

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
let athleteRegisterRequest = new Api.AthleteRegisterRequest(); // AthleteRegisterRequest | 
apiInstance.authRegisterAthletePost(athleteRegisterRequest, (error, data, response) => {
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
 **athleteRegisterRequest** | [**AthleteRegisterRequest**](AthleteRegisterRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authRegisterInvitePost

> authRegisterInvitePost(inviteRegisterRequest)

Регистрация по инвайт-коду (для тренеров и врачей)

### Example

```javascript
import Api from '____api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
let inviteRegisterRequest = new Api.InviteRegisterRequest(); // InviteRegisterRequest | 
apiInstance.authRegisterInvitePost(inviteRegisterRequest, (error, data, response) => {
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
 **inviteRegisterRequest** | [**InviteRegisterRequest**](InviteRegisterRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

