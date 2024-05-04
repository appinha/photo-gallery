import json


def test_get_photos_success(client, auth_headers):
    response = client.get("api/photos", headers=auth_headers)
    data = response.get_json()

    assert len(data["photos"]) == 10

    expected_keys = [
        "id",
        "width",
        "height",
        "url",
        "photographer",
        "photographer_url",
        "photographer_id",
        "avg_color",
        "src_original",
        "src_large2x",
        "src_large",
        "src_medium",
        "src_small",
        "src_portrait",
        "src_landscape",
        "src_tiny",
        "alt",
        "is_starred",
        "created_at",
    ]
    for key in data["photos"][0].keys():
        assert key in expected_keys


def test_get_photos_unauthorized(client, headers):
    response = client.get("api/photos", headers=headers)

    assert response.status_code == 401
    assert response.text == "No token provided in authorization"


def test_add_photo_star_success(client, auth_headers, photo_mock):
    data = json.dumps({"id": photo_mock["id"]})
    response = client.post("api/photos/star", headers=auth_headers, data=data)

    assert response.status_code == 201
    assert response.text == "Photo star created"


def test_add_photo_star_missing_id(client, auth_headers):
    response = client.post(
        "api/photos/star", headers=auth_headers, data=json.dumps({})
    )

    assert response.status_code == 400
    assert response.text == "Photo id not provided"


def test_add_photo_star_unauthorized(client, headers):
    response = client.delete("api/photos/star", headers=headers)

    assert response.status_code == 401
    assert response.text == "No token provided in authorization"


def test_remove_photo_star_success(client, auth_headers, photo_mock):
    data = json.dumps({"id": photo_mock["id"]})
    response = client.delete(
        "api/photos/star", headers=auth_headers, data=data
    )

    assert response.status_code == 200
    assert response.text == "Photo star deleted"


def test_remove_photo_star_missing_id(client, auth_headers):
    response = client.delete(
        "api/photos/star", headers=auth_headers, data=json.dumps({})
    )

    assert response.status_code == 400
    assert response.text == "Photo id not provided"


def test_remove_photo_star_unauthorized(client, headers, photo_mock):
    data = json.dumps({"id": photo_mock["id"]})
    response = client.delete("api/photos/star", data=data, headers=headers)

    assert response.status_code == 401
    assert response.text == "No token provided in authorization"
