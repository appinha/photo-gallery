import json

def_headers = {
    "Content-type": "application/json",
    "Accept": "application/json",
}


def _get_token(client):
    data = json.dumps({"username": "admin", "password": "123"})
    response = client.post(
        "/api/users/sign-in", data=data, headers=def_headers
    )
    return response.get_json()["token"]


def _create_header_with_auth(client):
    return {
        **def_headers,
        "Authorization": _get_token(client),
    }


def test_get_photos(client):
    headers = _create_header_with_auth(client)
    response = client.get("api/photos", headers=headers)
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


def test_get_photos_unauthorized(client):
    response = client.get("api/photos", headers=def_headers)

    assert response.status_code == 401
    assert response.text == "No token provided in authorization"
