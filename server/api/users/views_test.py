import json


sign_in_url = "/api/users/sign-in"


def test_sign_in_success(client, headers):
    data = json.dumps({"username": "admin", "password": "123"})

    response = client.post(sign_in_url, data=data, headers=headers)

    assert response.status_code == 200
    assert "token" in response.get_json()


def test_sign_in_incorrect_password(client, headers):
    data = json.dumps({"username": "admin", "password": "456"})

    response = client.post(sign_in_url, data=data, headers=headers)

    assert response.status_code == 401
    assert response.text == "Incorrect password"
    assert response.get_json() is None


def test_sign_in_user_does_not_exist(client, headers):
    data = json.dumps({"username": "other", "password": "456"})

    response = client.post(sign_in_url, data=data, headers=headers)

    assert response.status_code == 401
    assert response.text == "User does not exist"
    assert response.get_json() is None


def test_sign_in_missing_credentials(client, headers):
    data = json.dumps({})

    response = client.post(sign_in_url, data=data, headers=headers)

    assert response.status_code == 401
    assert response.text == "Proper credentials were not provided"
    assert response.get_json() is None
