import requests

def fetch_news_from_api(keyword, access_key="d392beef0c09dcad17d5dfc7a928819b"):
    base_url = "http://api.mediastack.com/v1/news"
    params = {
        "access_key": access_key,
        "keywords": keyword,
        "languages": "en",
        "limit": 10,
    }

    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        news_items = response.json().get('data', [])

        formatted_news = []
        for item in news_items:
            formatted_item = {
                'title': item.get('title'),
                'description': item.get('description'),
                'source': item.get('source'),
                'image': item.get('image'),
                'url': item.get('url')
            }
            formatted_news.append(formatted_item)

        return formatted_news
    except requests.RequestException as e:
        print(f"Error fetching news for keyword '{keyword}': {e}")
        return None

