from fastapi.testclient import TestClient

from backend.app import app

client = TestClient(app)


def test_health():
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json()['edition'] == 'community'


def test_repo_query_uses_public_docs():
    response = client.post('/api/demo/repo-query', json={'query': 'governed automation'})
    assert response.status_code == 200
    payload = response.json()
    assert payload['mode'] == 'lexical-rag'
    assert all(item['source'] in {'README.md', 'FEATURES.md', 'ARCHITECTURE.md', 'SECURITY.md'} for item in payload['results'])


def test_governed_action_requires_decision():
    proposal = client.post('/api/demo/actions', json={'kind': 'create-task', 'summary': 'Review release'}).json()
    assert proposal['status'] == 'pending'
    decision = client.post(f"/api/demo/actions/{proposal['id']}/decision", json={'approved': True}).json()
    assert decision['status'] == 'approved'


def test_debugger_is_local_and_deterministic():
    response = client.post('/api/demo/debug', json={'error': 'CORS error while calling API'})
    assert response.status_code == 200
    assert 'external model' in response.json()['analysis']
