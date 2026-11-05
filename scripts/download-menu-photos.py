"""Download menu photos once. This script is not part of the React app."""
import concurrent.futures
import html
import json
from pathlib import Path
import re
import time
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parent.parent
DEST = ROOT / 'public' / 'images' / 'menu'
DEST.mkdir(parents=True, exist_ok=True)
names = re.findall(r'<h3>(.*?)</h3>', (ROOT / 'src/pages/Menu.jsx').read_text(encoding='utf-8'))
previous = json.loads((DEST / 'sources.json').read_text(encoding='utf-8')) if (DEST / 'sources.json').exists() else []
names = [name for name in names if name not in [item['name'] for item in previous]]
queries = {
    'Grilled Chicken Plate': 'chicken skewers plate',
    'Kafta Plate': 'kofta grilled',
    'Mixed Grill': 'mixed grill meat',
    'Grilled Fish': 'grilled fish plate',
    'Classic Beef Burger': 'hamburger beef',
    'Crispy Chicken Burger': 'chicken burger',
    'Mushroom Burger': 'mushroom burger',
    'BBQ Chicken Pizza': 'barbecue chicken pizza',
    'Tawouk Sandwich': 'chicken sandwich grilled',
    'Halloumi Sandwich': 'halloumi sandwich',
    'Bottled Water': 'intitle:water intitle:bottle plastic -factory -plant -metal',
    'Turkish Coffee': 'Turkish coffee cup -beans -grounds',
    'Pepsi': 'intitle:Pepsi intitle:can -max -coca',
    'Pepsi Max': 'Pepsi Max can',
    '7UP': '7-Up bottle -cap -caps -logo -sign -Varosha',
    'Mirinda Orange': 'Mirinda orange bottle',
}

def read_url(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'StudentRestaurantMenu/1.0 (educational project)'})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=35) as response:
                return response.read()
        except Exception:
            if attempt == 2:
                raise
            time.sleep(2 + attempt)

def plain(text):
    return html.unescape(re.sub('<[^>]+>', '', text)).replace('\n', ' ')

def download(name):
    time.sleep(2)
    slug = re.sub('[^a-z0-9]+', '-', name.lower()).strip('-')
    params = urllib.parse.urlencode({
        'action': 'query', 'generator': 'search',
        'gsrsearch': queries.get(name, name) + ' filetype:bitmap',
        'gsrnamespace': 6, 'gsrlimit': 5, 'prop': 'imageinfo',
        'iiprop': 'url|extmetadata|mime', 'iiurlwidth': 500, 'format': 'json',
    })
    data = json.loads(read_url('https://commons.wikimedia.org/w/api.php?' + params))
    pages = sorted(data.get('query', {}).get('pages', {}).values(), key=lambda p: p.get('index', 100))
    for page in pages:
        info = page['imageinfo'][0]
        if info.get('mime') not in ['image/jpeg', 'image/png']:
            continue
        url = info.get('thumburl', info['url'])
        try:
            content = read_url(url)
        except Exception:
            continue
        extension = '.png' if content.startswith(b'\x89PNG') else '.jpg'
        filename = slug + extension
        (DEST / filename).write_bytes(content)
        metadata = info.get('extmetadata', {})
        result = {'name': name, 'file': filename, 'source': info['descriptionurl'],
                  'artist': plain(metadata.get('Artist', {}).get('value', 'See source')),
                  'license': plain(metadata.get('LicenseShortName', {}).get('value', 'See source')),
                  'license_url': metadata.get('LicenseUrl', {}).get('value', info['descriptionurl'])}
        print('Saved ' + name, flush=True)
        return result
    raise RuntimeError('No downloadable image for ' + name)

results = previous
failures = []
with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
    futures = {pool.submit(download, name): name for name in names}
    for future in concurrent.futures.as_completed(futures):
        try:
            results.append(future.result())
        except Exception as error:
            failures.append(futures[future])
            print('FAILED ' + futures[future] + ': ' + str(error), flush=True)

(DEST / 'sources.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
credits = '# Menu photo credits\n\nIllustrative menu photographs from Wikimedia Commons. See each source for its license and attribution requirements.\n\n'
for item in sorted(results, key=lambda item: item['name']):
    credits += '- **' + item['name'] + '**: [' + item['artist'] + '](' + item['source'] + '), [' + item['license'] + '](' + item['license_url'] + ').\n'
(DEST / 'credits.md').write_text(credits, encoding='utf-8')
if failures:
    raise SystemExit('Missing images: ' + ', '.join(failures))
